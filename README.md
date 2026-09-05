# Cosmos Wealth

A React frontend and FastAPI backend for the Cosmos Wealth dashboard.

## Frontend

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies `/api` requests to the backend.

## Backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

The API runs at `http://localhost:8000`. Interactive API docs are available at `/docs`.

Available endpoints:

- `GET /api/health`
- `GET /api/portfolio`