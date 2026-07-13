# TANAW 

A modern web application for monitoring and forecasting rice field productivity, built with TanStack Start, React, and Tailwind CSS.

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           TANAW Architecture                        │
└─────────────────────────────────────────────────────────────────────┘

┌───────────────────────┐    ┌───────────────────────┐    ┌───────────────────────┐
│      Frontend         │    │      Backend API      │    │     ML Model Layer    │
│   (TanStack Start)    │◄──►│      (FastAPI)        │◄──►│    (XGBoost/BiLSTM)   │
└───────────────────────┘    └───────────────────────┘    └───────────────────────┘
           │                           │                           │
           ▼                           ▼                           ▼
┌───────────────────────┐    ┌───────────────────────┐    ┌───────────────────────┐
│   Presentation Layer  │    │       API Layer       │    │      ML Pipeline      │
│                       │    │                       │    │                       │
│  ┌────────────────┐   │    │  ┌────────────────┐   │    │  ┌────────────────┐   │
│  │ React 19 + TS  │   │    │  │ FastAPI v1.0   │   │    │  │ XGBoost Reg.   │   │
│  │ Tailwind CSS v4│   │    │  │ Uvicorn Server │   │    │  │ Bi-LSTM Neural │   │
│  │ Recharts       │   │    │  │ Pydantic Models│   │    │  │ Network (TF)   │   │
│  │ TanStack Router│   │    │  │                │   │    │  │ Scikit-learn   │   │
│  └────────────────┘   │    │  └────────────────┘   │    │  │ Joblib Scalers │   │
└───────────────────────┘    └───────────────────────┘    │  └────────────────┘   │
                                                          └───────────────────────┘
```

### Architecture Components:

| Layer | Component | Description |
|-------|-----------|-------------|
| **Presentation** | React Components | Dashboard, Forecast, Settings pages with responsive UI |
| **Routing** | TanStack Router | File-based routing with nested layouts |
| **State Mgmt** | TanStack Query | Server state management for API calls |
| **Styling** | Tailwind CSS | OKLCH color system with custom design tokens |
| **API Layer** | FastAPI | RESTful endpoints for forecast predictions |
| **ML Layer** | XGBoost + Bi-LSTM | 2-layer ensemble model for yield forecasting |
| **Data Sources** | Satellite Data | Sentinel-1 SAR, MODIS vegetation indices |

---

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
tanaw/
├── src/
│   ├── routes/           # Application routes (TanStack Router)
│   │   ├── __root.tsx    # Root layout
│   │   ├── index.tsx     # Dashboard (home page)
│   │   ├── forecast.tsx  # Forecast page
│   │   ├── settings.tsx  # Settings page
│   │   ├── users.tsx     # Users page
│   │   ├── _index.test.tsx       # Dashboard tests
│   │   ├── forecast.test.tsx     # Forecast tests
│   │   ├── settings.test.tsx     # Settings tests
│   │   └── mobile.test.tsx       # Mobile viewport tests
│   │   └── api/
│   │       └── forecast.ts       # API proxy to Python backend
│   ├── components/       # Reusable UI components
│   │   ├── app-shell.tsx # Main application shell
│   │   └── ui/          # Radix UI-based components
│   ├── hooks/            # Custom React hooks
│   │   └── use-mobile.tsx # Mobile detection hook
│   ├── lib/              # Utilities and helpers
│   │   ├── forecast-service.ts   # Forecast calculation
│   │   ├── forecast-service.test.ts
│   │   ├── utils.ts      # Class name utility
│   │   ├── utils.test.ts
│   │   └── error-*.ts    # Error handling
│   ├── accessibility/    # Accessibility tests
│   │   └── accessibility.test.ts
│   ├── styles/           # Styling tests
│   │   └── typography.test.ts
│   ├── test/             # Test configuration
│   │   ├── setup.ts      # Test setup and mocks
│   │   └── cross-browser.test.ts
│   ├── router.tsx        # Router configuration
│   ├── server.ts         # SSR server entry
│   └── start.tsx         # Client entry point
├── api/
│   └── forecast_api.py   # FastAPI backend for ML predictions
├── XGBoost Model/
│   ├── layer1_xgboost.json  # XGBoost feature extractor
│   ├── layer2_bilstm.keras  # Bi-LSTM yield predictor
│   ├── feature_scaler.pkl   # Feature normalization scaler
│   └── target_scaler.pkl      # Target inverse scaling
├── public/              # Static assets
├── coverage/            # Test coverage reports
├── scripts/
│   └── run-tests.sh      # Test automation script
├── package.json
├── TEST_PLAN.md          # Test plan documentation
├── TEST_CASES.md         # Detailed test cases
├── TEST_RESULTS.md       # Test results summary
├── XGBOOST_INTEGRATION_GUIDE.md
└── README.md
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
- **Output**: Metric tons yield prediction with MAPE confidence

**Satellite Features:**

| Feature | Source |
|---------|--------|
| VH_Mean_dB, VV_Mean_dB | Sentinel-1 SAR backscatter |
| NDVI_Mean, EVI_Mean, LSWI_Mean | MODIS optical indices |
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
| `npm run test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:dashboard` | Run dashboard module tests |
| `npm run test:forecast` | Run forecast module tests |
| `npm run test:settings` | Run settings module tests |
| `npm run test:accessibility` | Run accessibility tests |
| `npm run test:mobile` | Run mobile viewport tests |
| `npm run test:cross-browser` | Run cross-browser compatibility tests |
| `npm run test:typography` | Run typography and styling tests |
| `npm run test:api` | Run backend API tests (Python/pytest) |
| `npm run test:screen:*` | Run tests with delays for screen recording emphasis |
 
## Screen Recording Mode
 
For better visibility during screen recordings, tests can be run with intentional delays between test cases:
 
```bash
# Run all tests with screen recording delays
npm run test:screen:all

