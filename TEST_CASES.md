# Test Cases

## Test Case Catalog - TANAW v0.3.0

This document provides detailed test cases for each module in the TANAW test plan.

---

## Module 1: Dashboard Page

### TC-DASH-001: Stat Cards Display
**Description:** Verify four stat cards display correctly with values and deltas
**Precondition:** Dashboard page is loaded
**Steps:**
1. Load Dashboard page
2. Observe stat cards section
3. Check for Forecasted yield, Active fields, Rainfall (7d), Growing degree days labels
4. Verify values are displayed for each card
5. Verify delta values (percentage changes) are shown

**Expected Result:** All four stat cards visible with correct labels, values, and deltas

### TC-DASH-002: Yield Trend Chart Rendering
**Description:** Verify Area chart renders with predicted vs observed series
**Precondition:** Dashboard page is loaded
**Steps:**
1. Load Dashboard page
2. Observe yield trend chart section
3. Check chart title displays "Yield trend"
4. Verify chart container exists
5. Verify X-axis shows months (Jan-Aug)
6. Verify Y-axis shows yield values in MT

**Expected Result:** Chart renders with predicted vs observed series, proper axes labels

### TC-DASH-003: Active Fields List
**Description:** Verify fields list displays with name, region, area, season, yield, status
**Precondition:** Dashboard page is loaded
**Steps:**
1. Load Dashboard page
2. Observe active fields section
3. Check for 6 fields: North Paddy A, River Bend, South Terrace, Central Plains, East Valley, Northwest Fields
4. Verify each field shows region, area, season, yield forecast, and status badge

**Expected Result:** All 6 fields displayed with correct details and status badges

### TC-DASH-004: Navigation Links
**Description:** Verify navigation links to Forecast page work
**Precondition:** Dashboard page is loaded
**Steps:**
1. Locate navigation elements
2. Click on forecast-related navigation
3. Verify navigation to forecast page

**Expected Result:** Navigation links work correctly

---

## Module 2: Forecast Page

### TC-FORE-001: Region Selector Dropdown
**Description:** Verify region selector displays all regions
**Precondition:** Forecast page is loaded
**Steps:**
1. Load Forecast page
2. Click on Region selector dropdown
3. Verify dropdown displays: Nueva Ecija, Iloilo, Cagayan, Pangasinan, Bulacan, Isabela

**Expected Result:** All 6 regions available in dropdown

### TC-FORE-002: Season Toggle Functionality
**Description:** Verify Wet/Dry season toggle works
**Precondition:** Forecast page is loaded
**Steps:**
1. Load Forecast page
2. Verify Wet season is selected by default
3. Click Dry season button
4. Verify Dry season is now selected
5. Click Wet season button
6. Verify Wet season is selected

**Expected Result:** Season toggle switches between Wet and Dry correctly

### TC-FORE-003: Planted Area Input Validation
**Description:** Verify area input accepts values 1-2000 hectares
**Precondition:** Forecast page is loaded
**Steps:**
1. Load Forecast page
2. Enter area value of 1 hectare
3. Verify input accepts minimum value
4. Enter area value of 2000 hectares
5. Verify input accepts maximum value
6. Enter area value outside range
7. Verify input validation or behavior

**Expected Result:** Area input validates between 1-2000 hectares

### TC-FORE-004: Generate Forecast Button
**Description:** Verify Generate forecast button triggers calculation
**Precondition:** Forecast page is loaded with region and season selected
**Steps:**
1. Load Forecast page
2. Select region and season
3. Click Generate forecast button
4. Wait for loading state
5. Verify forecast results display

**Expected Result:** Forecast calculation completes and displays results

### TC-FORE-005: Forecast Results Display
**Description:** Verify projected yield (t/ha), total yield, and confidence display
**Precondition:** Forecast has been generated
**Steps:**
1. Generate forecast for any region
2. Observe forecast results section
3. Verify per-hectare yield (MT/ha) is displayed
4. Verify total yield (MT) is displayed
5. Verify MAPE confidence percentage is displayed

