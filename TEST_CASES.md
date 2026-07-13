# Test Cases

## Test Case Catalog - TANAW v0.4.0

This document provides detailed test cases for each module in the TANAW test plan.

---

## Module 1: Forecast Service Unit Tests

### TC-SVC-001: Region Data Validation
**Description:** Verify all expected regions are defined in REGION_TOTAL_YIELDS
**Precondition:** Forecast service module loaded
**Steps:**
1. Import REGION_TOTAL_YIELDS from forecast-service
2. Get region names via getRegionNames()
3. Verify Nueva Ecija, Iloilo, Cagayan, Pangasinan, Bulacan, Isabela are defined
4. Verify each region has wet and dry yield properties
**Expected Result:** All 6 regions defined with both wet and dry yields

### TC-SVC-002: Dry Season Yields Higher Than Wet
**Description:** Verify dry season yields are higher than wet season for each region
**Precondition:** Forecast service module loaded
**Steps:**
1. For each region in REGION_TOTAL_YIELDS, compare wet and dry yields
2. Verify dry season > wet season
**Expected Result:** Dry season yields exceed wet season yields for all regions

### TC-SVC-003: Total Yield Calibration
**Description:** Verify total yield across regions approximates 972,000 MT (calibrated)
**Precondition:** Forecast service module loaded
**Steps:**
1. Calculate forecasts for all regions (both seasons)
2. Sum all total yields with calibration applied
3. Verify total is between 970,000 - 980,000 MT
**Expected Result:** Calibrated total yield ≈ 972,000 MT

### TC-SVC-004: Wet Season Forecast Calculation
**Description:** Verify calibrated forecast for wet season with improved accuracy
**Precondition:** Forecast service module loaded
**Steps:**
1. Call calculateForecast("Nueva Ecija", "wet")
2. Verify perHa ≈ 6.29 MT/ha (calibrated)
3. Verify total > 82,000 MT (calibrated)
4. Verify MAPE < 7.0% (improved accuracy)
**Expected Result:** Wet season forecast with calibration factor 1.028

### TC-SVC-005: Dry Season Forecast Calculation
**Description:** Verify calibrated forecast for dry season with improved accuracy
**Precondition:** Forecast service module loaded
**Steps:**
1. Call calculateForecast("Nueva Ecija", "dry")
2. Verify perHa ≈ 6.98 MT/ha (calibrated)
3. Verify total > 91,000 MT (calibrated)
4. Verify MAPE < 7.0% (improved accuracy)
**Expected Result:** Dry season forecast with calibration factor 1.035

### TC-SVC-006: Dry Season MAPE Lower Than Wet
**Description:** Verify dry season has better MAPE accuracy than wet season
**Precondition:** Forecast service module loaded
**Steps:**
1. Calculate forecasts for both seasons
2. Compare MAPE values
3. Verify dry MAPE < wet MAPE
**Expected Result:** Dry season MAPE (5.8%) < Wet season MAPE (6.5%)

### TC-SVC-007: Minimum Area Handling
**Description:** Verify forecast handles minimum area of 1 hectare
**Precondition:** Forecast service module loaded
**Steps:**
1. Call calculateForecast with area = 1
2. Verify perHa > 0
3. Verify total > 0
**Expected Result:** Valid forecast returned for 1 ha

### TC-SVC-008: Maximum Area Handling
**Description:** Verify forecast handles maximum area of 2000 hectares
**Precondition:** Forecast service module loaded
**Steps:**
1. Call calculateForecast with area = 2000
2. Verify perHa > 0
3. Verify total > 0
4. Verify total < 20,000 MT
**Expected Result:** Valid forecast returned for 2000 ha

### TC-SVC-009: Different Regions Produce Different Results
**Description:** Verify forecasts differ by region
**Precondition:** Forecast service module loaded
**Steps:**
1. Calculate forecast for Nueva Ecija wet season
2. Calculate forecast for Iloilo wet season
3. Compare perHa values
**Expected Result:** Different perHa values for different regions

