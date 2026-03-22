"""Tests for disease catalog expansion, bilingual catalog, and refresh jobs."""

import pytest

from querencia_pipeline.modules.normalization.disease_resolver import (
    resolve_disease_key,
    DISEASE_ALIASES,
)
from querencia_pipeline.modules.normalization.disease_catalog import (
    DISEASE_CATALOG,
    get_catalog_entry,
    get_diseases_by_animal,
    validate_catalog_completeness,
)
from querencia_pipeline.modules.public_ingestion.refresh_jobs import (
    run_refresh,
    detect_new_diseases,
    catalog_coverage_report,
)
from querencia_pipeline.modules.public_ingestion.source_registry import get_source


# ── New disease alias resolution ──────────────────────────────────


class TestNewBovineDiseasesResolve:
    def test_bovine_viral_diarrhea_en(self):
        assert resolve_disease_key("bovine viral diarrhea") == "bovine_viral_diarrhea"

    def test_bovine_viral_diarrhea_abbr(self):
        assert resolve_disease_key("bvd") == "bovine_viral_diarrhea"

    def test_bovine_viral_diarrhea_es(self):
        assert resolve_disease_key("diarrea viral bovina") == "bovine_viral_diarrhea"

    def test_bovine_viral_diarrhoea_uk(self):
        assert resolve_disease_key("bovine viral diarrhoea") == "bovine_viral_diarrhea"

    def test_bovine_anaplasmosis_en(self):
        assert resolve_disease_key("bovine anaplasmosis") == "bovine_anaplasmosis"

    def test_bovine_anaplasmosis_es(self):
        assert resolve_disease_key("anaplasmosis bovina") == "bovine_anaplasmosis"

    def test_bovine_babesiosis_en(self):
        assert resolve_disease_key("bovine babesiosis") == "bovine_babesiosis"

    def test_bovine_babesiosis_es(self):
        assert resolve_disease_key("fiebre de garrapata") == "bovine_babesiosis"

    def test_leptospirosis_en(self):
        assert resolve_disease_key("leptospirosis") == "leptospirosis"

    def test_leptospirosis_es(self):
        assert resolve_disease_key("enfermedad de weil") == "leptospirosis"

    def test_blackleg_en(self):
        assert resolve_disease_key("blackleg") == "blackleg"

    def test_blackleg_es(self):
        assert resolve_disease_key("pierna negra") == "blackleg"

    def test_blackleg_es_accent(self):
        assert resolve_disease_key("carbunco sintomático") == "blackleg"


class TestNewPorcineDiseasesResolve:
    def test_csf_en(self):
        assert resolve_disease_key("classical swine fever") == "classical_swine_fever"

    def test_csf_abbr(self):
        assert resolve_disease_key("csf") == "classical_swine_fever"

    def test_csf_es(self):
        assert resolve_disease_key("peste porcina clásica") == "classical_swine_fever"

    def test_ped_en(self):
        assert resolve_disease_key("porcine epidemic diarrhea") == "porcine_epidemic_diarrhea"

    def test_ped_abbr(self):
        assert resolve_disease_key("pedv") == "porcine_epidemic_diarrhea"

    def test_ped_es(self):
        assert resolve_disease_key("diarrea epidémica porcina") == "porcine_epidemic_diarrhea"

    def test_erysipelas_en(self):
        assert resolve_disease_key("swine erysipelas") == "swine_erysipelas"

    def test_erysipelas_es(self):
        assert resolve_disease_key("mal rojo") == "swine_erysipelas"

    def test_aujeszky_en(self):
        assert resolve_disease_key("aujeszky disease") == "aujeszky_disease"

    def test_aujeszky_pseudorabies(self):
        assert resolve_disease_key("pseudorabies") == "aujeszky_disease"

    def test_aujeszky_es(self):
        assert resolve_disease_key("enfermedad de aujeszky") == "aujeszky_disease"