**Expected Result:** All forecast results display correctly after generation

### TC-FORE-006: Historical Yield Bar Chart
**Description:** Verify bar chart renders with past 5 seasons
**Precondition:** Forecast page is loaded
**Steps:**
1. Load Forecast page
2. Observe historical yield chart
3. Verify 5 seasons displayed (Dry 24, Wet 24, Dry 25, Wet 25, Dry 26)
4. Verify chart has X and Y axes labels
5. Verify tooltips work on hover

**Expected Result:** Bar chart renders with correct data and tooltips

### TC-FORE-007: Loading State During Forecast
**Description:** Verify loading indicator appears during forecast generation
**Precondition:** Forecast page is loaded
**Steps:**
1. Click Generate forecast button
2. Observe loading state immediately
3. Wait for forecast completion
4. Verify loading state disappears

**Expected Result:** Loading state shows during calculation, hides on completion

### TC-FORE-008: Toast Notification on Failure
**Description:** Verify toast notification displays when forecast generation fails
**Precondition:** API is unavailable or error condition
**Steps:**
1. Simulate API failure
2. Click Generate forecast button
3. Verify error toast appears
4. Verify error message is readable

**Expected Result:** Error toast notification displays on failure

---

## Module 3: Settings Page

### TC-SET-001: Workspace Profile Display
**Description:** Verify workspace profile inputs display with defaults
**Precondition:** Settings page is loaded
**Steps:**
1. Load Settings page
2. Observe workspace profile section
3. Verify Workspace name shows "Reyes Family Farm"
4. Verify Primary region shows "Nueva Ecija, PH"
5. Verify Total hectares shows 132
6. Verify Contact email shows "maya@tanaw.farm"

**Expected Result:** All profile inputs display correct default values

### TC-SET-002: Save Changes Functionality
**Description:** Verify Save changes button saves settings
**Precondition:** Settings page is loaded with modified values
**Steps:**
1. Modify any workspace profile input
2. Click Save changes button
3. Verify save action completes

**Expected Result:** Save button triggers save action

### TC-SET-003: Cancel Button Behavior
**Description:** Verify Cancel button resets changes
**Precondition:** Settings page is loaded with modified values
**Steps:**
1. Modify any workspace profile input
2. Click Cancel button
3. Verify changes are reset/cancelled

**Expected Result:** Cancel button resets or cancels changes

### TC-SET-004: Notification Toggle Functionality
**Description:** Verify notification toggle switches toggle correctly
**Precondition:** Settings page is loaded
**Steps:**
1. Observe Weekly forecast digest toggle (default: on)
2. Click to toggle off
3. Click to toggle back on
4. Observe Weather anomaly alerts toggle (default: on)
5. Observe Product updates toggle (default: off)
6. Toggle Product updates on

**Expected Result:** All notification toggles work correctly

---

## Module 4: Typography & Styling

### TC-TYPE-001: Geist Font Loading
**Description:** Verify Geist/Inter font loads for UI elements
**Precondition:** Any page is loaded
**Steps:**
1. Inspect UI text elements
2. Verify font-family includes Inter/ui-sans-serif
3. Verify font loads without errors

**Expected Result:** Geist/Inter font properly loaded for UI elements

### TC-TYPE-002: JetBrains Mono Font for Data
**Description:** Verify monospace font for data values
**Precondition:** Any page with data values is loaded
**Steps:**
1. Inspect data value text (numbers)
2. Verify font-display is applied
3. Verify font loads correctly

**Expected Result:** Display font (Fraunces) applied for headings and data values

### TC-TYPE-003: Color Palette Verification
**Description:** Verify color palette matches design specification (OKLCH variables)
**Precondition:** Any page is loaded
**Steps:**
1. Inspect primary color elements
2. Verify --color-primary is defined (oklch)
3. Inspect success elements (status badges)
4. Verify --color-success is defined (oklch)
5. Inspect warning elements
6. Verify --color-warning is defined (oklch)
7. Inspect accent elements
8. Verify --color-accent is defined (oklch)