### TC-SVC-010: Invalid Region Default
**Description:** Verify invalid region returns default values
**Precondition:** Forecast service module loaded
**Steps:**
1. Call getBaseYield with invalid region name
2. Verify perHa returns default ≈ 2.88 MT/ha
**Expected Result:** Default value returned for invalid region

---

## Module 2: Dashboard Page

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

### TC-DASH-005: Stat Cards Performance
**Description:** Verify stat card calculations complete within acceptable time
**Precondition:** Dashboard page is loaded
**Steps:**
1. Start performance timer
2. Calculate total yield and total area
3. Stop timer
4. Verify duration < 100ms
**Expected Result:** Calculations complete within 100ms

---

## Module 3: Forecast Page

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

### TC-FORE-009: Forecast Performance
**Description:** Verify forecast completes within 2 seconds
**Precondition:** Forecast page is loaded
**Steps:**
1. Start timer
2. Click Generate forecast button
3. Wait for results
4. Verify duration < 2000ms
**Expected Result:** Forecast generation under 2 seconds

---

## Module 4: Settings Page

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

### TC-SET-005: Email Format Validation
**Description:** Verify email input validates format correctly
**Precondition:** Settings page is loaded
**Steps:**
1. Enter valid email "test@example.com"
2. Verify input accepts value
3. Enter invalid email "invalid-email"
4. Verify input rejects or flags invalid format
**Expected Result:** Email validation works correctly

---

## Module 5: Typography & Styling Tests

### TC-TYPE-001: Display Font Loading
**Description:** Verify display font (Fraunces) loads for headings
**Precondition:** Any page is loaded
**Steps:**
1. Inspect heading text elements
2. Verify font-family includes Fraunces/ui-serif
3. Verify font loads without errors
**Expected Result:** Fraunces font properly loaded for headings and display elements

### TC-TYPE-002: Sans-serif Font Loading
**Description:** Verify sans-serif font (Inter) loads for UI elements
**Precondition:** Any page is loaded
**Steps:**
1. Inspect UI text elements
2. Verify font-family includes Inter/ui-sans-serif
3. Verify font loads without errors
**Expected Result:** Inter font properly loaded for UI elements

### TC-TYPE-003: Primary Color OKLCH Format
**Description:** Verify primary color uses OKLCH format
**Precondition:** Any page is loaded
**Steps:**
1. Inspect primary color elements
2. Verify --primary is defined in oklch format
3. Verify oklch(lightness chromaticity hue) pattern
**Expected Result:** Primary color uses OKLCH format

### TC-TYPE-004: Success Color OKLCH Format
**Description:** Verify success color uses OKLCH format
**Precondition:** Any page is loaded
**Steps:**
1. Inspect success elements (status badges)
2. Verify --success is defined in oklch format
3. Verify oklch pattern
**Expected Result:** Success color uses OKLCH format

### TC-TYPE-005: Warning Color OKLCH Format
**Description:** Verify warning color uses OKLCH format
**Precondition:** Any page is loaded
**Steps:**
1. Inspect warning elements
2. Verify --warning is defined in oklch format
3. Verify oklch pattern
**Expected Result:** Warning color uses OKLCH format

### TC-TYPE-006: Accent Color OKLCH Format
**Description:** Verify accent color uses OKLCH format
**Precondition:** Any page is loaded
**Steps:**
1. Inspect accent elements
2. Verify --accent is defined in oklch format
3. Verify oklch pattern
**Expected Result:** Accent color uses OKLCH format

### TC-TYPE-007: White Card Background
**Description:** Verify cards have white background
**Precondition:** Any page with cards is loaded
**Steps:**
1. Observe card elements
2. Verify background is oklch(1 0 0) - pure white
**Expected Result:** Cards have white background

### TC-TYPE-008: Hairline Borders
**Description:** Verify cards have hairline border styling
**Precondition:** Any page with cards is loaded
**Steps:**
1. Observe card border styling
2. Verify border uses oklch(0.9 0.02 90) - light border
**Expected Result:** Cards have proper hairline borders