class TestNewAvianDiseasesResolve:
    def test_ibd_en(self):
        assert resolve_disease_key("infectious bursal disease") == "infectious_bursal_disease"

    def test_ibd_abbr(self):
        assert resolve_disease_key("ibd") == "infectious_bursal_disease"

    def test_ibd_es(self):
        assert resolve_disease_key("enfermedad de gumboro") == "infectious_bursal_disease"

    def test_ae_en(self):
        assert resolve_disease_key("avian encephalomyelitis") == "avian_encephalomyelitis"

    def test_ae_es(self):
        assert resolve_disease_key("encefalomielitis aviar") == "avian_encephalomyelitis"

    def test_mg_en(self):
        assert resolve_disease_key("mycoplasma gallisepticum") == "mycoplasma_gallisepticum"

    def test_mg_es(self):
        assert resolve_disease_key("micoplasmosis aviar") == "mycoplasma_gallisepticum"

    def test_mg_crd(self):
        assert resolve_disease_key("chronic respiratory disease") == "mycoplasma_gallisepticum"

    def test_fowl_pox_en(self):
        assert resolve_disease_key("fowl pox") == "fowl_pox"

    def test_fowl_pox_es(self):
        assert resolve_disease_key("viruela aviar") == "fowl_pox"


# ── Original disease regression ───────────────────────────────────


class TestOriginalDiseasesStillResolve:
    """Regression: all 14 original diseases must still resolve."""

    @pytest.mark.parametrize(
        "alias,expected_key",
        [
            ("foot and mouth disease", "fmd"),
            ("fiebre aftosa", "fmd"),
            ("african swine fever", "african_swine_fever"),
            ("avian influenza", "avian_influenza"),
            ("gripe aviar", "avian_influenza"),
            ("newcastle disease", "newcastle_disease"),
            ("brucellosis", "brucellosis"),
            ("brucelosis", "brucellosis"),
            ("bovine tuberculosis", "bovine_tuberculosis"),
            ("anthrax", "anthrax"),
            ("carbunco", "anthrax"),
            ("prrs", "prrsv"),
            ("swine influenza", "swine_influenza"),
            ("pcvd", "pcvd"),
            ("infectious bronchitis", "infectious_bronchitis"),
            ("marek disease", "marek_disease"),
            ("avian cholera", "avian_cholera"),
            ("bovine rsv", "bovine_rsv"),
        ],
    )
    def test_original_alias(self, alias, expected_key):
        assert resolve_disease_key(alias) == expected_key


# ── Catalog completeness and content ──────────────────────────────


class TestCatalogCompleteness:
    def test_every_alias_key_in_catalog(self):
        """Every disease key in DISEASE_ALIASES must have a DISEASE_CATALOG entry."""
        missing = validate_catalog_completeness()
        assert missing == [], f"Missing catalog entries: {missing}"

    def test_catalog_has_27_entries(self):
        assert len(DISEASE_CATALOG) == 27

    def test_aliases_has_27_entries(self):
        assert len(DISEASE_ALIASES) == 27

    def test_all_entries_have_name_en(self):
        for key, entry in DISEASE_CATALOG.items():
            assert entry.name_en, f"{key} missing name_en"

    def test_all_entries_have_name_es(self):
        for key, entry in DISEASE_CATALOG.items():
            assert entry.name_es, f"{key} missing name_es"

    def test_all_entries_have_at_least_one_animal_type(self):
        for key, entry in DISEASE_CATALOG.items():
            assert len(entry.animal_types) >= 1, f"{key} has no animal_types"

    def test_all_entries_have_description_en(self):
        for key, entry in DISEASE_CATALOG.items():
            assert entry.description_en, f"{key} missing description_en"

    def test_all_entries_have_description_es(self):
        for key, entry in DISEASE_CATALOG.items():
            assert entry.description_es, f"{key} missing description_es"

    def test_key_matches_entry_key(self):
        for key, entry in DISEASE_CATALOG.items():
            assert key == entry.key, f"Dict key {key} != entry.key {entry.key}"


# ── get_diseases_by_animal ────────────────────────────────────────


class TestGetDiseasesByAnimal:
    def test_bovine_count(self):
        bovine = get_diseases_by_animal("bovine")
        # Original bovine: fmd, brucellosis, bovine_tuberculosis, anthrax, bovine_rsv (5)
        # New bovine: bovine_viral_diarrhea, bovine_anaplasmosis, bovine_babesiosis,
        #             leptospirosis, blackleg (5)
        assert len(bovine) >= 10

    def test_porcine_count(self):
        porcine = get_diseases_by_animal("porcine")
        # Original porcine: fmd, african_swine_fever, brucellosis, anthrax, prrsv,
        #                    swine_influenza, pcvd (7)
        # New porcine: classical_swine_fever, porcine_epidemic_diarrhea,
        #              swine_erysipelas, aujeszky_disease, leptospirosis (5)
        assert len(porcine) >= 12

    def test_avian_count(self):
        avian = get_diseases_by_animal("avian")
        # Original avian: avian_influenza, newcastle_disease, anthrax,
        #                  infectious_bronchitis, marek_disease, avian_cholera (6)
        # New avian: infectious_bursal_disease, avian_encephalomyelitis,
        #            mycoplasma_gallisepticum, fowl_pox (4)
        assert len(avian) >= 10

    def test_unknown_animal_returns_empty(self):
        assert get_diseases_by_animal("reptile") == []

    def test_entries_are_catalog_entries(self):
        from querencia_pipeline.modules.normalization.disease_catalog import DiseaseCatalogEntry

        for entry in get_diseases_by_animal("bovine"):
            assert isinstance(entry, DiseaseCatalogEntry)