**Expected Result:** All colors use correct OKLCH values

### TC-TYPE-004: White Card Styling
**Description:** Verify white card styling with hairline borders
**Precondition:** Any page with cards is loaded
**Steps:**
1. Observe card elements
2. Verify white background (oklch(1 0 0))
3. Verify border styling
4. Verify proper padding and spacing

**Expected Result:** Cards have white background with hairline borders

---

## Module 5: Backend Integration

### TC-BACK-001: FastAPI /api/forecast Endpoint
**Description:** Verify FastAPI forecast endpoint returns correct data
**Precondition:** FastAPI server is running
**Steps:**
1. Send POST request to /api/forecast with valid data
2. Verify response status is 200
3. Verify response contains perHa, total, mape fields
4. Verify perHa > 0, total > 0, mape < 15

**Expected Result:** API returns valid forecast data structure

### TC-BACK-002: FastAPI /api/health Endpoint
**Description:** Verify FastAPI health endpoint returns healthy status
**Precondition:** FastAPI server is running
**Steps:**
1. Send GET request to /api/health
2. Verify response status is 200
3. Verify response contains "status": "healthy"
4. Verify models_loaded is true

**Expected Result:** Health check returns healthy status

### TC-BACK-003: Error Handling for Invalid Requests
**Description:** Verify backend handles invalid requests gracefully
**Precondition:** FastAPI server is running
**Steps:**
1. Send POST to /api/forecast with missing dekads
2. Verify response is error (400/422/500)
3. Send POST with invalid region
4. Verify graceful handling

**Expected Result:** API handles errors gracefully without crash

### TC-BACK-004: Model Inference Accuracy
**Description:** Verify model MAPE < 15% and R² > 0.75 targets
**Precondition:** Models are loaded
**Steps:**
1. Generate forecasts for wet season
2. Verify MAPE < 15%
3. Generate forecasts for dry season
4. Verify MAPE < 15%
5. Verify low MAPE indicates R² > 0.75

**Expected Result:** Model achieves MAPE < 15% target

---

## Module 6: Mobile Viewport Testing

### TC-MOB-001: Mobile Page Load
**Description:** Verify dashboard loads and renders on mobile viewport
**Precondition:** Mobile browser (412x915)
**Steps:**
1. Open dashboard on mobile viewport
2. Verify page loads within 3 seconds
3. Verify no horizontal scroll
4. Verify all elements fit viewport

**Expected Result:** Page loads correctly on mobile

### TC-MOB-002: Stat Cards on Mobile
**Description:** Verify stat cards render correctly on mobile
**Precondition:** Mobile viewport
**Steps:**
1. Load dashboard on mobile
2. Verify stat cards stack vertically
3. Verify text is readable
4. Verify values display correctly

**Expected Result:** Stat cards display correctly on mobile

### TC-MOB-003: Charts on Mobile
**Description:** Verify charts render on mobile viewport
**Precondition:** Mobile viewport
**Steps:**
1. Load forecast page on mobile
2. Verify chart containers exist
3. Verify charts are responsive
4. Verify no overflow issues

**Expected Result:** Charts render properly on mobile

### TC-MOB-004: Mobile Navigation
**Description:** Verify navigation works on mobile
**Precondition:** Mobile viewport
**Steps:**
1. Open sidebar on mobile
2. Navigate between pages
3. Verify page transitions
4. Verify touch targets are adequate

**Expected Result:** Navigation works smoothly on mobile

---

## Module 7: Accessibility Testing

### TC-A11Y-001: Keyboard Navigation
**Description:** Verify all interactive elements reachable via keyboard
**Precondition:** Any page is loaded
**Steps:**
1. Tab through page elements
2. Verify focus moves to: Region selector, Season toggles, Area input, Generate button, Inputs in Settings
3. Verify logical tab order

**Expected Result:** All interactive elements reachable via keyboard

