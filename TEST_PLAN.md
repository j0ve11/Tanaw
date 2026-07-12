# TANAW Test Plan

## Overview
This test plan covers the Tanaw rice yield forecasting application, focusing on unit tests for business logic and component tests for UI functionality.

## Test Categories

### 1. Unit Tests

#### 1.1 Utility Functions (`src/lib/utils.ts`)
- **cn() function tests**:
  - Class name combination
  - Conditional class handling
  - Null/undefined value handling
  - TailWind class merging
  - Array handling
  - Empty input handling

#### 1.2 Forecast Service (`src/lib/forecast-service.ts`)
- **Region data validation**:
  - All expected regions defined
  - Wet and dry yields exist for each region
  - Dry season yields higher than wet season
- **calculateForecast() function tests**:
  - Default area calculation (25 ha)
  - Small area (< 25 ha) modifier effect
  - Large area (> 25 ha) modifier effect
  - Dry vs wet season confidence difference
  - Confidence capping at maximum (92%)
  - Minimum area handling (1 ha)
  - Maximum area handling (2000 ha)
  - Different regions produce different results
- **getBaseYield() function tests**:
  - Wet season yield retrieval
  - Dry season yield retrieval
  - Invalid region error handling

### 2. Component Tests

#### 2.1 Dashboard Page (`src/routes/index.tsx`)
- Stats cards render correctly
- Yield trend chart displays data
- Season progress bars show correct values
- Active fields table renders

#### 2.2 Forecast Page (`src/routes/forecast.tsx`)
- Region selector works
- Season toggle buttons function
- Area input accepts valid values
- Forecast calculation on button click
- Results display correctly

#### 2.3 Settings Page (`src/routes/settings.tsx`)
- Form inputs display correct defaults
- Toggle switches render
- Cancel and Save buttons present

#### 2.4 Users Page (`src/routes/users.tsx`)
- User table renders with data
- Stat cards show correct values
- Search input present
- Dropdown menu for user actions

## Test Execution

### Running Tests
```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Coverage Thresholds
- Statements: 70%
- Functions: 70%
- Branches: 60%
- Lines: 70%

## Test Data

### Regions Coverage
| Region | Wet Season Yield | Dry Season Yield |
|--------|------------------|------------------|
| Nueva Ecija | 5.4 | 6.1 |
| Iloilo | 4.8 | 5.6 |
| Cagayan | 4.5 | 5.2 |
| Pangasinan | 5.1 | 5.9 |
| Bulacan | 4.9 | 5.7 |
| Isabela | 5.6 | 6.3 |

### Area Boundary Tests
- Minimum: 1 ha
- Default: 25 ha
- Medium: 100 ha
- Maximum: 2000 ha

## Known Limitations
- Chart components (recharts) are mocked due to SVG complexity in test environment
- Router components require specific setup for full integration testing