# ── get_catalog_entry ─────────────────────────────────────────────


class TestGetCatalogEntry:
    def test_existing_key(self):
        entry = get_catalog_entry("fmd")
        assert entry is not None
        assert entry.name_en == "Foot-and-Mouth Disease"
        assert entry.name_es == "Fiebre Aftosa"

    def test_new_key(self):
        entry = get_catalog_entry("classical_swine_fever")
        assert entry is not None
        assert entry.oie_listed is True

    def test_unknown_key(self):
        assert get_catalog_entry("nonexistent") is None


# ── Refresh jobs ──────────────────────────────────────────────────


class TestRunRefresh:
    def test_success_with_valid_csv_data(self):
        rows = [
            {
                "disease": "Foot and Mouth Disease",
                "species": "cattle",
                "date": "2024-03-15",
                "location": "Buenos Aires",
                "lat": "-34.6",
                "lng": "-58.4",
            },
        ]
        result = run_refresh("senasa_ar", rows)
        assert result.success is True
        assert result.records_ingested == 1
        assert result.records_normalized == 1
        assert result.records_failed == 0
        assert result.errors == []
        assert result.completed_at is not None

    def test_unknown_source_returns_error(self):
        result = run_refresh("nonexistent_source", [{"disease": "fmd"}])
        assert result.success is False
        assert len(result.errors) == 1
        assert "Unknown source" in result.errors[0]

    def test_tracks_new_disease_names(self):
        rows = [
            {
                "disease": "Some Completely Unknown Disease",
                "species": "cattle",
                "date": "2024-01-01",
                "location": "test",
                "lat": "0",
                "lng": "0",
            },
        ]
        result = run_refresh("senasa_ar", rows)
        assert result.success is True
        assert "Some Completely Unknown Disease" in result.new_disease_keys_seen

    def test_refresh_with_new_ica_source(self):
        rows = [
            {
                "disease": "Fiebre Aftosa",
                "species": "cattle",
                "date": "2024-06-01",
                "location": "Bogota",
                "lat": "4.7",
                "lng": "-74.0",
            },
        ]
        result = run_refresh("ica_co", rows)
        assert result.success is True
        assert result.records_ingested == 1


# ── detect_new_diseases ───────────────────────────────────────────


class TestDetectNewDiseases:
    def test_known_diseases_not_detected(self):
        assert detect_new_diseases(["foot and mouth disease", "brucellosis"]) == []

    def test_unknown_diseases_detected(self):
        unknown = detect_new_diseases(["mystery plague", "brucellosis", "space flu"])
        assert unknown == ["mystery plague", "space flu"]

    def test_empty_list(self):
        assert detect_new_diseases([]) == []


# ── catalog_coverage_report ───────────────────────────────────────


class TestCatalogCoverageReport:
    def test_report_structure(self):
        report = catalog_coverage_report()
        assert "total_diseases" in report
        assert "by_animal" in report
        assert "missing_from_catalog" in report
        assert "oie_listed_count" in report

    def test_total_count(self):
        report = catalog_coverage_report()
        assert report["total_diseases"] == 27

    def test_no_missing(self):
        report = catalog_coverage_report()
        assert report["missing_from_catalog"] == []

    def test_oie_listed_positive(self):
        report = catalog_coverage_report()
        assert report["oie_listed_count"] > 0

    def test_by_animal_keys(self):
        report = catalog_coverage_report()
        assert "bovine" in report["by_animal"]
        assert "porcine" in report["by_animal"]
        assert "avian" in report["by_animal"]


# ── Source registry ───────────────────────────────────────────────


class TestSourceRegistry:
    def test_ica_co_exists(self):
        config = get_source("ica_co")
        assert config is not None
        assert config.label == "ICA Colombia"
        assert config.format == "csv"
