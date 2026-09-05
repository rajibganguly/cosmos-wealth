from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Cosmos Wealth API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://rajibganguly.github.io",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root() -> dict[str, str]:
    return {"service": "cosmos-wealth-api", "status": "ok"}


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "cosmos-wealth-api"}


@app.get("/api/portfolio")
def get_portfolio() -> dict[str, list[dict[str, str]]]:
    return {
        "assets": [
            {
                "name": "International Fund of Funds",
                "value": "428620",
                "change": "+12.80%"
            },
            {
                "name": "Thematic - Energy & Infra",
                "value": "184250",
                "change": "+21.84%"
            },
            {
                "name": "Liquid Debt Fund",
                "value": "96840",
                "change": "+6.85%"
            }
            ]
    }
