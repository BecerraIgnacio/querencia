import type { DiseaseId } from "@querencia/core-domain";
import { makeDiseaseId } from "@querencia/core-domain";
import type { InfographicDiseaseData } from "./infographic-types";

export const INFOGRAPHIC_DATA = new Map<DiseaseId, InfographicDiseaseData>([
  [
    makeDiseaseId("fmd"),
    {
      diseaseId: makeDiseaseId("fmd"),
      scores: {
        transmissibility: 5,
        severity: 4,
        mortality: 2,
        productiveImpact: 5,
        spreadSpeed: 5,
        controlDifficulty: 4,
      },
      riskBars: [
        { key: "economic", label: { en: "Economic impact", es: "Impacto económico" }, value: 5 },
        { key: "trade", label: { en: "Trade disruption", es: "Disrupción comercial" }, value: 5 },
        { key: "spread", label: { en: "Spread potential", es: "Potencial de dispersión" }, value: 5 },
        { key: "control", label: { en: "Control difficulty", es: "Dificultad de control" }, value: 4 },
      ],
      symptoms: [
        { label: { en: "Oral blisters and ulcers", es: "Vesículas y úlceras orales" }, weight: 1.0 },
        { label: { en: "Foot lesions and lameness", es: "Lesiones podales y cojera" }, weight: 0.9 },
        { label: { en: "Excessive drooling", es: "Salivación excesiva" }, weight: 0.85 },
        { label: { en: "High fever (40-41°C)", es: "Fiebre alta (40-41°C)" }, weight: 0.8 },
        { label: { en: "Teat vesicles", es: "Vesículas en ubres" }, weight: 0.7 },
        { label: { en: "Weight loss and depression", es: "Pérdida de peso y depresión" }, weight: 0.6 },
        { label: { en: "Reduced milk yield", es: "Reducción de producción láctea" }, weight: 0.55 },
      ],
      affectedZones: [
        { id: "mouth", label: { en: "Mouth", es: "Boca" }, position: { x: 15, y: 25 } },
        { id: "tongue", label: { en: "Tongue", es: "Lengua" }, position: { x: 18, y: 30 } },
        { id: "hooves", label: { en: "Hooves", es: "Pezuñas" }, position: { x: 30, y: 90 } },
        { id: "teats", label: { en: "Teats", es: "Ubres" }, position: { x: 55, y: 75 } },
      ],
      transmissionRoutes: [
        { label: { en: "Direct contact with infected animals", es: "Contacto directo con animales infectados" } },
        { label: { en: "Airborne spread up to 60 km", es: "Dispersión aérea hasta 60 km" } },
        { label: { en: "Contaminated feed and water", es: "Alimento y agua contaminados" } },
        { label: { en: "Fomites (equipment, vehicles, clothing)", es: "Fómites (equipos, vehículos, ropa)" } },
        { label: { en: "Semen and embryo transfer", es: "Semen y transferencia de embriones" } },
      ],
      prevention: [
        { label: { en: "Systematic vaccination programs", es: "Programas de vacunación sistemática" } },
        { label: { en: "Strict movement controls", es: "Controles estrictos de movimiento" } },
        { label: { en: "Quarantine of new animals", es: "Cuarentena de animales nuevos" } },
        { label: { en: "Disinfection of vehicles and equipment", es: "Desinfección de vehículos y equipos" } },
        { label: { en: "Surveillance and early detection", es: "Vigilancia y detección temprana" } },
      ],
      responseItems: [
        {
          category: { en: "Surveillance", es: "Vigilancia" },
          description: { en: "Active monitoring in buffer zones with clinical and serological testing", es: "Monitoreo activo en zonas buffer con pruebas clínicas y serológicas" },
        },
        {
          category: { en: "Notification", es: "Notificación" },
          description: { en: "Immediate mandatory notification to SENASA and OIE within 24 hours", es: "Notificación obligatoria inmediata a SENASA y OIE dentro de 24 horas" },
        },
        {
          category: { en: "Sanitary control", es: "Control sanitario" },
          description: { en: "Quarantine, ring vaccination, movement ban in affected zones", es: "Cuarentena, vacunación en anillo, prohibición de movimiento en zonas afectadas" },
        },
        {
          category: { en: "Prevention", es: "Prevención" },
          description: { en: "Biosecurity reinforcement, herd immunity maintenance, risk communication", es: "Refuerzo de bioseguridad, mantenimiento de inmunidad de rebaño, comunicación de riesgo" },
        },
      ],
      zoonotic: false,
      mandatoryNotification: true,
    },
  ],
  [
    makeDiseaseId("brucellosis"),
    {
      diseaseId: makeDiseaseId("brucellosis"),
      scores: {
        transmissibility: 3,
        severity: 4,
        mortality: 1,
        productiveImpact: 4,
        spreadSpeed: 2,
        controlDifficulty: 4,
      },
      riskBars: [
        { key: "economic", label: { en: "Economic impact", es: "Impacto económico" }, value: 4 },
        { key: "trade", label: { en: "Trade disruption", es: "Disrupción comercial" }, value: 3 },
        { key: "spread", label: { en: "Spread potential", es: "Potencial de dispersión" }, value: 3 },
        { key: "control", label: { en: "Control difficulty", es: "Dificultad de control" }, value: 4 },
      ],
      symptoms: [
        { label: { en: "Abortion in late gestation", es: "Aborto en gestación tardía" }, weight: 1.0 },
        { label: { en: "Retained placenta", es: "Retención de placenta" }, weight: 0.85 },
        { label: { en: "Reduced fertility", es: "Fertilidad reducida" }, weight: 0.8 },
        { label: { en: "Orchitis in males", es: "Orquitis en machos" }, weight: 0.7 },
        { label: { en: "Joint inflammation", es: "Inflamación articular" }, weight: 0.5 },
      ],
      affectedZones: [
        { id: "uterus", label: { en: "Uterus", es: "Útero" }, position: { x: 55, y: 60 } },
        { id: "udder", label: { en: "Udder", es: "Ubre" }, position: { x: 55, y: 75 } },
        { id: "joints", label: { en: "Joints", es: "Articulaciones" }, position: { x: 35, y: 80 } },
      ],
      transmissionRoutes: [
        { label: { en: "Contact with birth fluids and aborted fetuses", es: "Contacto con fluidos del parto y fetos abortados" } },
        { label: { en: "Ingestion of unpasteurized dairy", es: "Ingestión de lácteos no pasteurizados" } },
        { label: { en: "Venereal transmission", es: "Transmisión venérea" } },
      ],
      prevention: [
        { label: { en: "Vaccination with strain 19 or RB51", es: "Vacunación con cepa 19 o RB51" } },
        { label: { en: "Test-and-slaughter programs", es: "Programas de prueba y sacrificio" } },
        { label: { en: "Pasteurization of milk products", es: "Pasteurización de productos lácteos" } },
      ],
      responseItems: [
        {
          category: { en: "Surveillance", es: "Vigilancia" },
          description: { en: "Serological screening of herds in affected zones", es: "Tamizaje serológico de rodeos en zonas afectadas" },
        },
        {
          category: { en: "Notification", es: "Notificación" },
          description: { en: "Mandatory notification to SENASA", es: "Notificación obligatoria a SENASA" },
        },
        {
          category: { en: "Sanitary control", es: "Control sanitario" },
          description: { en: "Quarantine and culling of positive reactors", es: "Cuarentena y eliminación de reactores positivos" },
        },
        {
          category: { en: "Prevention", es: "Prevención" },
          description: { en: "Herd-level vaccination and movement controls", es: "Vacunación a nivel de rodeo y controles de movimiento" },
        },
      ],
      zoonotic: true,
      mandatoryNotification: true,
    },
  ],
  [
    makeDiseaseId("bovine_tuberculosis"),
    {
      diseaseId: makeDiseaseId("bovine_tuberculosis"),
      scores: {
        transmissibility: 2,
        severity: 4,
        mortality: 2,
        productiveImpact: 4,
        spreadSpeed: 1,
        controlDifficulty: 5,
      },
      riskBars: [
        { key: "economic", label: { en: "Economic impact", es: "Impacto económico" }, value: 4 },
        { key: "trade", label: { en: "Trade disruption", es: "Disrupción comercial" }, value: 4 },
        { key: "spread", label: { en: "Spread potential", es: "Potencial de dispersión" }, value: 2 },
        { key: "control", label: { en: "Control difficulty", es: "Dificultad de control" }, value: 5 },
      ],
      symptoms: [
        { label: { en: "Chronic progressive cough", es: "Tos crónica progresiva" }, weight: 1.0 },
        { label: { en: "Progressive weight loss", es: "Pérdida de peso progresiva" }, weight: 0.9 },
        { label: { en: "Enlarged lymph nodes", es: "Ganglios linfáticos aumentados" }, weight: 0.8 },
        { label: { en: "Reduced milk production", es: "Reducción de producción láctea" }, weight: 0.6 },
      ],
      affectedZones: [
        { id: "lungs", label: { en: "Lungs", es: "Pulmones" }, position: { x: 40, y: 40 } },
        { id: "lymph", label: { en: "Lymph nodes", es: "Ganglios linfáticos" }, position: { x: 25, y: 35 } },
      ],
      transmissionRoutes: [
        { label: { en: "Inhalation of infected aerosols", es: "Inhalación de aerosoles infectados" } },
        { label: { en: "Ingestion of contaminated milk", es: "Ingestión de leche contaminada" } },
      ],
      prevention: [
        { label: { en: "Tuberculin testing programs", es: "Programas de prueba tuberculínica" } },
        { label: { en: "Culling of positive reactors", es: "Eliminación de reactores positivos" } },
        { label: { en: "Milk pasteurization", es: "Pasteurización de leche" } },
      ],
      responseItems: [
        {
          category: { en: "Surveillance", es: "Vigilancia" },
          description: { en: "Periodic tuberculin skin testing in herds", es: "Prueba tuberculínica periódica en rodeos" },
        },
        {
          category: { en: "Notification", es: "Notificación" },
          description: { en: "Mandatory notification to SENASA", es: "Notificación obligatoria a SENASA" },
        },
        {
          category: { en: "Sanitary control", es: "Control sanitario" },
          description: { en: "Slaughter of infected animals, herd quarantine", es: "Sacrificio de animales infectados, cuarentena del rodeo" },
        },
        {
          category: { en: "Prevention", es: "Prevención" },
          description: { en: "National eradication program compliance", es: "Cumplimiento del programa nacional de erradicación" },
        },
      ],
      zoonotic: true,
      mandatoryNotification: true,
    },
  ],
  [
    makeDiseaseId("african_swine_fever"),
    {
      diseaseId: makeDiseaseId("african_swine_fever"),
      scores: {
        transmissibility: 4,
        severity: 5,
        mortality: 5,
        productiveImpact: 5,
        spreadSpeed: 4,
        controlDifficulty: 5,
      },
      riskBars: [
        { key: "economic", label: { en: "Economic impact", es: "Impacto económico" }, value: 5 },
        { key: "trade", label: { en: "Trade disruption", es: "Disrupción comercial" }, value: 5 },
        { key: "spread", label: { en: "Spread potential", es: "Potencial de dispersión" }, value: 4 },
        { key: "control", label: { en: "Control difficulty", es: "Dificultad de control" }, value: 5 },
      ],
      symptoms: [
        { label: { en: "High fever (41-42°C)", es: "Fiebre alta (41-42°C)" }, weight: 1.0 },
        { label: { en: "Hemorrhagic skin lesions", es: "Lesiones cutáneas hemorrágicas" }, weight: 0.95 },
        { label: { en: "Cyanosis of extremities", es: "Cianosis de extremidades" }, weight: 0.85 },
        { label: { en: "Sudden death", es: "Muerte súbita" }, weight: 0.9 },
        { label: { en: "Vomiting and diarrhea", es: "Vómitos y diarrea" }, weight: 0.7 },
      ],
      affectedZones: [
        { id: "skin", label: { en: "Skin", es: "Piel" }, position: { x: 50, y: 45 } },
        { id: "spleen", label: { en: "Spleen", es: "Bazo" }, position: { x: 45, y: 50 } },
        { id: "lymph", label: { en: "Lymph nodes", es: "Ganglios linfáticos" }, position: { x: 25, y: 35 } },
      ],
      transmissionRoutes: [
        { label: { en: "Direct contact with infected pigs", es: "Contacto directo con cerdos infectados" } },
        { label: { en: "Contaminated feed (swill feeding)", es: "Alimento contaminado (restos de comida)" } },
        { label: { en: "Tick vectors (Ornithodoros)", es: "Vectores garrapatas (Ornithodoros)" } },
        { label: { en: "Fomites (clothing, equipment)", es: "Fómites (ropa, equipos)" } },
      ],
      prevention: [
        { label: { en: "Strict border biosecurity", es: "Bioseguridad fronteriza estricta" } },
        { label: { en: "Ban on swill feeding", es: "Prohibición de alimentación con restos" } },
        { label: { en: "Surveillance of wild boar populations", es: "Vigilancia de poblaciones de jabalí" } },
        { label: { en: "Rapid diagnostic protocols", es: "Protocolos de diagnóstico rápido" } },
      ],
      responseItems: [
        {
          category: { en: "Surveillance", es: "Vigilancia" },
          description: { en: "Active surveillance in domestic and wild pig populations", es: "Vigilancia activa en poblaciones de cerdos domésticos y salvajes" },
        },
        {
          category: { en: "Notification", es: "Notificación" },
          description: { en: "Immediate notification to OIE and national authorities", es: "Notificación inmediata a OIE y autoridades nacionales" },
        },
        {
          category: { en: "Sanitary control", es: "Control sanitario" },
          description: { en: "Stamping out, zoning, and total movement ban", es: "Sacrificio sanitario, zonificación y prohibición total de movimiento" },
        },
        {
          category: { en: "Prevention", es: "Prevención" },
          description: { en: "No vaccine available — prevention relies entirely on biosecurity", es: "Sin vacuna disponible — la prevención depende enteramente de la bioseguridad" },
        },
      ],
      zoonotic: false,
      mandatoryNotification: true,
    },
  ],
  [
    makeDiseaseId("prrsv"),
    {
      diseaseId: makeDiseaseId("prrsv"),
      scores: {
        transmissibility: 4,
        severity: 3,
        mortality: 2,
        productiveImpact: 4,
        spreadSpeed: 3,
        controlDifficulty: 4,
      },
      riskBars: [
        { key: "economic", label: { en: "Economic impact", es: "Impacto económico" }, value: 4 },
        { key: "trade", label: { en: "Trade disruption", es: "Disrupción comercial" }, value: 3 },
        { key: "spread", label: { en: "Spread potential", es: "Potencial de dispersión" }, value: 4 },
        { key: "control", label: { en: "Control difficulty", es: "Dificultad de control" }, value: 4 },
      ],
      symptoms: [
        { label: { en: "Reproductive failure in sows", es: "Falla reproductiva en cerdas" }, weight: 1.0 },
        { label: { en: "Respiratory distress in piglets", es: "Distrés respiratorio en lechones" }, weight: 0.9 },
        { label: { en: "Increased pre-weaning mortality", es: "Mayor mortalidad pre-destete" }, weight: 0.8 },
        { label: { en: "Anorexia and lethargy", es: "Anorexia y letargia" }, weight: 0.6 },
      ],
      affectedZones: [
        { id: "lungs", label: { en: "Lungs", es: "Pulmones" }, position: { x: 40, y: 40 } },
        { id: "uterus", label: { en: "Uterus", es: "Útero" }, position: { x: 60, y: 60 } },
      ],
      transmissionRoutes: [
        { label: { en: "Contact with infected pigs", es: "Contacto con cerdos infectados" } },
        { label: { en: "Contaminated semen", es: "Semen contaminado" } },
        { label: { en: "Aerosol transmission (short range)", es: "Transmisión por aerosol (corto alcance)" } },
      ],
      prevention: [
        { label: { en: "Herd closure and acclimatization", es: "Cierre de piara y aclimatación" } },
        { label: { en: "Modified live virus vaccination", es: "Vacunación con virus vivo modificado" } },
        { label: { en: "All-in/all-out management", es: "Manejo todo dentro/todo fuera" } },
      ],
      responseItems: [
        {
          category: { en: "Surveillance", es: "Vigilancia" },
          description: { en: "Serological monitoring and PCR testing in breeding herds", es: "Monitoreo serológico y pruebas PCR en rodeos reproductivos" },
        },
        {
          category: { en: "Notification", es: "Notificación" },
          description: { en: "Report to regional veterinary authority", es: "Reporte a autoridad veterinaria regional" },
        },
        {
          category: { en: "Sanitary control", es: "Control sanitario" },
          description: { en: "Herd stabilization and controlled exposure programs", es: "Estabilización de piara y programas de exposición controlada" },
        },
        {
          category: { en: "Prevention", es: "Prevención" },
          description: { en: "Strict biosecurity and semen screening", es: "Bioseguridad estricta y control de semen" },
        },
      ],
      zoonotic: false,
      mandatoryNotification: false,
    },
  ],
  [
    makeDiseaseId("avian_influenza"),
    {
      diseaseId: makeDiseaseId("avian_influenza"),
      scores: {
        transmissibility: 5,
        severity: 5,
        mortality: 5,
        productiveImpact: 5,
        spreadSpeed: 5,
        controlDifficulty: 4,
      },
      riskBars: [
        { key: "economic", label: { en: "Economic impact", es: "Impacto económico" }, value: 5 },
        { key: "trade", label: { en: "Trade disruption", es: "Disrupción comercial" }, value: 5 },
        { key: "spread", label: { en: "Spread potential", es: "Potencial de dispersión" }, value: 5 },
        { key: "control", label: { en: "Control difficulty", es: "Dificultad de control" }, value: 4 },
      ],
      symptoms: [
        { label: { en: "Sudden high mortality", es: "Alta mortalidad súbita" }, weight: 1.0 },
        { label: { en: "Severe respiratory distress", es: "Distrés respiratorio severo" }, weight: 0.95 },
        { label: { en: "Swollen head and face", es: "Cabeza y cara inflamadas" }, weight: 0.85 },
        { label: { en: "Cyanotic combs and wattles", es: "Crestas y barbillas cianóticas" }, weight: 0.8 },
        { label: { en: "Drop in egg production", es: "Caída en producción de huevos" }, weight: 0.75 },
        { label: { en: "Hemorrhagic lesions", es: "Lesiones hemorrágicas" }, weight: 0.7 },
      ],
      affectedZones: [
        { id: "head", label: { en: "Head/Comb", es: "Cabeza/Cresta" }, position: { x: 15, y: 15 } },
        { id: "respiratory", label: { en: "Respiratory tract", es: "Tracto respiratorio" }, position: { x: 35, y: 35 } },
        { id: "digestive", label: { en: "Digestive system", es: "Sistema digestivo" }, position: { x: 45, y: 55 } },
      ],
      transmissionRoutes: [
        { label: { en: "Contact with infected birds", es: "Contacto con aves infectadas" } },
        { label: { en: "Contaminated water sources", es: "Fuentes de agua contaminadas" } },
        { label: { en: "Wild bird migration vectors", es: "Vectores de aves migratorias" } },
        { label: { en: "Fomites and equipment", es: "Fómites y equipos" } },
      ],
      prevention: [
        { label: { en: "Wild bird exclusion from poultry areas", es: "Exclusión de aves silvestres de áreas avícolas" } },
        { label: { en: "Strict farm biosecurity protocols", es: "Protocolos estrictos de bioseguridad en granja" } },
        { label: { en: "Active migratory bird surveillance", es: "Vigilancia activa de aves migratorias" } },
        { label: { en: "Vaccination where permitted", es: "Vacunación donde esté permitida" } },
      ],
      responseItems: [
        {
          category: { en: "Surveillance", es: "Vigilancia" },
          description: { en: "Active surveillance in poultry and wild bird populations", es: "Vigilancia activa en poblaciones avícolas y de aves silvestres" },
        },
        {
          category: { en: "Notification", es: "Notificación" },
          description: { en: "Immediate notification to OIE; national emergency activation", es: "Notificación inmediata a OIE; activación de emergencia nacional" },
        },
        {
          category: { en: "Sanitary control", es: "Control sanitario" },
          description: { en: "Mass culling, controlled zones, disinfection", es: "Sacrificio masivo, zonas controladas, desinfección" },
        },
        {
          category: { en: "Prevention", es: "Prevención" },
          description: { en: "Biosecurity reinforcement and risk communication to producers", es: "Refuerzo de bioseguridad y comunicación de riesgo a productores" },
        },
      ],
      zoonotic: true,
      mandatoryNotification: true,
    },
  ],
  [
    makeDiseaseId("newcastle_disease"),
    {
      diseaseId: makeDiseaseId("newcastle_disease"),
      scores: {
        transmissibility: 4,
        severity: 4,
        mortality: 4,
        productiveImpact: 4,
        spreadSpeed: 4,
        controlDifficulty: 3,
      },
      riskBars: [
        { key: "economic", label: { en: "Economic impact", es: "Impacto económico" }, value: 4 },
        { key: "trade", label: { en: "Trade disruption", es: "Disrupción comercial" }, value: 4 },
        { key: "spread", label: { en: "Spread potential", es: "Potencial de dispersión" }, value: 4 },
        { key: "control", label: { en: "Control difficulty", es: "Dificultad de control" }, value: 3 },
      ],
      symptoms: [
        { label: { en: "Respiratory distress and gasping", es: "Distrés respiratorio y jadeo" }, weight: 1.0 },
        { label: { en: "Neurological signs (torticollis)", es: "Signos neurológicos (tortícolis)" }, weight: 0.9 },
        { label: { en: "Sudden production drop", es: "Caída brusca de producción" }, weight: 0.85 },
        { label: { en: "Greenish diarrhea", es: "Diarrea verdosa" }, weight: 0.7 },
        { label: { en: "Swollen periorbital tissue", es: "Tejido periorbital inflamado" }, weight: 0.6 },
      ],
      affectedZones: [
        { id: "head", label: { en: "Head/Nervous system", es: "Cabeza/Sistema nervioso" }, position: { x: 15, y: 15 } },
        { id: "respiratory", label: { en: "Respiratory tract", es: "Tracto respiratorio" }, position: { x: 35, y: 35 } },
        { id: "digestive", label: { en: "Digestive system", es: "Sistema digestivo" }, position: { x: 45, y: 55 } },
      ],
      transmissionRoutes: [
        { label: { en: "Direct contact with infected birds", es: "Contacto directo con aves infectadas" } },
        { label: { en: "Contaminated aerosols", es: "Aerosoles contaminados" } },
        { label: { en: "Contaminated feed and water", es: "Alimento y agua contaminados" } },
      ],
      prevention: [
        { label: { en: "Regular vaccination programs", es: "Programas de vacunación regulares" } },
        { label: { en: "Biosecurity in poultry farms", es: "Bioseguridad en granjas avícolas" } },
        { label: { en: "Isolation of new birds", es: "Aislamiento de aves nuevas" } },
      ],
      responseItems: [
        {
          category: { en: "Surveillance", es: "Vigilancia" },
          description: { en: "Monitoring of poultry flocks for clinical signs", es: "Monitoreo de parvadas para signos clínicos" },
        },
        {
          category: { en: "Notification", es: "Notificación" },
          description: { en: "Mandatory notification to SENASA", es: "Notificación obligatoria a SENASA" },
        },
        {
          category: { en: "Sanitary control", es: "Control sanitario" },
          description: { en: "Quarantine and depopulation of affected flocks", es: "Cuarentena y despoblación de parvadas afectadas" },
        },
        {
          category: { en: "Prevention", es: "Prevención" },
          description: { en: "Widespread vaccination and biosecurity audits", es: "Vacunación masiva y auditorías de bioseguridad" },
        },
      ],
      zoonotic: false,
      mandatoryNotification: true,
    },
  ],
]);