### TC-TYPE-009: Dark Mode Background
**Description:** Verify dark mode background is defined
**Precondition:** Dark mode enabled
**Steps:**
1. Inspect dark mode background
2. Verify --background uses oklch(0.18 0.03 150)
**Expected Result:** Dark mode background uses OKLCH format

### TC-TYPE-010: Dark Mode Card Background
**Description:** Verify dark mode card background is defined
**Precondition:** Dark mode enabled
**Steps:**
1. Inspect dark mode card background
2. Verify --card uses oklch(0.22 0.04 150)
**Expected Result:** Dark mode card background uses OKLCH format

### TC-TYPE-011: Hero Gradient
**Description:** Verify hero gradient is defined correctly
**Precondition:** Any page with hero section
**Steps:**
1. Inspect hero gradient CSS
2. Verify 135deg gradient exists
3. Verify oklch colors in gradient
**Expected Result:** Hero gradient uses correct 135deg angle and oklch colors

---

## Module 6: Accessibility Tests

### TC-A11Y-001: Keyboard Navigation - Dashboard
**Description:** Verify Dashboard page has focusable elements
**Precondition:** Any page is loaded
**Steps:**
1. Tab through Dashboard page elements
2. Verify focus on: Forecasted yield, Active fields, Rainfall (7d), Growing degree days
3. Verify logical tab order
**Expected Result:** All interactive elements reachable via keyboard on Dashboard

### TC-A11Y-002: Keyboard Navigation - Forecast
**Description:** Verify Forecast page has focusable elements
**Precondition:** Forecast page is loaded
**Steps:**
1. Tab through Forecast page elements
2. Verify focus on: Region selector, Season toggles, Planted area, Generate button
3. Verify logical tab order
**Expected Result:** All interactive elements reachable via keyboard on Forecast

### TC-A11Y-003: Keyboard Navigation - Settings
**Description:** Verify Settings page has focusable elements
**Precondition:** Settings page is loaded
**Steps:**
1. Tab through Settings page elements
2. Verify focus on: Workspace name, Primary region, Total hectares, Contact email
3. Verify logical tab order
**Expected Result:** All interactive elements reachable via keyboard on Settings

### TC-A11Y-004: Focus Indicator Visibility
**Description:** Verify visible focus indicators present
**Precondition:** Page is loaded
**Steps:**
1. Tab to each interactive element
2. Observe focus indicator
3. Verify focus-visible class applied
4. Verify ring color is visible
**Expected Result:** Visible focus indicators on all focused elements

### TC-A11Y-005: No-Mouse Season Toggle
**Description:** Verify dashboard usable without mouse - season toggle
**Precondition:** Keyboard-only navigation
**Steps:**
1. Navigate to forecast page using keyboard only
2. Toggle season using keyboard (Enter/Space)
3. Verify Wet/Dry toggle works
**Expected Result:** Season toggle works without mouse

### TC-A11Y-006: No-Mouse Generate Button
**Description:** Verify dashboard usable without mouse - generate button
**Precondition:** Keyboard-only navigation
**Steps:**
1. Navigate to Generate forecast button
2. Activate using Enter or Space key
3. Verify forecast generation triggers
**Expected Result:** Generate button works without mouse

### TC-A11Y-007: No-Mouse Switch Interaction
**Description:** Verify dashboard usable without mouse - switches
**Precondition:** Keyboard-only navigation
**Steps:**
1. Navigate to notification toggles
2. Activate using keyboard
3. Verify toggle state changes
**Expected Result:** Switches work without mouse

### TC-A11Y-008: Screen Reader Heading Structure
**Description:** Verify proper heading hierarchy for screen readers
**Precondition:** Screen reader installed
**Steps:**
1. Navigate with screen reader
2. Verify h1, h2, h3 elements exist
3. Verify proper nesting
**Expected Result:** Proper heading hierarchy announced

### TC-A11Y-009: Screen Reader Form Labels
**Description:** Verify form labels properly associated for screen readers
**Precondition:** Screen reader installed
**Steps:**
1. Navigate to Settings page with screen reader
2. Verify each input has associated label
3. Verify label-input pairing for ws, region, ha, email inputs
**Expected Result:** All form labels parseable by screen readers