# Or run specific test suites with delays
npm run test:screen:dashboard
npm run test:screen:forecast
npm run test:screen:accessibility
npm run test:screen:mobile
npm run test:screen:cross-browser
```
 
Using the automation script:
 
```bash
# Run all tests with emphasis delays
./scripts/run-tests.sh --all --screen-record

# Run specific suite with delays
./scripts/run-tests.sh --accessibility --screen-record
```
 
This adds ~600ms delays after each test case, giving viewers time to see each test result clearly.
 
## Testing Guide

### Quick Start

```bash
# Run all tests
npm run test

# Run with coverage report
npm run test:coverage
```

### Module-Specific Testing
 
```bash
# Test individual pages
npm run test:dashboard      # Module 1: Dashboard
npm run test:forecast       # Module 2: Forecast
npm run test:settings       # Module 3: Settings
 
# Test special features (all tests)
npm run test:accessibility    # Module 7: Accessibility
npm run test:mobile         # Module 6: Mobile viewport
npm run test:cross-browser  # Cross-browser compatibility
npm run test:typography     # Module 4: Typography & styling
npm run test:api            # Module 5: Backend API
```

### Using the Automation Script

```bash
# Make script executable (Linux/macOS)
chmod +x scripts/run-tests.sh

# Run all tests with formatted output
./scripts/run-tests.sh --all

# Run specific test suites
./scripts/run-tests.sh --accessibility
./scripts/run-tests.sh --mobile
./scripts/run-tests.sh --cross-browser
```

### Test Modules Overview

| Module | Tests | Description |
|--------|-------|-------------|
| **Module 1** | Dashboard | Stat cards, charts, fields list, navigation |
| **Module 2** | Forecast | Region selector, season toggle, area input, results |
| **Module 3** | Settings | Profile inputs, buttons, notification toggles |
| **Module 4** | Typography | Fonts, colors (OKLCH), gradients, shadows |
| **Module 5** | Backend API | FastAPI endpoints, accuracy targets (MAPE < 15%) |
| **Module 6** | Mobile | Responsive layout, touch targets, viewport testing |
| **Module 7** | Accessibility | Keyboard nav, focus indicators, screen readers |

### Test Files Location

```
src/
├── test/
│   └── setup.ts              # Global test setup with mocks
├── lib/
│   ├── utils.test.ts         # Utility function tests
│   └── forecast-service.test.ts  # Forecast calculation tests
├── routes/
│   ├── index.test.tsx        # Dashboard page tests
│   ├── forecast.test.tsx   # Forecast page tests
│   ├── settings.test.tsx   # Settings page tests
│   └── mobile.test.tsx     # Mobile viewport tests
├── accessibility/
│   └── accessibility.test.ts # Accessibility tests
└── styles/
    └── typography.test.ts  # Typography & styling tests
```

### Writing New Tests

1. Create test file alongside source: `*.test.ts` or `*.test.tsx`
2. Use Vitest's `describe`/`it`/`expect` API
3. Mock external dependencies in `setup.ts`
4. Test files are auto-discovered by vitest config

### Coverage Reports

After running `npm run test:coverage`, reports are generated in:
- `coverage/index.html` - HTML coverage report (open in browser)
- Terminal output - Text summary

## Sample Data

The dashboard includes sample data for:
- North Paddy A (Nueva Ecija) - Wet season
- River Bend (Iloilo) - Wet season
- South Terrace (Cagayan) - Dry season

Each field shows area (hectares), growth stage progress, and yield forecasts.

## Documentation

| File | Purpose |
|------|---------|
| `TEST_PLAN.md` | Complete testing strategy and approach |
| `TEST_CASES.md` | Detailed test case catalog with TC codes |
| `TEST_RESULTS.md` | Current test execution results |
| `XGBOOST_INTEGRATION_GUIDE.md` | ML model integration documentation |

This project is developed as part of the Tanaw agricultural decision support platform for the Philippine Development Plan 2023-2028.