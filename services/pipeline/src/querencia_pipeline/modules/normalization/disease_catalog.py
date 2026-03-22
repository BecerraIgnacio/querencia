"""Structured bilingual disease catalog for content generation."""

from dataclasses import dataclass, field


@dataclass
class DiseaseCatalogEntry:
    """Bilingual disease catalog entry."""

    key: str
    name_en: str
    name_es: str
    animal_types: list[str]
    scientific_name: str | None = None
    oie_listed: bool = False
    description_en: str = ""
    description_es: str = ""


DISEASE_CATALOG: dict[str, DiseaseCatalogEntry] = {
    # ── Original 14 diseases ───────────────────────────────────────
    "fmd": DiseaseCatalogEntry(
        key="fmd",
        name_en="Foot-and-Mouth Disease",
        name_es="Fiebre Aftosa",
        animal_types=["bovine", "porcine"],
        scientific_name="Aphthovirus",
        oie_listed=True,
        description_en="A highly contagious viral disease affecting cloven-hoofed animals, causing fever, blisters, and lameness.",
        description_es="Enfermedad viral altamente contagiosa que afecta a animales de pezuña hendida, causando fiebre, vesículas y cojera.",
    ),
    "african_swine_fever": DiseaseCatalogEntry(
        key="african_swine_fever",
        name_en="African Swine Fever",
        name_es="Fiebre Porcina Africana",
        animal_types=["porcine"],
        scientific_name="Asfivirus",
        oie_listed=True,
        description_en="A severe hemorrhagic viral disease of domestic and wild pigs with high mortality rates.",
        description_es="Enfermedad viral hemorrágica grave de cerdos domésticos y silvestres con altas tasas de mortalidad.",
    ),
    "avian_influenza": DiseaseCatalogEntry(
        key="avian_influenza",
        name_en="Avian Influenza",
        name_es="Influenza Aviar",
        animal_types=["avian"],
        scientific_name="Influenza A virus",
        oie_listed=True,
        description_en="A viral infection of birds caused by influenza A viruses, ranging from low to highly pathogenic strains.",
        description_es="Infección viral de aves causada por virus de influenza A, con cepas de baja a alta patogenicidad.",
    ),
    "newcastle_disease": DiseaseCatalogEntry(
        key="newcastle_disease",
        name_en="Newcastle Disease",
        name_es="Enfermedad de Newcastle",
        animal_types=["avian"],
        scientific_name="Avian orthoavulavirus 1",
        oie_listed=True,
        description_en="A contagious viral disease of birds causing respiratory, nervous, and digestive signs with high mortality.",
        description_es="Enfermedad viral contagiosa de aves que causa signos respiratorios, nerviosos y digestivos con alta mortalidad.",
    ),
    "brucellosis": DiseaseCatalogEntry(
        key="brucellosis",
        name_en="Brucellosis",
        name_es="Brucelosis",
        animal_types=["bovine", "porcine"],
        scientific_name="Brucella spp.",
        oie_listed=True,
        description_en="A bacterial zoonotic disease causing reproductive failure in livestock and undulant fever in humans.",
        description_es="Enfermedad bacteriana zoonótica que causa fallas reproductivas en ganado y fiebre ondulante en humanos.",
    ),
    "bovine_tuberculosis": DiseaseCatalogEntry(
        key="bovine_tuberculosis",
        name_en="Bovine Tuberculosis",
        name_es="Tuberculosis Bovina",
        animal_types=["bovine"],
        scientific_name="Mycobacterium bovis",
        oie_listed=True,
        description_en="A chronic bacterial disease of cattle causing progressive lung lesions and wasting.",
        description_es="Enfermedad bacteriana crónica del ganado bovino que causa lesiones pulmonares progresivas y emaciación.",
    ),
    "anthrax": DiseaseCatalogEntry(
        key="anthrax",
        name_en="Anthrax",
        name_es="Ántrax",
        animal_types=["bovine", "porcine", "avian"],
        scientific_name="Bacillus anthracis",
        oie_listed=True,
        description_en="An acute zoonotic disease caused by spore-forming bacteria, affecting most warm-blooded animals.",
        description_es="Enfermedad zoonótica aguda causada por bacterias formadoras de esporas, que afecta a la mayoría de animales de sangre caliente.",
    ),
    "prrsv": DiseaseCatalogEntry(
        key="prrsv",
        name_en="Porcine Reproductive and Respiratory Syndrome",
        name_es="Síndrome Reproductivo y Respiratorio Porcino",
        animal_types=["porcine"],
        scientific_name="Betaarterivirus suid 1",
        oie_listed=True,
        description_en="A viral disease of pigs causing reproductive failure in sows and respiratory distress in piglets.",
        description_es="Enfermedad viral de cerdos que causa fallas reproductivas en cerdas y dificultad respiratoria en lechones.",
    ),
    "swine_influenza": DiseaseCatalogEntry(
        key="swine_influenza",
        name_en="Swine Influenza",
        name_es="Influenza Porcina",
        animal_types=["porcine"],
        scientific_name="Influenza A virus",
        oie_listed=True,
        description_en="A respiratory disease of pigs caused by influenza A viruses, with rapid spread in herds.",
        description_es="Enfermedad respiratoria de cerdos causada por virus de influenza A, con rápida propagación en piaras.",
    ),
    "pcvd": DiseaseCatalogEntry(
        key="pcvd",
        name_en="Porcine Circovirus Disease",
        name_es="Enfermedad por Circovirus Porcino",
        animal_types=["porcine"],
        scientific_name="Porcine circovirus 2",
        oie_listed=False,
        description_en="A multisystemic wasting syndrome in pigs caused by porcine circovirus type 2.",
        description_es="Síndrome de emaciación multisistémica en cerdos causado por circovirus porcino tipo 2.",
    ),
    "infectious_bronchitis": DiseaseCatalogEntry(
        key="infectious_bronchitis",
        name_en="Infectious Bronchitis",
        name_es="Bronquitis Infecciosa",
        animal_types=["avian"],
        scientific_name="Avian coronavirus",
        oie_listed=True,
        description_en="A highly contagious respiratory disease of chickens caused by avian coronavirus.",
        description_es="Enfermedad respiratoria altamente contagiosa de pollos causada por coronavirus aviar.",
    ),
    "marek_disease": DiseaseCatalogEntry(
        key="marek_disease",
        name_en="Marek's Disease",
        name_es="Enfermedad de Marek",
        animal_types=["avian"],
        scientific_name="Gallid alphaherpesvirus 2",
        oie_listed=True,
        description_en="A viral neoplastic disease of poultry causing tumors, paralysis, and immunosuppression.",
        description_es="Enfermedad viral neoplásica de aves de corral que causa tumores, parálisis e inmunosupresión.",
    ),
    "avian_cholera": DiseaseCatalogEntry(
        key="avian_cholera",
        name_en="Avian Cholera",
        name_es="Cólera Aviar",
        animal_types=["avian"],
        scientific_name="Pasteurella multocida",
        oie_listed=False,
        description_en="A contagious bacterial disease of birds causing septicemia and high mortality.",
        description_es="Enfermedad bacteriana contagiosa de aves que causa septicemia y alta mortalidad.",
    ),
    "bovine_rsv": DiseaseCatalogEntry(
        key="bovine_rsv",
        name_en="Bovine Respiratory Syncytial Virus",
        name_es="Virus Respiratorio Sincitial Bovino",
        animal_types=["bovine"],
        scientific_name="Orthopneumovirus bovis",
        oie_listed=False,
        description_en="A common viral cause of respiratory disease in young cattle, especially in confined herds.",
        description_es="Causa viral común de enfermedad respiratoria en bovinos jóvenes, especialmente en rebaños confinados.",
    ),
    # ── New bovine diseases ────────────────────────────────────────
    "bovine_viral_diarrhea": DiseaseCatalogEntry(
        key="bovine_viral_diarrhea",
        name_en="Bovine Viral Diarrhea",
        name_es="Diarrea Viral Bovina",
        animal_types=["bovine"],
        scientific_name="Pestivirus bovis",
        oie_listed=True,
        description_en="A viral disease of cattle causing diarrhea, immunosuppression, and reproductive losses.",
        description_es="Enfermedad viral del ganado bovino que causa diarrea, inmunosupresión y pérdidas reproductivas.",
    ),
    "bovine_anaplasmosis": DiseaseCatalogEntry(
        key="bovine_anaplasmosis",
        name_en="Bovine Anaplasmosis",
        name_es="Anaplasmosis Bovina",
        animal_types=["bovine"],
        scientific_name="Anaplasma marginale",
        oie_listed=True,
        description_en="A tick-borne rickettsial disease of cattle causing severe anemia and jaundice.",
        description_es="Enfermedad rickettsial del ganado transmitida por garrapatas que causa anemia severa e ictericia.",
    ),
    "bovine_babesiosis": DiseaseCatalogEntry(
        key="bovine_babesiosis",
        name_en="Bovine Babesiosis",
        name_es="Babesiosis Bovina",
        animal_types=["bovine"],
        scientific_name="Babesia bovis",
        oie_listed=True,
        description_en="A tick-borne protozoal disease of cattle causing fever, hemolytic anemia, and hemoglobinuria.",
        description_es="Enfermedad protozoaria del ganado transmitida por garrapatas que causa fiebre, anemia hemolítica y hemoglobinuria.",
    ),
    "leptospirosis": DiseaseCatalogEntry(
        key="leptospirosis",
        name_en="Leptospirosis",
        name_es="Leptospirosis",
        animal_types=["bovine", "porcine"],
        scientific_name="Leptospira spp.",
        oie_listed=True,
        description_en="A bacterial zoonosis affecting multiple species, causing renal failure and reproductive loss.",
        description_es="Zoonosis bacteriana que afecta a múltiples especies, causando insuficiencia renal y pérdidas reproductivas.",
    ),
    "blackleg": DiseaseCatalogEntry(
        key="blackleg",
        name_en="Blackleg",
        name_es="Pierna Negra",
        animal_types=["bovine"],
        scientific_name="Clostridium chauvoei",
        oie_listed=False,
        description_en="An acute clostridial myositis of cattle causing sudden death, particularly in young stock.",
        description_es="Mionecrosis clostridial aguda del ganado bovino que causa muerte súbita, especialmente en animales jóvenes.",
    ),
    # ── New porcine diseases ───────────────────────────────────────
    "classical_swine_fever": DiseaseCatalogEntry(
        key="classical_swine_fever",
        name_en="Classical Swine Fever",
        name_es="Fiebre Porcina Clásica",
        animal_types=["porcine"],
        scientific_name="Pestivirus suis",
        oie_listed=True,
        description_en="A highly contagious viral disease of pigs causing hemorrhagic fever and high mortality.",
        description_es="Enfermedad viral altamente contagiosa de cerdos que causa fiebre hemorrágica y alta mortalidad.",
    ),
    "porcine_epidemic_diarrhea": DiseaseCatalogEntry(
        key="porcine_epidemic_diarrhea",
        name_en="Porcine Epidemic Diarrhea",
        name_es="Diarrea Epidémica Porcina",
        animal_types=["porcine"],
        scientific_name="Alphacoronavirus 1",
        oie_listed=True,
        description_en="A viral enteric disease of pigs causing severe watery diarrhea and dehydration in neonates.",
        description_es="Enfermedad entérica viral de cerdos que causa diarrea acuosa severa y deshidratación en neonatos.",
    ),
    "swine_erysipelas": DiseaseCatalogEntry(
        key="swine_erysipelas",
        name_en="Swine Erysipelas",
        name_es="Erisipela Porcina",
        animal_types=["porcine"],
        scientific_name="Erysipelothrix rhusiopathiae",
        oie_listed=True,
        description_en="A bacterial disease of pigs causing skin lesions, arthritis, and endocarditis.",
        description_es="Enfermedad bacteriana de cerdos que causa lesiones cutáneas, artritis y endocarditis.",
    ),
    "aujeszky_disease": DiseaseCatalogEntry(
        key="aujeszky_disease",
        name_en="Aujeszky's Disease",
        name_es="Enfermedad de Aujeszky",
        animal_types=["porcine"],
        scientific_name="Suid alphaherpesvirus 1",
        oie_listed=True,
        description_en="A viral disease of pigs (pseudorabies) causing neurological signs, reproductive failure, and respiratory illness.",
        description_es="Enfermedad viral de cerdos (pseudorrabia) que causa signos neurológicos, fallas reproductivas y enfermedad respiratoria.",
    ),
    # ── New avian diseases ─────────────────────────────────────────
    "infectious_bursal_disease": DiseaseCatalogEntry(
        key="infectious_bursal_disease",
        name_en="Infectious Bursal Disease",
        name_es="Enfermedad de Gumboro",
        animal_types=["avian"],
        scientific_name="Avibirnavirus",
        oie_listed=True,
        description_en="A highly contagious immunosuppressive disease of young chickens targeting the bursa of Fabricius.",
        description_es="Enfermedad inmunosupresora altamente contagiosa de pollos jóvenes que afecta la bolsa de Fabricio.",
    ),
    "avian_encephalomyelitis": DiseaseCatalogEntry(
        key="avian_encephalomyelitis",
        name_en="Avian Encephalomyelitis",
        name_es="Encefalomielitis Aviar",
        animal_types=["avian"],
        scientific_name="Tremovirus A",
        oie_listed=False,
        description_en="A viral disease of young poultry causing ataxia, tremors, and reduced egg production.",
        description_es="Enfermedad viral de aves jóvenes que causa ataxia, temblores y reducción en la producción de huevos.",
    ),
    "mycoplasma_gallisepticum": DiseaseCatalogEntry(
        key="mycoplasma_gallisepticum",
        name_en="Mycoplasma gallisepticum Infection",
        name_es="Micoplasmosis Aviar",
        animal_types=["avian"],
        scientific_name="Mycoplasma gallisepticum",
        oie_listed=True,
        description_en="A chronic respiratory disease of poultry causing nasal discharge, coughing, and reduced performance.",
        description_es="Enfermedad respiratoria crónica de aves de corral que causa secreción nasal, tos y reducción del rendimiento.",
    ),
    "fowl_pox": DiseaseCatalogEntry(
        key="fowl_pox",
        name_en="Fowl Pox",
        name_es="Viruela Aviar",
        animal_types=["avian"],
        scientific_name="Avipoxvirus",
        oie_listed=False,
        description_en="A slow-spreading viral disease of poultry causing skin lesions and diphtheritic membranes.",
        description_es="Enfermedad viral de propagación lenta en aves de corral que causa lesiones cutáneas y membranas diftéricas.",
    ),
}


def get_catalog_entry(disease_key: str) -> DiseaseCatalogEntry | None:
    """Return the catalog entry for a disease key, or None."""
    return DISEASE_CATALOG.get(disease_key)


def get_diseases_by_animal(animal_type: str) -> list[DiseaseCatalogEntry]:
    """Return all catalog entries that affect the given animal type."""
    return [e for e in DISEASE_CATALOG.values() if animal_type in e.animal_types]


def validate_catalog_completeness() -> list[str]:
    """Return disease keys in DISEASE_ALIASES but missing from DISEASE_CATALOG."""
    from .disease_resolver import DISEASE_ALIASES

    return [key for key in DISEASE_ALIASES if key not in DISEASE_CATALOG]
