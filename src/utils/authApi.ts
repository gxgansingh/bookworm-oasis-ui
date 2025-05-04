
// This is a simplified version since we no longer need authentication

export function logout(): void {
  // Simple logout function for UI consistency
  console.log('User logged out');
}

export function getAuthToken(): string {
  // Always return a mock token since we're not using authentication
  return 'mock-token';
}

export function isAuthenticated(): boolean {
  // Always return true since we're not using authentication
  return true;
}
