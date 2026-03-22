"""Language-neutral disease name resolver."""

# Canonical disease taxonomy keys + known aliases (EN and ES)
DISEASE_ALIASES: dict[str, list[str]] = {
    "fmd": [
        "foot and mouth disease", "fmd", "fiebre aftosa", "aftosa",
        "foot-and-mouth disease", "aphtous fever",
    ],
    "african_swine_fever": [
        "african swine fever", "asf", "fiebre porcina africana", "fpa",
        "african swine fever virus",
    ],
    "avian_influenza": [
        "avian influenza", "bird flu", "influenza aviar", "gripe aviar",
        "highly pathogenic avian influenza", "hpai", "influenza aviaria",
    ],
    "newcastle_disease": [
        "newcastle disease", "enfermedad de newcastle", "newcastle",
        "newcastle virus",
    ],
    "brucellosis": [
        "brucellosis", "brucelosis", "brucella", "malta fever",
        "undulant fever",
    ],
    "bovine_tuberculosis": [
        "bovine tuberculosis", "tuberculosis bovina", "tb bovina", "bovine tb",
    ],
    "anthrax": [
        "anthrax", "ántrax", "antrax", "carbunco", "carbuncle",
    ],
    "prrsv": [
        "porcine reproductive and respiratory syndrome", "prrs", "prrsv",
        "sindrome reproductivo y respiratorio porcino", "srrp",
    ],
    "swine_influenza": [
        "swine influenza", "influenza porcina", "swine flu", "gripe porcina",
    ],
    "pcvd": [
        "porcine circovirus disease", "pcvd", "pcv2", "circovirus",
        "enfermedad por circovirus porcino",
    ],
    "infectious_bronchitis": [
        "infectious bronchitis", "bronquitis infecciosa", "ib",
    ],
    "marek_disease": [
        "marek disease", "enfermedad de marek", "marek's disease",
    ],
    "avian_cholera": [
        "avian cholera", "fowl cholera", "colera aviar", "pasteurellosis aviar",
    ],
    "bovine_rsv": [
        "bovine respiratory syncytial virus", "brsv", "bovine rsv",
        "virus respiratorio sincitial bovino",
    ],
    # ── Bovine (expanded) ──────────────────────────────────────────
    "bovine_viral_diarrhea": [
        "bovine viral diarrhea", "bovine viral diarrhoea", "bvd", "bvdv",
        "diarrea viral bovina", "dvb",
    ],
    "bovine_anaplasmosis": [
        "bovine anaplasmosis", "anaplasmosis bovina", "anaplasmosis", "anaplasma",
    ],
    "bovine_babesiosis": [
        "bovine babesiosis", "babesiosis bovina", "babesiosis",
        "tick fever", "fiebre de garrapata",
    ],
    "leptospirosis": [
        "leptospirosis", "leptospira", "enfermedad de weil", "weil disease",
    ],
    "blackleg": [
        "blackleg", "pierna negra", "carbunco sintomatico",
        "carbunco sintomático", "clostridial myositis",
    ],
    # ── Porcine (expanded) ─────────────────────────────────────────
    "classical_swine_fever": [
        "classical swine fever", "csf", "hog cholera",
        "fiebre porcina clasica", "fiebre porcina clásica",
        "peste porcina clasica", "peste porcina clásica",
    ],
    "porcine_epidemic_diarrhea": [
        "porcine epidemic diarrhea", "porcine epidemic diarrhoea",
        "ped", "pedv", "diarrea epidemica porcina", "diarrea epidémica porcina",
    ],
    "swine_erysipelas": [
        "swine erysipelas", "erisipela porcina", "erysipelothrix", "mal rojo",
    ],
    "aujeszky_disease": [
        "aujeszky disease", "pseudorabies", "enfermedad de aujeszky",
        "pseudorrabia", "prv",
    ],
    # ── Avian (expanded) ───────────────────────────────────────────
    "infectious_bursal_disease": [
        "infectious bursal disease", "ibd", "gumboro",
        "enfermedad de gumboro", "enfermedad infecciosa de la bolsa",
    ],
    "avian_encephalomyelitis": [
        "avian encephalomyelitis", "ae", "encefalomielitis aviar",
        "epidemic tremor",
    ],
    "mycoplasma_gallisepticum": [
        "mycoplasma gallisepticum", "mg", "micoplasmosis aviar",
        "chronic respiratory disease", "crd",
    ],
    "fowl_pox": [
        "fowl pox", "avian pox", "viruela aviar", "fowlpox",
    ],
}

# Build reverse lookup: alias -> canonical key
_ALIAS_TO_KEY: dict[str, str] = {}
for key, aliases in DISEASE_ALIASES.items():
    for alias in aliases:
        _ALIAS_TO_KEY[alias.lower().strip()] = key


def resolve_disease_key(raw_name: str) -> str | None:
    """Return the canonical disease taxonomy key for a raw name, or None."""
    normalized = raw_name.lower().strip()
    return _ALIAS_TO_KEY.get(normalized)
