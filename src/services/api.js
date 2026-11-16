const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error('Error en servicio API:', error);
    throw error;
  }
};
