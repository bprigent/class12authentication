const apiUrl = 'http://localhost:3000';

export const register = async (userData) => {
  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (userData) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      return response.json(); // adjust this according to your backend response
    } catch (error) {
      console.error(error);
      throw error;
    }
  };