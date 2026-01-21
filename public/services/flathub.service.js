class FlathubService {
  constructor() {
    this.baseUrl = "https://flathub.org/api/v2/appstream";
    this.cacheTTL = 1000 * 60 * 60 * 24 * 365;
  }

  getCacheKey(id) {
    return `flathub-${id}`;
  }

  getCache(id) {
    try {
      const raw = localStorage.getItem(this.getCacheKey(id));
      if (!raw) return null;

      const { data, timestamp } = JSON.parse(raw);

      if (Date.now() - timestamp > this.cacheTTL) {
        localStorage.removeItem(this.getCacheKey(id));
        return null;
      }

      return data;
    } catch {
      localStorage.removeItem(this.getCacheKey(id));
      return null;
    }
  }

  clearCache() {
    localStorage.clear();
  }

  setCache(id, data) {
    localStorage.setItem(
      this.getCacheKey(id),
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  }

  async get(id) {
    if (!id) {
      throw new Error("id is required");
    }

    const cached = this.getCache(id);
    if (cached) {
      return cached;
    }

    let json;

    try {
      const response = await fetch(`${this.baseUrl}/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      json = await response.json();

      this.setCache(id, json);

      return json;
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        this.clearCache();
        return json;
      }

      throw new Error(
        `Error searching for Flathub app. (${id}): ${error.message}`
      );
    }
  }
}

export const flathubService = new FlathubService();
