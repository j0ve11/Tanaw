# XGBoost Model Integration Guide

## Overview
Integration of your 2-layer ensemble model into TANAW for satellite-based rice yield forecasting.

**Model Architecture:**
- Layer 1: XGBoost regressor (100 trees, 11 features)
- Layer 2: Bi-LSTM neural network (TensorFlow/Keras)
- Input: 5 dekads × 11 satellite features
- Output: Metric tons yield prediction

## Integration Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  React Frontend │ ◄──────►│  TanStack Start │ ◄──────►│  Python API     │
│  (Browser)      │  HTTP   │  Server         │  Proxy  │  (FastAPI)     │
└─────────────────┘         └─────────────────┘         └─────────────────┘
       │                            │                             │
       ▼                            ▼                             ▼
   forecast.tsx              api/forecast                   model.json +
   (form inputs)             (API route)                    xgboost model
```

## Step-by-Step Implementation

### Step 1: Create Python Backend (FastAPI) ✅

**File:** `api/forecast_api.py`

The FastAPI backend is implemented with:
- Model loading (XGBoost + Bi-LSTM + scalers)
- Feature preparation for 5 dekads × 11 features
- Two-layer ensemble prediction pipeline

### Step 2: Add API Route in TanStack Start ✅

**File:** `src/routes/api/forecast.ts`

The proxy route is implemented with:
- Request forwarding to Python backend (`http://localhost:8000/api/forecast`)
- Error handling (503 when backend unavailable)

### Step 3: Update forecast-service.ts ✅

**File:** `src/lib/forecast-service.ts`

The service is implemented with:
- `calculateForecast()` function for API calls
- `DekadFeatures` interface with 11 satellite features
- Fallback estimation when satellite data unavailable
- `generateSampleDekadFeatures()` helper for testing

### Step 4: Update forecast.tsx Component ✅

**File:** `src/routes/forecast.tsx`

The component is updated with:
- Async `compute()` function handling
- Loading states (`isLoading` state)
- Error handling with try/catch

## Alternative: Node.js Backend with XGBoost

If you prefer to keep everything in Node.js:

1. Install `xgboost` npm package (requires native compilation)
2. Add to `src/server.ts` or create a dedicated API handler
3. Note: This requires Python and XGBoost installed on the server

## Implementation Status

✅ **Completed:**
- Model files placed in `XGBoost Model/` directory
- Feature mapping defined (11 satellite features per dekad)
- Feature encoding implemented (seasonal: wet=1, dry=0)
- API endpoint `/api/forecast` ready in `api/forecast_api.py`
- Proxy route `/api/forecast` available in `src/routes/api/forecast.ts`
- Frontend integration in `src/lib/forecast-service.ts`

## Dependencies to Install

### Python (requirements.txt):
```
fastapi>=0.110.0
uvicorn[standard]>=0.29.0
xgboost>=2.0.0
numpy>=1.26.0
scikit-learn>=1.4.0
tensorflow>=2.15.0
python-multipart>=0.0.9
```

### Node.js (optional):
```bash
npm install onnxruntime-web  # if converting to ONNX
```

See [api/requirements.txt](./api/requirements.txt) for the actual dependencies file.

## Running the Integration

```bash
# Terminal 1: Install Python dependencies
pip install -r api/requirements.txt

# Terminal 1: Start Python API (run from project root)
uvicorn api.forecast_api:app --reload --port 8000

# Terminal 2: Start TanStack dev server (from project root)
npm run dev
```

The frontend will be available at `http://localhost:8080/`.
The Python API runs on `http://localhost:8000/`.

## Testing the Integration

1. **Test API directly:**
   ```bash
   curl http://localhost:8000/api/health
   ```

2. **Test with sample data:**
   Visit `http://localhost:8000/api/sample-data/Nueva%20Ecija` to get sample satellite features

3. **Run tests:**
   ```bash
   npm run test
   ```

## Next Steps

1. **Connect real satellite data:** Update the frontend to fetch actual Sentinel-1/2 data
2. **Add UI for satellite features:** Create input forms for the 11 dekad features
3. **Production deployment:** Use a production WSGI server (gunicorn) for the Python API
4. **Environment variables:** Add environment configuration for API URLs

## Model Features Explanation

| Feature | Description | Source |
|---------|-------------|--------|
| VH_Mean_dB | Sentinel-1 VH polarization backscatter | SAR |
| VV_Mean_dB | Sentinel-1 VV polarization backscatter | SAR |
| VH-VV_Ratio | Polarization ratio | Derived |
| RVI | Radar Vegetation Index | Derived |
| NDVI_Mean | Normalized Difference Vegetation Index | Optical |
| EVI_Mean | Enhanced Vegetation Index | Optical |
| LSWI_Mean | Land Surface Water Index | Optical |
| Seasonal_Encoding | Wet(1)/Dry(0) season encoding | Categorical |
| Event_Disruption | Binary event indicator | Temporal |
| Sin_Dekad/Cos_Dekad | Temporal encoding | Cyclical |
