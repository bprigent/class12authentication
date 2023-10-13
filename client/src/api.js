const apiUrl = 'http://localhost:3000';




export const register = async (userData) => {
  try {
    // create a response constant that contains the response of the fetch
    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // if the response is not ok
    if (!response.ok) {
      const errorObject = await response.json();
      throw new Error(errorObject.error);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};






export const login = async (userData) => {
  try {
    // create a response constant that contains the response of the fetch
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // if the response is not ok
    if (!response.ok) {
      const errorObject = await response.json();
      throw new Error(errorObject.error);
    }
    
    // return the response in a json
    return await response.json();
  } 
  
  catch (error) {
    console.error(error);
    throw error;
  }
};







export const logout = async () => {
  try {
    const response = await fetch(`${apiUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    return true;  // or process the response if needed
  } catch (error) {
    console.error(error);
    throw error;
  }
};