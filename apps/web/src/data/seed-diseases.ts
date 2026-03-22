import type { AnimalType, DiseaseId } from "@querencia/core-domain";
import { makeDiseaseId } from "@querencia/core-domain";
import type { LocalizedDiseaseContent } from "@querencia/contracts";

export interface SeedDisease extends LocalizedDiseaseContent {
  animalTypes: AnimalType[];
}

export const SEED_DISEASES: SeedDisease[] = [
  // Bovine
  {
    id: makeDiseaseId("fmd"),
    slug: "foot-and-mouth-disease",
    animalTypes: ["bovine", "porcine"],
    name: { en: "Foot and Mouth Disease", es: "Fiebre Aftosa" },
    summary: {
      en: "Highly contagious viral disease affecting cloven-hoofed animals.",
      es: "Enfermedad viral altamente contagiosa que afecta a animales con pezuñas hendidas.",
    },
    affectedSpecies: ["bovine", "porcine", "ovine", "caprine"],
    transmissionMethod: {
      en: "Direct contact, airborne, contaminated feed and equipment.",
      es: "Contacto directo, vía aérea, alimentos y equipos contaminados.",
    },
    contagiousnessLevel: { en: "Very high", es: "Muy alta" },
    severityLevel: { en: "Critical", es: "Crítica" },
    symptoms: {
      en: "Blisters on mouth, tongue, feet, and teats; fever; lameness; drooling.",
      es: "Vesículas en boca, lengua, patas y ubres; fiebre; cojera; salivación excesiva.",
    },
    productionImpact: {
      en: "Severe production losses; trade restrictions; international market closure.",
      es: "Pérdidas graves de producción; restricciones comerciales; cierre de mercados internacionales.",
    },
    notes: {
      en: "Notifiable disease. Argentina is FMD-free with vaccination.",
      es: "Enfermedad de notificación obligatoria. Argentina libre de aftosa con vacunación.",
    },
    sourceReferences: ["WOAH/OIE", "SENASA Argentina"],
  },
  {
    id: makeDiseaseId("brucellosis"),
    slug: "brucellosis",
    animalTypes: ["bovine"],
    name: { en: "Brucellosis", es: "Brucelosis" },
    summary: {
      en: "Bacterial infection causing reproductive failure and zoonotic risk.",
      es: "Infección bacteriana que causa falla reproductiva y riesgo zoonótico.",
    },
    affectedSpecies: ["bovine", "ovine", "caprine", "porcine"],
    transmissionMethod: {
      en: "Contact with birth fluids, aborted fetuses, unpasteurized dairy products.",
      es: "Contacto con fluidos del parto, fetos abortados, productos lácteos no pasteurizados.",
    },
    contagiousnessLevel: { en: "Moderate", es: "Moderada" },
    severityLevel: { en: "High", es: "Alta" },
    symptoms: {
      en: "Abortion, retained placenta, reduced fertility, orchitis in males.",
      es: "Aborto, retención de placenta, fertilidad reducida, orquitis en machos.",
    },
    productionImpact: {
      en: "Significant reproductive losses and trade restrictions.",
      es: "Pérdidas reproductivas significativas y restricciones comerciales.",
    },
    notes: {
      en: "Zoonotic disease. Notifiable to SENASA.",
      es: "Enfermedad zoonótica. Notificación obligatoria a SENASA.",
    },
    sourceReferences: ["WOAH/OIE", "SENASA Argentina"],
  },
  {
    id: makeDiseaseId("bovine_tuberculosis"),
    slug: "bovine-tuberculosis",
    animalTypes: ["bovine"],
    name: { en: "Bovine Tuberculosis", es: "Tuberculosis Bovina" },
    summary: {
      en: "Chronic bacterial disease affecting bovine respiratory system.",
      es: "Enfermedad bacteriana crónica que afecta el sistema respiratorio bovino.",
    },
    affectedSpecies: ["bovine"],
    transmissionMethod: {
      en: "Inhalation of infected aerosols; ingestion of contaminated milk.",
      es: "Inhalación de aerosoles infectados; ingestión de leche contaminada.",
    },
    contagiousnessLevel: { en: "Low to moderate", es: "Baja a moderada" },
    severityLevel: { en: "High", es: "Alta" },
    symptoms: {
      en: "Chronic cough, progressive weight loss, enlarged lymph nodes.",
      es: "Tos crónica, pérdida de peso progresiva, ganglios linfáticos aumentados.",
    },
    productionImpact: {
      en: "Herd culling, export restrictions, milk rejection.",
      es: "Descarte de rodeo, restricciones de exportación, rechazo de leche.",
    },
    notes: {
      en: "Zoonotic risk. National eradication program in Argentina.",
      es: "Riesgo zoonótico. Programa nacional de erradicación en Argentina.",
    },
    sourceReferences: ["SENASA Argentina", "WOAH/OIE"],
  },
  // Porcine
  {
    id: makeDiseaseId("african_swine_fever"),
    slug: "african-swine-fever",
    animalTypes: ["porcine"],
    name: { en: "African Swine Fever", es: "Fiebre Porcina Africana" },
    summary: {
      en: "Highly lethal viral hemorrhagic disease with no vaccine available.",
      es: "Enfermedad viral hemorrágica altamente letal sin vacuna disponible.",
    },
    affectedSpecies: ["porcine"],
    transmissionMethod: {
      en: "Direct contact, contaminated feed, clothing, equipment, ticks.",
      es: "Contacto directo, alimentos contaminados, ropa, equipos, garrapatas.",
    },
    contagiousnessLevel: { en: "Very high", es: "Muy alta" },
    severityLevel: { en: "Critical", es: "Crítica" },
    symptoms: {
      en: "High fever, hemorrhages, sudden death, cyanosis of skin.",
      es: "Fiebre alta, hemorragias, muerte súbita, cianosis cutánea.",
    },
    productionImpact: {
      en: "Complete herd loss, trade bans, economic collapse of affected regions.",
      es: "Pérdida total del rodeo, prohibiciones comerciales, colapso económico regional.",
    },
    notes: {
      en: "Not present in South America. Strict biosecurity alert.",
      es: "No presente en Sudamérica. Alerta de bioseguridad estricta.",
    },
    sourceReferences: ["WOAH/OIE", "FAO"],
  },
  {
    id: makeDiseaseId("prrsv"),
    slug: "prrsv",
    animalTypes: ["porcine"],
    name: {
      en: "Porcine Reproductive and Respiratory Syndrome",
      es: "Síndrome Reproductivo y Respiratorio Porcino",
    },
    summary: {
      en: "Major swine disease affecting reproduction and respiratory health.",
      es: "Enfermedad porcina mayor que afecta la reproducción y la salud respiratoria.",
    },
    affectedSpecies: ["porcine"],
    transmissionMethod: {
      en: "Contact with infected pigs, semen, contaminated fomites.",
      es: "Contacto con cerdos infectados, semen, fómites contaminados.",
    },
    contagiousnessLevel: { en: "High", es: "Alta" },
    severityLevel: { en: "High", es: "Alta" },
    symptoms: {
      en: "Reproductive failure in sows, respiratory distress in piglets.",
      es: "Falla reproductiva en cerdas, distrés respiratorio en lechones.",
    },
    productionImpact: {
      en: "Major production losses in swine industry worldwide.",
      es: "Grandes pérdidas productivas en la industria porcina mundial.",
    },
    notes: {
      en: "Vaccines available but do not fully prevent infection.",
      es: "Vacunas disponibles pero no previenen completamente la infección.",
    },
    sourceReferences: ["WOAH/OIE"],
  },
  // Avian
  {
    id: makeDiseaseId("avian_influenza"),
    slug: "avian-influenza",
    animalTypes: ["avian"],
    name: { en: "Avian Influenza", es: "Influenza Aviar" },
    summary: {
      en: "Highly pathogenic viral disease with pandemic potential.",
      es: "Enfermedad viral altamente patógena con potencial pandémico.",
    },
    affectedSpecies: ["avian"],
    transmissionMethod: {
      en: "Contact with infected birds, contaminated water, wild bird vectors.",
      es: "Contacto con aves infectadas, agua contaminada, aves silvestres vectores.",
    },
    contagiousnessLevel: { en: "Very high (HPAI)", es: "Muy alta (IAPP)" },
    severityLevel: { en: "Critical", es: "Crítica" },
    symptoms: {
      en: "Sudden death, respiratory distress, swollen head, cyanotic combs.",
      es: "Muerte súbita, distrés respiratorio, cabeza inflamada, crestas cianóticas.",
    },
    productionImpact: {
      en: "Mass culling, international trade suspension, severe economic losses.",
      es: "Sacrificio masivo, suspensión del comercio internacional, graves pérdidas económicas.",
    },
    notes: {
      en: "Active surveillance required. Migratory birds are key risk factors.",
      es: "Vigilancia activa requerida. Las aves migratorias son factores clave de riesgo.",
    },
    sourceReferences: ["WOAH/OIE", "SENASA Argentina"],
  },
  {
    id: makeDiseaseId("newcastle_disease"),
    slug: "newcastle-disease",
    animalTypes: ["avian"],
    name: { en: "Newcastle Disease", es: "Enfermedad de Newcastle" },
    summary: {
      en: "Contagious viral disease affecting all bird species.",
      es: "Enfermedad viral contagiosa que afecta a todas las especies de aves.",
    },
    affectedSpecies: ["avian"],
    transmissionMethod: {
      en: "Direct contact with infected birds, contaminated aerosols.",
      es: "Contacto directo con aves infectadas, aerosoles contaminados.",
    },
    contagiousnessLevel: { en: "High", es: "Alta" },
    severityLevel: { en: "High", es: "Alta" },
    symptoms: {
      en: "Respiratory distress, neurological signs, sudden production drop.",
      es: "Distrés respiratorio, signos neurológicos, caída brusca de producción.",
    },
    productionImpact: {
      en: "High mortality, egg production collapse, trade restrictions.",
      es: "Alta mortalidad, colapso de producción de huevos, restricciones comerciales.",
    },
    notes: {
      en: "Notifiable disease. Vaccination programs widely used.",
      es: "Enfermedad de notificación obligatoria. Programas de vacunación ampliamente usados.",
    },
    sourceReferences: ["WOAH/OIE"],
  },
];
