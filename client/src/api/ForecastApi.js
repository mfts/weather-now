class ForecastApi {
  constructor() {
    this.endpoint = (latitude, longitude) => `${process.env.API_BASE_URL}/api?latitude=${latitude}&longitude=${longitude}`;
    this.data = null;
  }

  async fetch(latitude, longitude) {
    try {
      const response = await fetch(this.endpoint(latitude, longitude))
      this.data = await response.json()
    } catch (err) {
      throw new Error(`ForecastAPI unable to fetch: ${err.message}`)
    }
  }
}

export default ForecastApi;