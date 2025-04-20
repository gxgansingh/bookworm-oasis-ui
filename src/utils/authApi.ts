
interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    
    // Store the token in localStorage
    localStorage.setItem('auth_token', data.token);
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export function logout(): void {
  localStorage.removeItem('auth_token');
}

export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

