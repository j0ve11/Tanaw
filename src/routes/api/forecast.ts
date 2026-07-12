// API Route for satellite-based yield forecasting
// Proxies requests to Python FastAPI backend

export const ServerRoute = {
  POST: async ({ request }: { request: Request }) => {
    try {
      const body = await request.json()
      
      // Forward to Python FastAPI backend
      const response = await fetch('http://localhost:8000/api/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      
      if (!response.ok) {
        const error = await response.text()
        return new Response(JSON.stringify({ error: error || 'Prediction failed' }), {
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        })
      }
      
      const data = await response.json()
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Backend unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }
}
