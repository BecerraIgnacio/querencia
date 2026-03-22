"""Sample CSV rows for ingestion tests."""

VALID_CSV_ROWS = [
    {
        "disease": "Foot and Mouth Disease",
        "species": "cattle",
        "date": "2024-03-15",
        "location": "Buenos Aires, Argentina",
        "lat": "-34.6037",
        "lng": "-58.3816",
    },
    {
        "disease": "Brucellosis",
        "species": "bovine",
        "date": "2024-02-10",
        "location": "Córdoba, Argentina",
        "lat": "-31.4201",
        "lng": "-64.1888",
    },
    {
        "disease": "African Swine Fever",
        "species": "pig",
        "date": "2024-01-20",
        "location": "Santa Fe, Argentina",
        "lat": "-31.6107",
        "lng": "-60.6972",
    },
]

INVALID_CSV_ROWS = [
    {
        "disease": "",
        "species": "cattle",
        "date": "2024-03-15",
        "location": "",
        "lat": "",
        "lng": "",
    },
]