### TC-A11Y-010: Screen Reader Button Text
**Description:** Verify buttons have text content for screen readers
**Precondition:** Screen reader installed
**Steps:**
1. Navigate to any page with screen reader
2. Verify buttons have visible text
3. Check Cancel, Save changes, Generate forecast, Wet, Dry buttons
**Expected Result:** All buttons have accessible text content

### TC-A11Y-011: Touch Target Size
**Description:** Verify mobile touch targets are adequate
**Precondition:** Mobile viewport
**Steps:**
1. Inspect interactive elements
2. Verify minimum 44x44px touch target size
**Expected Result:** All touch targets meet 44px minimum

---

## Module 7: Mobile Viewport Tests

### TC-MOB-001: Mobile Phone Viewport
**Description:** Verify mobile phone viewport dimensions supported
**Precondition:** Mobile browser (412x915)
**Steps:**
1. Open dashboard on mobile viewport
2. Verify page loads within 3 seconds
3. Verify no horizontal scroll
4. Verify all elements fit viewport
**Expected Result:** Page loads correctly on mobile phone viewport

### TC-MOB-002: Tablet Viewport
**Description:** Verify tablet viewport dimensions supported
**Precondition:** Tablet browser (768x1024)
**Steps:**
1. Open dashboard on tablet viewport
2. Verify page loads correctly
3. Verify responsive layout transitions
**Expected Result:** Page loads correctly on tablet viewport

### TC-MOB-003: Stat Cards Responsive Grid
**Description:** Verify stat cards use responsive grid
**Precondition:** Mobile viewport
**Steps:**
1. Load dashboard on mobile
2. Verify stat cards use sm:grid-cols-2
3. Verify stat cards use lg:grid-cols-4 on desktop
**Expected Result:** Stat cards responsive grid works correctly

### TC-MOB-004: Fields Responsive Grid
**Description:** Verify fields list uses responsive grid
**Precondition:** Mobile viewport
**Steps:**
1. Load dashboard on mobile
2. Verify fields use lg:grid-cols-3
**Expected Result:** Fields responsive grid works correctly

### TC-MOB-005: Responsive Typography
**Description:** Verify headings use responsive font sizes
**Precondition:** Mobile viewport
**Steps:**
1. Inspect headings on mobile
2. Verify text-3xl on mobile
3. Verify md:text-4xl on desktop
**Expected Result:** Headings scale appropriately on mobile

### TC-MOB-006: Mobile Chart Rendering
**Description:** Verify charts render on mobile viewport
**Precondition:** Mobile viewport
**Steps:**
1. Load forecast page on mobile
2. Verify chart containers have responsive height (h-64, h-56)
3. Verify no overflow issues
**Expected Result:** Charts render properly on mobile

### TC-MOB-007: Mobile Navigation Search
**Description:** Verify search bar hidden on mobile
**Precondition:** Mobile viewport
**Steps:**
1. Observe navigation elements on mobile
2. Verify search is hidden (hidden md:block)
3. Verify sidebar trigger visible
**Expected Result:** Navigation adapts to mobile (search hidden, trigger visible)

### TC-MOB-008: Mobile Performance
**Description:** Verify charts render within 2 seconds on mobile
**Precondition:** Mobile viewport
**Steps:**
1. Load page with charts on mobile
2. Measure render time
3. Verify < 2000ms
**Expected Result:** Charts render within 2 seconds on mobile

### TC-MOB-009: Mobile Form Layout
**Description:** Verify forecast form stacks on mobile
**Precondition:** Mobile viewport
**Steps:**
1. Load forecast page on mobile
2. Verify form grid stacks (grid gap-6 lg:grid-cols-5)
3. Verify button is full-width (w-full)
**Expected Result:** Form layout responsive on mobile

---

## Module 8: Cross-Browser Compatibility Tests

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

### TC-CB-004: Mobile Chrome Compatibility
**Description:** Verify Dashboard works on Chrome Android
**Precondition:** Chrome Android installed
**Steps:**
1. Open Dashboard in Chrome Android
2. Verify all features work
3. Check for mobile CSS issues
**Expected Result:** Full compatibility on Chrome Android

