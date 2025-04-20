/**
 * Helper function to get the base URL for API requests
 * Works in both client and server components
 */
export function getBaseUrl() {
    // Check if we're running on the server
    if (typeof window === "undefined") {
      // Server-side: use the VERCEL_URL if available, or default to localhost
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
      return baseUrl
    }
    // Client-side: use an empty string for relative URLs
    return ""
  }
  
  /**
   * Helper function to create API URLs
   * @param {string} path - The API path (e.g., '/api/topics')
   * @param {Object} params - Query parameters to add to the URL
   * @returns {string} The complete URL
   */
  export function createApiUrl(path, params = {}) {
    const baseUrl = getBaseUrl()
    const url = new URL(path, baseUrl)
  
    // Add cache-busting timestamp
    url.searchParams.append("t", Date.now().toString())
  
    // Add any additional query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString())
      }
    })
  
    return url.toString()
  }
  