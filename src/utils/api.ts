import { getAuthToken } from './authApi';

const API_BASE_URL = "http://localhost:8000/api";

const getHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export async function fetchBooks() {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

export async function fetchBookDetails(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching book ${id}:`, error);
    throw error;
  }
}

// This function would be used in a production environment.
// Currently, the getBookDetails function in bookUtils.ts is used
// to provide mock data for development.
export async function getBookDetailsFromAPI(id: string) {
  try {
    return await fetchBookDetails(id);
  } catch (error) {
    console.error('Error in getBookDetailsFromAPI:', error);
    return null;
  }
}
