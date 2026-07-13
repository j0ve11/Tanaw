"""
Test Module 5: Backend Integration
Test cases for FastAPI inference endpoints /api/forecast and /api/health
"""

import pytest
from fastapi.testclient import TestClient
from forecast_api import app, ForecastInput, DekadFeatures

# Create test client
client = TestClient(app)


class TestHealthEndpoint:
    """Tests for /api/health endpoint"""

    def test_health_check_returns_healthy_status(self):
        """Test that health check returns status 'healthy'"""
        response = client.get("/api/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"

    def test_health_check_returns_models_loaded_status(self):
        """Test that health check returns models_loaded boolean"""
        response = client.get("/api/health")
        assert response.status_code == 200
        assert "models_loaded" in response.json()
        assert isinstance(response.json()["models_loaded"], bool)


class TestForecastEndpoint:
    """Tests for /api/forecast endpoint"""

    def get_sample_dekads(self, season: str = "wet"):
        """Helper to generate sample dekad data for testing"""
        seasonal_enc = 1 if season == "wet" else 0
        return [
            DekadFeatures(
                VH_Mean_dB=-15.0,
                VV_Mean_dB=-10.0,
                VH_VV_Ratio=0.9,
                RVI=0.03,
                NDVI_Mean=0.5,
                EVI_Mean=0.3,
                LSWI_Mean=0.3,
                Seasonal_Encoding=seasonal_enc,
                Event_Disruption=0,
                Sin_Dekad=0.5,
                Cos_Dekad=0.8
            ) for _ in range(5)
        ]

    def test_forecast_returns_valid_structure(self):
        """Test that forecast returns valid response structure"""
        response = client.post(
            "/api/forecast",
            json={
                "region": "Nueva Ecija",
                "season": "wet",
                "area": 13162,
                "dekads": self.get_sample_dekads()
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert "perHa" in data
        assert "total" in data
        assert "mape" in data

    def test_forecast_per_ha_is_positive(self):
        """Test that forecast per hectare value is positive"""
        response = client.post(
            "/api/forecast",
            json={
                "region": "Nueva Ecija",
                "season": "wet",
                "area": 13162,
                "dekads": self.get_sample_dekads()
            }
        )
        
        assert response.status_code == 200
        assert response.json()["perHa"] > 0

    def test_forecast_total_is_positive(self):
        """Test that forecast total yield value is positive"""
        response = client.post(
            "/api/forecast",
            json={
                "region": "Nueva Ecija",
                "season": "wet",
                "area": 13162,
                "dekads": self.get_sample_dekads()
            }
        )
        
        assert response.status_code == 200
        assert response.json()["total"] > 0

    def test_forecast_mape_under_15_percent(self):
        """Test that MAPE is under 15% accuracy target"""
        response = client.post(
            "/api/forecast",
            json={
                "region": "Nueva Ecija",
                "season": "wet",
                "area": 13162,
                "dekads": self.get_sample_dekads()
            }
        )
        
        assert response.status_code == 200
        assert response.json()["mape"] < 15

    def test_forecast_dry_season_mape_is_accurate(self):
        """Test that dry season MAPE meets accuracy target"""
        response = client.post(
            "/api/forecast",
            json={
                "region": "Nueva Ecija",
                "season": "dry",
                "area": 13162,
                "dekads": self.get_sample_dekads("dry")
            }
        )
        
        assert response.status_code == 200
        # Dry season MAPE should be around 5.8-6.5%
        assert response.json()["mape"] < 10

    def test_forecast_handles_invalid_region(self):
        """Test that forecast handles invalid region gracefully"""
        response = client.post(
            "/api/forecast",
            json={
                "region": "InvalidRegion",
                "season": "wet",
                "area": 13162,
                "dekads": self.get_sample_dekads()
            }
        )
        
        # Should still return valid response (fallback)
        assert response.status_code == 200

    def test_forecast_handles_missing_dekads(self):
        """Test that forecast returns error for invalid dekads"""
        response = client.post(
            "/api/forecast",
            json={
                "region": "Nueva Ecija",
                "season": "wet",
                "area": 13162,
                "dekads": []  # Invalid - should have 5 dekads
            }
        )
        
        # Should return error due to Pydantic validation
        assert response.status_code in [400, 422, 500]

    def test_forecast_handles_zero_area(self):
        """Test that forecast handles zero area input"""
        response = client.post(
            "/api/forecast",
            json={
                "region": "Nueva Ecija",
                "season": "wet",
                "area": 0,
                "dekads": self.get_sample_dekads()
            }
        )
        
        assert response.status_code == 200
        # Per hectare should be 0 or handle gracefully
        data = response.json()
        assert data["perHa"] >= 0

    def test_forecast_different_regions_return_different_values(self):
        """Test that different regions return different forecast values"""
        response_ne = client.post(
            "/api/forecast",
            json={
                "region": "Nueva Ecija",
                "season": "wet",
                "area": 13162,
                "dekads": self.get_sample_dekads()
            }
        )
        
        response_il = client.post(
            "/api/forecast",
            json={
                "region": "Iloilo",
                "season": "wet",
                "area": 12474,
                "dekads": self.get_sample_dekads()
            }
        )
        
        assert response_ne.status_code == 200
        assert response_il.status_code == 200
        assert response_ne.json()["perHa"] != response_il.json()["perHa"]

    def test_forecast_response_time_under_2_seconds(self):
        """Test that forecast generation completes within 2 seconds"""
        import time
        start = time.time()
        
        response = client.post(
            "/api/forecast",
            json={
                "region": "Nueva Ecija",
                "season": "wet",
                "area": 13162,
                "dekads": self.get_sample_dekads()
            }
        )
        
        end = time.time()
        duration = end - start
        
        assert response.status_code == 200
        assert duration < 2.0  # Less than 2 seconds


class TestForecastAccuracy:
    """Tests for model accuracy targets (MAPE < 15%, R² > 0.75)"""

    def test_mape_meets_target_all_seasons(self):
        """Test MAPE meets < 15% target for all seasons"""
        for season in ["wet", "dry"]:
            response = client.post(
                "/api/forecast",
                json={
                    "region": "Nueva Ecija",
                    "season": season,
                    "area": 13162,
                    "dekads": [DekadFeatures(
                        VH_Mean_dB=-15.0,
                        VV_Mean_dB=-10.0,
                        VH_VV_Ratio=0.9,
                        RVI=0.03,
                        NDVI_Mean=0.5,
                        EVI_Mean=0.3,
                        LSWI_Mean=0.3,
                        Seasonal_Encoding=1 if season == "wet" else 0,
                        Event_Disruption=0,
                        Sin_Dekad=0.5,
                        Cos_Dekad=0.8
                    ) for _ in range(5)]
                }
            )
            
            assert response.status_code == 200
            mape = response.json()["mape"]
            assert mape < 15, f"MAPE {mape}% exceeds 15% target for {season} season"

    def test_forecast_per_ha_in_valid_range(self):
        """Test per hectare yield is in valid rice yield range (3-12 MT/ha)"""
        response = client.post(
            "/api/forecast",
            json={
                "region": "Nueva Ecija",
                "season": "wet",
                "area": 13162,
                "dekads": [DekadFeatures(
                    VH_Mean_dB=-15.0,
                    VV_Mean_dB=-10.0,
                    VH_VV_Ratio=0.9,
                    RVI=0.03,
                    NDVI_Mean=0.5,
                    EVI_Mean=0.3,
                    LSWI_Mean=0.3,
                    Seasonal_Encoding=1,
                    Event_Disruption=0,
                    Sin_Dekad=0.5,
                    Cos_Dekad=0.8
                ) for _ in range(5)]
            }
        )
        
        assert response.status_code == 200
        per_ha = response.json()["perHa"]
        assert 3 <= per_ha <= 12, f"Per hectare yield {per_ha} outside valid range"


class TestSampleDataEndpoint:
    """Tests for /api/sample-data/{region} endpoint"""

    def test_sample_data_returns_valid_dekads(self):
        """Test that sample data endpoint returns valid dekad features"""
        response = client.get("/api/sample-data/Nueva Ecija")
        
        assert response.status_code == 200
        data = response.json()
        
        assert isinstance(data, list)
        assert len(data) == 5
        
        # Check required fields
        required_fields = [
            "VH_Mean_dB", "VV_Mean_dB", "VH_VV_Ratio", "RVI",
            "NDVI_Mean", "EVI_Mean", "LSWI_Mean",
            "Seasonal_Encoding", "Event_Disruption",
            "Sin_Dekad", "Cos_Dekad"
        ]
        
        for dekad in data:
            for field in required_fields:
                assert field in dekad

    def test_sample_data_handles_any_region(self):
        """Test that sample data works for any region name"""
        response = client.get("/api/sample-data/AnyRegion")
        
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 5


if __name__ == "__main__":
    pytest.main([__file__, "-v"])