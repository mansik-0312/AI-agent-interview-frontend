const LOGIN_URL = "https://hrms-central-service.prometteur.in/userService/user/login";

const TOKEN_KEY = "authToken";
const USER_KEY = "user";

export interface LoginPayload {
  username: string;
  password: string;
}

export async function login(payload: LoginPayload): Promise<string> {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      result?.msg || result?.message || `Login failed (${response.status})`;

    throw new Error(message);
  }

  const token = result?.data?.authToken;

  if (!token) {
    throw new Error("authToken not found in login response");
  }

  // Save token
  localStorage.setItem(TOKEN_KEY, token);

  // Save complete user details
  localStorage.setItem(USER_KEY, JSON.stringify(result.data));

  return token;
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}