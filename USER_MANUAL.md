# TANAW User Manual

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Navigation](#navigation)
4. [Dashboard](#dashboard)
5. [Forecast Page](#forecast-page)
6. [Users Management](#users-management)
7. [Settings](#settings)
8. [Export Features](#export-features)
9. [Troubleshooting](#troubleshooting)

---

## Introduction

TANAW is a modern web application designed for monitoring and forecasting rice field productivity. Built with satellite data and machine learning, it helps farmers, agronomists, and agricultural planners make data-driven decisions about crop yields and field management.

### Key Features

- **Yield Forecasting**: Predict rice yields using satellite data (Sentinel-1 SAR, MODIS vegetation indices) and XGBoost/Bi-LSTM machine learning models
- **Field Monitoring**: Track active rice fields across different regions in the Philippines
- **Growth Stage Tracking**: Visualize season progress across fields (Tillering, Vegetative, Reproductive, Ripening, Maturing, Harvest Ready)
- **Weather Analytics**: Monitor rainfall and growing degree days
- **Team Management**: Invite and manage agronomists, field leads, and viewers

### Supported Regions

- Nueva Ecija
- Iloilo
- Cagayan
- Pangasinan
- Bulacan
- Isabela

---

## Getting Started

### System Requirements

- **Node.js** (v18 or higher)
- **Python** (3.10 or higher) - Required for ML backend
- **npm** or **Bun** package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/j0ve11/Tanaw.git
cd TANAW

# Install frontend dependencies
npm install
# or using Bun
bun install
```

### Starting the Application

#### Frontend Only (Basic Mode)

```bash
npm run dev
```

The app will be available at `http://localhost:8080/`

#### Full Mode (With ML Backend)

For full XGBoost model predictions, run both servers:

```bash
# Terminal 1: Start Python ML API
pip install -r api/requirements.txt
uvicorn api.forecast_api:app --reload --port 8000

# Terminal 2: Start TanStack dev server
npm run dev
```

- Frontend: `http://localhost:8080/`
- Python API: `http://localhost:8000/`

---

## Navigation

### Sidebar Menu

The application uses a sidebar for navigation. Click the hamburger menu (☰) in the top-left to open/close the sidebar.

| Icon | Page | Description |
|------|------|-------------|
| 🏠 | Dashboard | Overview of all fields and forecasts |
| 🔮 | Forecast | Generate new yield predictions |
| 👥 | Users | Manage team members and access |
| ⚙️ | Settings | Configure workspace preferences |

### Header Features

In the header bar, you'll find:

- **Search Bar**: Search fields, seasons, and reports
- **Notifications**: Click the bell icon to view alerts
- **Season Indicator**: Shows current season status (e.g., "Wet 2026")

---

## Dashboard

The Dashboard is the home page that provides an overview of your rice fields and yield forecasts.

### Statistics Overview

The dashboard displays four key metrics in card format:

| Stat | Description |
|------|-------------|
| **Forecasted Yield** | Total predicted yield in Metric Tons (MT) |
| **Active Fields** | Number of monitored fields and total area in hectares |
| **Rainfall (7d)** | 7-day accumulated rainfall in millimeters |
| **Growing Degree Days** | Accumulated heat units for crop development |

### Yield Trend Chart

A visual representation showing:
- **Blue Line**: Forecasted yield trend over the year
- **Teal Line**: Actual/observed yield (where available)

### Field Cards

Each field card displays:

- **Field Name & Region**: Location identifier
- **Season**: Wet or Dry season planting
- **Area**: Planted area in hectares
- **Yield**: Predicted yield per hectare (MT/ha)
- **Progress Bar**: Growth stage completion percentage
- **Status Badge**: Current growth stage

#### Growth Stages

| Stage | Description |
|-------|-------------|
| **Tillering** | Early growth stage with multiple stems forming |
| **Vegetative** | Rapid leaf and stem growth |
| **Reproductive** | Flowering and grain formation |
| **Ripening** | Grain filling and maturation |
| **Maturing** | Pre-harvest stage |
| **Harvest Ready** | Ready for harvest |

### Quick Actions

- **Export**: Download dashboard data as CSV
- **New Forecast**: Navigate to forecast page

---

## Forecast Page

Generate yield predictions using satellite-based machine learning models.

### How to Generate a Forecast

1. **Select Region**: Choose from the dropdown list of supported regions
2. **Select Season**: Click either **Wet** (with raindrop icon) or **Dry** (with wheat icon)
3. **Enter Area** (Optional): Input the planted area in hectares
   - If left empty, uses the default region area
4. **Generate Forecast**: Click the "Generate forecast" button

### Understanding Forecast Results

After generating a forecast, you'll see:

#### Forecasted Yield Card

- **Per Hectare Yield (MT/ha)**: The predicted yield per hectare
- **Total Yield**: Combined yield in Metric Tons across all hectares
- **MAPE**: Mean Absolute Percentage Error indicating prediction accuracy

#### Input Summary (below the card)

- **Region**: Selected region
- **Season**: Wet or Dry
- **Area**: Total planted area (hectares)

#### Historical Yield Chart

Bar chart showing past 5 seasons' yield data for the selected region.

### Accuracy Information

- **Wet Season MAPE**: ~6.5% (improved accuracy after calibration)
- **Dry Season MAPE**: ~5.8% (improved accuracy after calibration)

MAPE (Mean Absolute Percentage Error) is a measure of prediction accuracy:
- Lower MAPE = More accurate predictions
- Values are calibrated to account for systematic underestimation

---

## Users Management

Manage your team members who have access to the TANAW workspace.

### User Statistics

Four summary cards show:

| Stat | Description |
|------|-------------|
| **Total Users** | All team members |
| **Active Seats** | Active user licenses used |
| **Pending Invites** | Invited but not yet joined |
| **Suspended** | Blocked or removed users |

### Team Members Table

| Column | Description |
|--------|-------------|
| **User** | Name and email of team member |
| **Role** | Access level (Owner, Agronomist, Field lead, Viewer) |
| **Fields** | Number of fields they manage |
| **Status** | Active, Invited, or Suspended |
| **Joined** | Date they joined the workspace |
| **Actions** | Dropdown menu for user management |

### User Roles

| Role | Permissions |
|------|-------------|
| **Owner** | Full access, can manage all users and settings |
| **Agronomist** | Can view forecasts, manage fields, limited admin access |
| **Field Lead** | Manages specific fields, views relevant data |
| **Viewer** | Read-only access to dashboards and reports |

### Adding a User

1. Click **Invite user** button in the header
2. Enter user details in the dialog that appears
3. Select appropriate role
4. Send invitation email

### Managing Users

Click the **⋮** (More) button for each user to:
- Edit user role
- Reset user password
- Remove user (requires confirmation)

---

## Settings

Configure your workspace preferences and notification settings.

### Workspace Profile

Manage your farm/workspace information:

| Field | Description |
|-------|-------------|
| **Workspace Name** | Name displayed across the application |
| **Primary Region** | Default region for forecasts |
| **Total Hectares** | Total farm area under management |
| **Contact Email** | Primary contact email address |

### Notifications

Enable or disable notification preferences:

| Notification | Description |
|--------------|-------------|
| **Weekly Forecast Digest** | Receive weekly summary every Monday morning |
| **Weather Anomaly Alerts** | Get alerts for rainfall and temperature spikes |
| **Product Updates** | Feature announcements and updates |

Toggle notifications on/off using the switch controls.

### Saving Changes

- **Cancel**: Discard changes and revert to previous values
- **Save Changes**: Apply and save your configuration

---

## Export Features

Export data from TANAW in CSV format.

### Exporting Dashboard Data

1. Navigate to the Dashboard page
2. Click the **Export** button in the header
3. A CSV file will be downloaded automatically
4. Filename format: `tanaw-dashboard-report-YYYY-MM-DD.csv`

**Exported columns:**
- Field Name
- Region
- Season
- Area (hectares)
- Yield (MT/ha)
- Status
- Progress

### Exporting Users Data

1. Navigate to the Users page
2. Click the **Export** button in the header
3. A CSV file will be downloaded automatically
4. Filename format: `tanaw-users-report-YYYY-MM-DD.csv`

**Exported columns:**
- Name
- Email
- Role
- Fields
- Status
- Joined

---

## Troubleshooting

### Common Issues

#### Forecast Not Loading

**Symptoms**: Forecast button shows loading spinner indefinitely

**Solutions**:
1. Check if the Python ML backend is running (if using full mode)
2. Verify internet connection for satellite data access
3. Ensure all required fields are filled correctly

#### Wrong Page Showing

**Symptoms**: 404 error or unexpected page

**Solutions**:
1. Use the sidebar navigation to return to the main pages
2. Click "Go home" to return to the Dashboard
3. Check the URL in your browser's address bar

#### Data Looks Incorrect

**Symptoms**: Forecast values or field data seem wrong

**Solutions**:
1. Verify the selected region and season are correct
2. Check if custom area value was entered correctly
3. Refresh the page to reload data

### Error Messages

| Message | Meaning | Action |
|---------|---------|--------|
| "Unable to generate forecast" | API connection failed | Check backend status or use fallback mode |
| "Forecast warning" | Using estimated values | Prediction available but may be less accurate |
| "Season: Wet 2026" (green dot) | Active growing season | Normal status indicator |

### Getting Help

For additional support:
1. Check the [TEST_PLAN.md](./TEST_PLAN.md) for known issues
2. Review [TEST_CASES.md](./TEST_CASES.md) for testing documentation
3. Consult [XGBOOST_INTEGRATION_GUIDE.md](./XGBOOST_INTEGRATION_GUIDE.md) for model details

---

## Technical Notes

### Satellite Data Sources

| Feature | Source |
|---------|--------|
| VH/VV Backscatter | Sentinel-1 SAR |
| NDVI, EVI, LSWI | MODIS optical indices |
| Vegetation Indices | Derived from Sentinel data |

### Model Information

- **Layer 1**: XGBoost regressor (100 trees)
- **Layer 2**: Bi-LSTM neural network
- **Input Features**: 5 dekads × 11 satellite features
- **Output**: Metric tons yield prediction

---

*This user manual was created for TANAW v1.0. Last updated: July 2026.*