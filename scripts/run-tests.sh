#!/bin/bash

# Tanaw Test Automation Script
# This script runs all test suites for the TANAW platform

# Check for screen recording mode
SCREEN_RECORD_MODE=false
DELAY_BETWEEN_TESTS=500  # milliseconds

# Remove --screen-record/-sr flag from args before processing other flags
FILTERED_ARGS=()
for arg in "$@"; do
    if [[ "$arg" == "--screen-record" || "$arg" == "-sr" ]]; then
        SCREEN_RECORD_MODE=true
    else
        FILTERED_ARGS+=("$arg")
    fi
done
# Replace positional parameters with filtered args
set -- "${FILTERED_ARGS[@]}"

# Function to add delay for screen recording
add_test_delay() {
    if [ "$SCREEN_RECORD_MODE" = true ]; then
        node -e "const start=Date.now();while(Date.now()-start<${DELAY_BETWEEN_TESTS}){}" 2>/dev/null || sleep 0.3
    fi
}

set -e

echo "=========================================="
echo "TANAW Test Automation Suite"
echo "Test Plan v0.3.0 - Nueva Ecija Release"
if [ "$SCREEN_RECORD_MODE" = true ]; then
    echo "🎬 SCREEN RECORDING MODE - Delays enabled"
fi
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Parse command line arguments
RUN_ALL=false
RUN_UNIT=false
RUN_ACCESSIBILITY=false
RUN_MOBILE=false
RUN_CROSS_BROWSER=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --all|-a)
            RUN_ALL=true
            shift
            ;;
        --unit|-u)
            RUN_UNIT=true
            shift
            ;;
        --accessibility|-a11y)
            RUN_ACCESSIBILITY=true
            shift
            ;;
        --mobile|-m)
            RUN_MOBILE=true
            shift
            ;;
        --cross-browser|-b)
            RUN_CROSS_BROWSER=true
            shift
            ;;
        --help|-h)
            echo "Usage: ./scripts/run-tests.sh [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --all, -a          Run all test suites"
            echo "  --unit, -u         Run unit tests (default)"
            echo "  --accessibility, -a11y  Run accessibility tests"
            echo "  --mobile, -m       Run mobile viewport tests"
            echo "  --cross-browser, -b     Run cross-browser tests"
            echo "  --screen-record, -sr     Enable delays for screen recording emphasis"
            echo "  --help, -h         Show this help message"
            echo ""
            echo "Examples:"
            echo "  ./scripts/run-tests.sh --all --screen-record  # Run all tests with emphasis"
            echo "  npm run test:screen:all                      # Alternative via npm"
            exit 0
            ;;
        *)
            RUN_UNIT=true
            shift
            ;;
    esac
done

# If no specific flag, run unit tests by default
if [ "$RUN_ALL" = false ] && [ "$RUN_UNIT" = false ] && [ "$RUN_ACCESSIBILITY" = false ] && [ "$RUN_MOBILE" = false ] && [ "$RUN_CROSS_BROWSER" = false ]; then
    RUN_UNIT=true
fi

echo ""
echo "Starting test execution..."
echo ""

# Function to run test with timing and delays
run_test() {
    local test_name=$1
    local test_command=$2
    
    echo ""
    echo "============================================"
    echo -e "${YELLOW}🧪 TEST SUITE: $test_name${NC}"
    echo "============================================"
    
    # Add delay before running test
    if [ "$SCREEN_RECORD_MODE" = true ]; then
        node -e "const start=Date.now();while(Date.now()-start<${DELAY_BETWEEN_TESTS}){}" 2>/dev/null || sleep 0.3
    fi
    
    # Add SCREEN_RECORD_MODE env var to command if in screen record mode
    local full_command="$test_command"
    if [ "$SCREEN_RECORD_MODE" = true ]; then
        full_command="cross-env SCREEN_RECORD_MODE=true $test_command"
    fi
    
    start_time=$(date +%s)
    if eval $full_command; then
        end_time=$(date +%s)
        duration=$((end_time - start_time))
        echo ""
        echo -e "${GREEN}✅✅✅ TEST SUITE PASSED: $test_name (${duration}s) ✅✅✅${NC}"
        echo ""
        # Add delay after test completes
        if [ "$SCREEN_RECORD_MODE" = true ]; then
            node -e "const start=Date.now();while(Date.now()-start<${DELAY_BETWEEN_TESTS}){}" 2>/dev/null || sleep 0.3
        fi
        return 0
    else
        end_time=$(date +%s)
        duration=$((end_time - start_time))
        echo ""
        echo -e "${RED}❌❌❌ TEST SUITE FAILED: $test_name (${duration}s) ❌❌❌${NC}"
        echo ""
        return 1
    fi
}

# Track test results
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Run Frontend Unit Tests
if [ "$RUN_ALL" = true ] || [ "$RUN_UNIT" = true ]; then
    echo ""
    echo "=== Frontend Unit Tests ==="
    if run_test "Frontend Unit Tests" "npm run test"; then
        ((PASSED_TESTS++))
    else
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
fi

# Run Accessibility Tests
if [ "$RUN_ALL" = true ] || [ "$RUN_ACCESSIBILITY" = true ]; then
    echo ""
    echo "=== Accessibility Tests ==="
    if run_test "Accessibility Tests" "npm run test -- --grep='Accessibility'"; then
        ((PASSED_TESTS++))
    else
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
fi

# Run Mobile Viewport Tests
if [ "$RUN_ALL" = true ] || [ "$RUN_MOBILE" = true ]; then
    echo ""
    echo "=== Mobile Viewport Tests ==="
    if run_test "Mobile Viewport Tests" "npm run test -- --grep='Mobile'"; then
        ((PASSED_TESTS++))
    else
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
fi

# Run Cross-Browser Tests
if [ "$RUN_ALL" = true ] || [ "$RUN_CROSS_BROWSER" = true ]; then
    echo ""
    echo "=== Cross-Browser Tests ==="
    if run_test "Cross-Browser Tests" "npm run test -- --grep='Cross-Browser'"; then
        ((PASSED_TESTS++))
    else
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
fi

# Run API Tests
if [ "$RUN_ALL" = true ]; then
    echo ""
    echo "=== API Tests ==="
    if run_test "API Tests" "npm run test:api:screen"; then
        ((PASSED_TESTS++))
    else
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
fi

# Run Test Coverage
echo ""
echo "=== Test Coverage ==="
if run_test "Test Coverage" "npm run test:coverage"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))

# Summary
echo ""
echo "=========================================="
echo "Test Execution Summary"
echo "=========================================="
echo "Total Test Suites: $TOTAL_TESTS"
echo -e "Passed: ${GREEN}$PASSED_TESTS${NC}"
echo -e "Failed: ${RED}$FAILED_TESTS${NC}"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please review the output above.${NC}"
    exit 1
fi