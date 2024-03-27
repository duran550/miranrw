export async function getAllUsers() {
  try {
    const response = await fetch('/api/user/');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-throw the error to handle it in the component
  }
}


