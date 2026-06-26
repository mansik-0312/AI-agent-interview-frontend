const LOGIN_URL = "http://127.0.0.1:8080/userService/user/login";
const TOKEN_KEY = "authToken";

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

  localStorage.setItem(TOKEN_KEY, token);

  return token;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}