### TC-CB-005: Safari iOS Compatibility
**Description:** Verify Dashboard works on Safari iOS
**Precondition:** Safari iOS 26+ installed
**Steps:**
1. Open Dashboard in Safari iOS
2. Verify all features work
3. Check for iOS CSS issues
**Expected Result:** Full compatibility on Safari iOS

### TC-CB-006: OKLCH Color Support
**Description:** Verify OKLCH color format supported
**Precondition:** Modern browser with OKLCH support
**Steps:**
1. Inspect color values in browser
2. Verify oklch format renders correctly
**Expected Result:** OKLCH colors display properly

### TC-CB-007: CSS Grid Support
**Description:** Verify CSS Grid layout works
**Precondition:** Modern browser with Grid support
**Steps:**
1. Inspect grid layouts
2. Verify grid properties apply
**Expected Result:** CSS Grid layouts work correctly

### TC-CB-008: matchMedia API
**Description:** Verify matchMedia API available for responsive detection
**Precondition:** Browser with matchMedia support
**Steps:**
1. Verify matchMedia exists in window object
2. Test responsive breakpoint detection
**Expected Result:** matchMedia API functions correctly

### TC-CB-009: ResizeObserver API
**Description:** Verify ResizeObserver API available for responsive charts
**Precondition:** Browser with ResizeObserver support
**Steps:**
1. Verify ResizeObserver exists globally
2. Test chart resize behavior
**Expected Result:** ResizeObserver API functions correctly

---

## Performance Tests

### TC-PERF-001: Dashboard Calculations
**Description:** Verify stat card calculations complete within 100ms
**Precondition:** Dashboard page is loaded
**Steps:**
1. Start performance timer
2. Perform total yield and area calculations
3. Stop timer
4. Verify < 100ms
**Expected Result:** Calculations complete within 100ms

### TC-PERF-002: Forecast Generation
**Description:** Verify forecast completes within 2 seconds
**Precondition:** Forecast page is loaded
**Steps:**
1. Start timer
2. Click Generate forecast
3. Wait for results
4. Verify < 2000ms
**Expected Result:** Forecast under 2 seconds

### TC-PERF-003: Multiple Forecasts
**Description:** Verify multiple forecast calculations efficient
**Precondition:** Forecast service loaded
**Steps:**
1. Start timer
2. Calculate forecasts for all 6 regions x 2 seasons
3. Stop timer
4. Verify < 2000ms
**Expected Result:** 12 calculations complete within 2 seconds

---

## Test Priority Matrix

| Priority | Test Cases |
|----------|------------|
| Critical | TC-SVC-001, TC-SVC-002, TC-SVC-003, TC-FORE-001, TC-FORE-004, TC-FORE-005 |
| High | TC-DASH-001, TC-DASH-002, TC-DASH-003, TC-SET-001, TC-A11Y-001, TC-A11Y-002, TC-CB-001, TC-CB-002, TC-CB-003 |
| Medium | TC-FORE-002, TC-FORE-003, TC-FORE-006, TC-FORE-007, TC-SET-002, TC-SET-004, TC-TYPE-001-011 |
| Low | TC-A11Y-003-011, TC-MOB-001-009, TC-CB-004-009 |

---

## Suspension Criteria

Testing should be suspended if:
1. Model Inference Failure - FastAPI backend cannot generate forecasts
2. Critical UI Blocking Defect - Key pages fail to load
3. Dashboard Load Failure - White screen or server error across browsers
4. Data Integrity Breach - Incorrect forecast values
5. Export Failure - Export functions non-functional

---

## Setup Requirements

### Test Environment
- Node.js v20+
- NPM v10+
- vitest testing framework

### Test Execution
- Set SCREEN_RECORD_MODE=true for delayed test execution (screen recording)
- Set NODE_ENV=test for test environment

### Mock Coverage
- lucide-react icons mocked
- Recharts components mocked
- useRouter mocks configured
- matchMedia mock for responsive tests
- ResizeObserver mock for chart tests