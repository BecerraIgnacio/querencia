import type { DiseaseScores } from "@/data/infographic-types";
import styles from "./disease-radar-chart.module.css";

interface DiseaseRadarChartProps {
  scores: DiseaseScores;
  color: string;
  labels: {
    transmissibility: string;
    severity: string;
    mortality: string;
    productiveImpact: string;
    spreadSpeed: string;
    controlDifficulty: string;
  };
}

const AXES: (keyof DiseaseScores)[] = [
  "transmissibility",
  "severity",
  "mortality",
  "productiveImpact",
  "spreadSpeed",
  "controlDifficulty",
];

const SIZE = 260;
const CENTER = SIZE / 2;
const RADIUS = 100;
const LEVELS = 5;

function polarToCartesian(angle: number, distance: number): [number, number] {
  const rad = (Math.PI / 180) * (angle - 90);
  return [CENTER + distance * Math.cos(rad), CENTER + distance * Math.sin(rad)];
}

function getAngle(index: number): number {
  return (360 / AXES.length) * index;
}

export function DiseaseRadarChart({ scores, color, labels }: DiseaseRadarChartProps) {
  const dataPoints = AXES.map((axis, i) => {
    const value = scores[axis];
    const distance = (value / LEVELS) * RADIUS;
    return polarToCartesian(getAngle(i), distance);
  });

  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ") + " Z";

  return (
    <div className={styles.container}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={styles.svg}>
        {/* Grid levels */}
        {Array.from({ length: LEVELS }, (_, level) => {
          const r = ((level + 1) / LEVELS) * RADIUS;
          const points = AXES.map((_, i) => polarToCartesian(getAngle(i), r));
          const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ") + " Z";
          return <path key={level} d={path} className={styles.gridLine} />;
        })}

        {/* Axis lines */}
        {AXES.map((_, i) => {
          const [x, y] = polarToCartesian(getAngle(i), RADIUS);
          return <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} className={styles.axisLine} />;
        })}

        {/* Data polygon */}
        <path d={dataPath} style={{ fill: color, stroke: color }} className={styles.dataPolygon} />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={3.5} style={{ fill: color }} />
        ))}

        {/* Axis labels */}
        {AXES.map((axis, i) => {
          const [x, y] = polarToCartesian(getAngle(i), RADIUS + 24);
          return (
            <text
              key={axis}
              x={x}
              y={y}
              className={styles.axisLabel}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {labels[axis]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
