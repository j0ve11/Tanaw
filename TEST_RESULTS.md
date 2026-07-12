# Test Results Summary

## Test Execution Date: 2026-07-12

## Overall Summary
- **Test Files**: 2 passed, 2 total
- **Tests**: 20 passed, 20 total
- **Duration**: ~1.2s

## Coverage Report
| File | Statements | Branches | Functions | Lines |
|------|------------|----------|-----------|-------|
| `src/lib/utils.ts` | 100% | 100% | 100% | 100% |
| `src/lib/forecast-service.ts` | 100% | 100% | 100% | 100% |

## Test Details

### src/lib/utils.test.ts (6 tests)
| Test | Status |
|------|--------|
| should combine class names | ✓ PASS |
| should handle conditional classes | ✓ PASS |
| should handle undefined and null values | ✓ PASS |
| should merge conflicting Tailwind classes correctly | ✓ PASS |
| should handle arrays of classes | ✓ PASS |
| should return empty string for no arguments | ✓ PASS |

### src/lib/forecast-service.test.ts (14 tests)
| Test | Status |
|------|--------|
| should have all expected regions defined | ✓ PASS |
| should have both wet and dry yields for each region | ✓ PASS |
| should have dry season yields higher than wet season yields | ✓ PASS |
| should calculate forecast for default area (25ha) correctly | ✓ PASS |
| should increase yield per ha for smaller areas than 25ha | ✓ PASS |
| should decrease yield per ha for larger areas than 25ha | ✓ PASS |
| should calculate dry season confidence higher than wet season | ✓ PASS |
| should cap confidence at 78 + 6 + 8 = 92 | ✓ PASS |
| should handle minimum area (1 ha) | ✓ PASS |
| should handle maximum area (2000 ha) | ✓ PASS |
| should return different values for different regions | ✓ PASS |
| should return correct base yield for wet season | ✓ PASS |
| should return correct base yield for dry season | ✓ PASS |
| should throw for invalid region | ✓ PASS |

## Recommendations
- Add component tests for pages (`index.tsx`, `forecast.tsx`, `settings.tsx`, `users.tsx`)
- Add integration tests for router navigation
- Consider end-to-end tests with Playwright for critical user flows