### TC-A11Y-002: Focus Indicators
**Description:** Verify visible focus indicators present
**Precondition:** Page is loaded
**Steps:**
1. Tab to each interactive element
2. Observe focus indicator
3. Verify focus ring/color is visible
4. Verify focus indicator stays visible

**Expected Result:** Visible focus indicators on all focused elements

### TC-A11Y-003: No-Mouse Scenario
**Description:** Verify dashboard usable without mouse
**Precondition:** Keyboard-only navigation
**Steps:**
1. Navigate to forecast page using keyboard only
2. Select region using keyboard
3. Toggle season using keyboard
4. Enter area using keyboard
5. Generate forecast using keyboard
6. Observe results

**Expected Result:** Full dashboard operable without mouse

### TC-A11Y-004: Screen Reader Compatibility
**Description:** Spot-check screen reader compatibility
**Precondition:** Screen reader installed
**Steps:**
1. Navigate to Dashboard with screen reader
2. Verify heading structure announced
3. Verify stat card values announced
4. Navigate to Forecast page
5. Verify form labels announced

**Expected Result:** Critical elements parseable by screen readers

---

## Performance Tests

### TC-PERF-001: Page Load Time
**Description:** Verify page loads within 3 seconds
**Precondition:** Cold start (no cached resources)
**Steps:**
1. Clear browser cache
2. Load dashboard
3. Measure load time
4. Verify < 3 seconds

**Expected Result:** Page load under 3 seconds

### TC-PERF-002: Chart Render Time
**Description:** Verify charts render within 2 seconds
**Precondition:** Page loaded
**Steps:**
1. Load page with charts
2. Measure chart render time
3. Verify < 2 seconds

**Expected Result:** Charts render within 2 seconds

### TC-PERF-003: Forecast Generation Time
**Description:** Verify forecast completes within 2 seconds
**Precondition:** Forecast page loaded
**Steps:**
1. Click Generate forecast
2. Measure time to results
3. Verify < 2 seconds

**Expected Result:** Forecast generation under 2 seconds

---

## Cross-Browser Tests

### TC-CB-001: Google Chrome Compatibility
**Description:** Verify Dashboard works on Chrome
**Precondition:** Chrome 150+ installed
**Steps:**
1. Open Dashboard in Chrome
2. Verify all features work
3. Check for CSS/behavior issues

**Expected Result:** Full compatibility on Chrome

### TC-CB-002: Mozilla Firefox Compatibility
**Description:** Verify Dashboard works on Firefox
**Precondition:** Firefox 152+ installed
**Steps:**
1. Open Dashboard in Firefox
2. Verify all features work
3. Check for CSS/behavior issues

**Expected Result:** Full compatibility on Firefox

### TC-CB-003: Microsoft Edge Compatibility
**Description:** Verify Dashboard works on Edge
**Precondition:** Edge 150+ installed
**Steps:**
1. Open Dashboard in Edge
2. Verify all features work
3. Check for CSS/behavior issues

**Expected Result:** Full compatibility on Edge

---

## Test Priority Matrix

| Priority | Test Cases |
|----------|------------|
| Critical | TC-DASH-001, TC-DASH-002, TC-FORE-001, TC-FORE-004, TC-BACK-001, TC-BACK-002 |
| High | TC-DASH-003, TC-FORE-002, TC-FORE-003, TC-FORE-005, TC-SET-001, TC-A11Y-001 |
| Medium | TC-FORE-006, TC-FORE-007, TC-SET-002, TC-SET-003, TC-TYPE-003 |
| Low | TC-SET-004, TC-TYPE-001, TC-TYPE-002, TC-MOB-002, TC-A11Y-002, TC-A11Y-003, TC-A11Y-004 |

---

## Suspension Criteria

Testing should be suspended if:
1. Model Inference Failure - FastAPI backend cannot generate forecasts
2. Critical UI Blocking Defect - Key pages fail to load
3. Dashboard Load Failure - White screen or server error across browsers
4. Data Integrity Breach - Incorrect forecast values
5. Export Failure - Export functions non-functional