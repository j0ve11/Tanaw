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
  - All expected regions defined (Nueva Ecija, Iloilo, Cagayan, Pangasinan, Bulacan, Isabela)
  - Wet and dry yields exist for each region
  - Dry season yields higher than wet season for each region
  - Total yield across regions approximately 972,000 MT (calibrated)
- **calculateForecast() function tests**:
  - Wet season calculations with calibration factor 1.028
  - Dry season calculations with calibration factor 1.035
  - MAPE accuracy targets (wet < 7%, dry < 7%)
  - Minimum area handling (1 ha)
  - Maximum area handling (2000 ha)
  - Different regions produce different results
- **getBaseYield() function tests**:
  - Wet season yield retrieval with calibration
  - Dry season yield retrieval with calibration
  - Invalid region returns default values
- **getCalibratedForecast() function tests**:
  - Returns calibrated per-hectare yield
  - Returns calibrated total yield
  - MAPE values under 7% (improved accuracy)

### 2. Component Tests

#### 2.1 Dashboard Page (`src/routes/index.tsx`)
- Stats cards render correctly with region data
- Yield trend chart displays data (8 months Jan-Aug)
- Active fields list renders (6 fields)
- Navigation links to Forecast page work
- Stat cards calculations (total yield, total area)

#### 2.2 Forecast Page (`src/routes/forecast.tsx`)
- Region selector displays all 6 regions
- Season toggle buttons function (Wet/Dry)
- Area input accepts valid values (1-2000 ha)
- Forecast calculation on button click
- Results display correctly (perHa, total, MAPE)
- Historical yield chart data (5 seasons)
- Loading state during forecast generation
- Error handling with toast notifications

#### 2.3 Settings Page (`src/routes/settings.tsx`)
- Form inputs display correct defaults
- Workspace name, primary region, total hectares, contact email
- Toggle switches render (3 notification toggles)
- Cancel and Save buttons present
- Input validation (email format, positive hectares)

### 3. Typography & Styling Tests

#### 3.1 Font Loading
- Display font (Fraunces) for headings
- Sans-serif font (Inter) for UI elements

#### 3.2 Color Palette - OKLCH Variables
- Primary color in OKLCH format
- Success color in OKLCH format
- Accent color in OKLCH format
- Warning color in OKLCH format
- All required color variables defined

#### 3.3 Card Styling
- White card background
- Hairline borders
- Proper card foreground color

#### 3.4 Dark Mode Colors
- Dark mode background definition
- Dark mode foreground definition
- Dark mode card background

#### 3.5 Gradients & Shadows
- Hero gradient (135deg)
- Card gradient (160deg)
- Soft shadow definition
- Glow shadow definition

### 4. Accessibility Tests

#### 4.1 Keyboard Navigation
- Tab order on Dashboard page
- Tab order on Forecast page
- Tab order on Settings page

#### 4.2 Focus Indicators
- Visible focus indicator classes (focus-visible)
- Ring color for focus indication

#### 4.3 No-Mouse Scenario
- Keyboard navigation for season toggle
- Keyboard activation for Generate forecast button
- Keyboard interaction with switches

#### 4.4 Screen Reader Compatibility
- aria-label for notification bell button
- Proper heading hierarchy (h1, h2, h3)
- Form labels properly associated
- Button text content for screen readers

#### 4.5 Color Contrast
- Sufficient contrast for primary text
- Sufficient contrast for text on primary color

#### 4.6 Interactive Element Accessibility
- Proper button types
- Proper input types (email, number, text)

#### 4.7 Mobile Accessibility
- Touch-friendly target sizes (44x44px minimum)
- Responsive font sizes

### 5. Mobile Viewport Tests

#### 5.1 Viewport Dimensions
- Mobile phone viewport (412x915)
- Mobile tablet viewport (768x1024)
- iOS Safari viewport (390x844)

#### 5.2 Responsive Grid Layout
- Mobile-first grid for stat cards (sm:grid-cols-2)
- Responsive grid for fields (lg:grid-cols-3)

#### 5.3 Responsive Typography
- Responsive font sizes for headings
- Responsive padding for main content

#### 5.4 Mobile Chart Rendering
- Responsive chart container height
- Responsive chart container for forecast

#### 5.5 Mobile Navigation
- Search bar hidden on mobile (hidden md:block)
- Sidebar trigger visible on mobile

#### 5.6 Mobile Performance
- Charts render within 2 seconds
- Page load time under 3 seconds

#### 5.7 Touch Target Sizes
- Minimum touch target size (44px)
- Button sizes appropriate for mobile

#### 5.8 Mobile Component Responsiveness
- Stat cards single column on mobile
- Forecast form stacked on mobile
- Full-width button on mobile

### 6. Cross-Browser Compatibility Tests

#### 6.1 Browser Support Matrix
- Google Chrome 150+ on desktop
- Mozilla Firefox 152+ on desktop
- Microsoft Edge 150+ on desktop
- Google Chrome on Android mobile
- Safari 26+ on iOS

#### 6.2 CSS Feature Support
- OKLCH color format support
- CSS Grid for layout
- Flexbox for components
- CSS Custom Properties (variables) support

#### 6.3 JavaScript Feature Support
- ES modules support
- Fetch API support
- Async/await support

#### 6.4 Chart Library Compatibility
- Recharts SVG support
- Responsive container functionality

#### 6.5 Tailwind CSS Classes
- Responsive utility classes (sm:, md:, lg:)
- Dark mode variant support

#### 6.6 Browser Feature Detection
- matchMedia API for responsive detection
- ResizeObserver API for responsive charts

---

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
| Region | Wet Season Yield (MT) | Dry Season Yield (MT) | Area (ha) |
|--------|----------------------|----------------------|-----------|
| Nueva Ecija | 80586 | 88762 | 13162 |
| Iloilo | 69273 | 81652 | 12474 |
| Cagayan | 65091 | 75993 | 12476 |
| Pangasinan | 73892 | 86079 | 12659 |
| Bulacan | 70947 | 83121 | 12469 |
| Isabela | 81582 | 90990 | 12823 |

### Area Boundary Tests
- Minimum: 1 ha
- Maximum: 2000 ha
- Calibration factors applied based on season

## Known Limitations
- Chart components (recharts) are mocked due to SVG complexity in test environment
- Router components require specific setup for full integration testing
- Screen recording mode available via SCREEN_RECORD_MODE environment variable