/**
 * Central functions for interacting with the Nest API.
 * This file handles authentication and automatically attaches the access token to requests.
 */

/**
 * Authenticates with the NestJS backend and retrieves a JWT bearer token.
 * The token is required to access protected API endpoints.
 */
export async function GetNestToken(): Promise<string> {
  const response = await fetch(`${process.env.NEST_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Login credentials are read from environment variables for security reasons
    body: JSON.stringify({
      username: process.env.NEST_USERNAME,
      password: process.env.NEST_PASSWORD,
    }),
  });

  // Throw an error if authentication fails
  if (!response.ok) {
    throw new Error("Fehler bei der Authentifizierung mit der Nest API");
  }

  // Backend response contains the JWT access token
  const data = await response.json();

  // Return the access token so it can be used for API requests
  return data.accessToken as string;
}

/**
 * Sends a request to the NestJS backend API.
 * Before making the request, it retrieves a valid JWT token using GetNestToken and includes it in the Authorization header.
 * This allows you to call any protected API endpoint without worrying about authentication details in your components.
 * @param endpoint The specific API endpoint to call (e.g., "api/squad").
 */
export async function NestFetch<T>(endpoint: string): Promise<T> {
  // Get a valid bearer token for authentication
  const token = await GetNestToken();

  const response = await fetch(`${process.env.NEST_API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      // Attach the bearer token to authorize the request
      Authorization: `Bearer ${token}`,
    },
  });

  // Throw an error if the request fails
  if (!response.ok) {
    throw new Error(`Fehler bei der Anfrage an die Nest API: ${response.statusText}`);
  }

  // Return the JSON response from the API
  return response.json();
}
