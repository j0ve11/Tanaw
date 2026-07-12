# TANAW 

A modern web application for monitoring and forecasting rice field productivity, built with TanStack Start, React, and Tailwind CSS.

## Overview

TANAW is a dashboard application that provides:
- **Yield Forecasting** - Track predicted vs. observed yield trends
- **Field Monitoring** - Monitor active rice fields across different regions
- **Growth Stage Tracking** - Visualize season progress across fields
- **Weather Analytics** - Rainfall and growing degree days monitoring

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) - Full-stack React framework
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite v8
- **ML Backend**: FastAPI + XGBoost + TensorFlow (Bi-LSTM)

## Prerequisites

- **Node.js** (v18 or higher)
- **Python** (3.10 or higher) - Required for ML backend
- **npm** (or Bun if available)

## Getting Started

### Installation

```bash
# Using npm
npm install

# Using Bun (if installed)
bun install
```

### Development

```bash
# Start the development server
npm run dev

# Or using Bun
bun run dev
```

The app will be available at `http://localhost:8080/`

### Build

```bash
# Production build
npm run build

# Development build
npm run build:dev
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── routes/           # Application routes (TanStack Router)
│   ├── __root.tsx    # Root layout
│   ├── index.tsx     # Dashboard (home page)
│   ├── forecast.tsx  # Forecast page
│   ├── settings.tsx  # Settings page
│   ├── users.tsx     # Users page
│   └── api/
│       └── forecast.ts      # API proxy to Python backend
├── components/       # Reusable UI components
│   ├── app-shell.tsx # Main application shell
│   └── ui/          # Radix UI-based components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
│   ├── forecast-service.ts  # Forecast calculation (XGBoost/BiLSTM integration)
│   └── forecast-service.test.ts
├── router.tsx       # Router configuration
├── server.ts        # SSR server entry
└── start.tsx        # Client entry point
```

```
api/
└── forecast_api.py  # FastAPI backend for ML predictions
```

```
XGBoost Model/
├── layer1_xgboost.json  # XGBoost feature extractor
├── layer2_bilstm.keras  # Bi-LSTM yield predictor
├── feature_scaler.pkl   # Feature normalization scaler
└── target_scaler.pkl    # Target inverse scaling
```

## Features

### Dashboard
- Overview statistics (projected yield, active fields, rainfall, growing degree days)
- Yield forecast trend visualization
- Season progress tracking across fields
- Quick access to field details

### Pages
- **Forecast** - Detailed crop forecasting using XGBoost/Bi-LSTM ensemble model
- **Users** - User management
- **Settings** - Application settings

## XGBoost Model Integration

TANAW integrates a 2-layer ensemble ML model for satellite-based rice yield forecasting:

**Model Architecture:**
- **Layer 1**: XGBoost regressor (100 trees) - Feature extraction
- **Layer 2**: Bi-LSTM neural network (TensorFlow/Keras) - Yield prediction
- **Input**: 5 dekads × 11 satellite features
- **Output**: Metric tons yield prediction

**Satellite Features:**
| Feature | Source |
|---------|--------|
| VH_Mean_dB, VV_Mean_dB | Sentinel-1 SAR backscatter |
| NDVI_Mean, EVI_Mean, LSWI_Mean | Sentinel-2 optical indices |
| RVI, VH-VV Ratio | Derived vegetation indices |
| Seasonal_Encoding | Wet/Dry season binary |
| Event_Disruption | Binary event indicator |
| Sin_Dekad/Cos_Dekad | Cyclical temporal encoding |

See [XGBOOST_INTEGRATION_GUIDE.md](./XGBOOST_INTEGRATION_GUIDE.md) for detailed integration documentation.

### Running with ML Backend

For full XGBoost model predictions, run both servers:

```bash
# Terminal 1: Start Python ML API (run from project root)
pip install -r api/requirements.txt
uvicorn api.forecast_api:app --reload --port 8000

# Terminal 2: Start TanStack dev server (from project root)
npm run dev
```

The frontend will be available at `http://localhost:8080/`.
The Python API runs on `http://localhost:8000/`.

## Configuration

The project uses:
- TypeScript with path aliases (`@/`) configured in `tsconfig.json`
- Vite with TanStack Start integration
- Tailwind CSS with custom styling

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Testing

The project uses [Vitest](https://vitest.dev) for unit testing with React Testing Library.

### Running Tests

```bash
# Run all tests once
npm run test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

```
src/
├── test/
│   └── setup.ts        # Test setup and mocks
├── lib/
│   ├── utils.test.ts                    # Utility function tests
│   ├── forecast-service.test.ts         # Forecast calculation tests
│   └── forecast-service.ts              # Business logic (extracted for testing)
├── components/
│   └── ui/              # UI component tests (to be added)
└── routes/
    └── *.test.tsx       # Page component tests (to be added)
```

See [TEST_PLAN.md](./TEST_PLAN.md) for detailed testing strategy and [TEST_RESULTS.md](./TEST_RESULTS.md) for current test coverage.

## Sample Data

The dashboard includes sample data for:
- North Paddy A (Nueva Ecija) - Wet season
- River Bend (Iloilo) - Wet season
- South Terrace (Cagayan) - Dry season

Each field shows area (hectares), growth stage progress, and yield forecasts.