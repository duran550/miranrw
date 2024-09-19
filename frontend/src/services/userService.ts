export async function getAllUsers(token: string) {
  console.log('token55555555', token);

  try {
    const response = await fetch('/api/user/', {
      method: 'GET',
      headers: {
        authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-throw the error to handle it in the component
  }
}
