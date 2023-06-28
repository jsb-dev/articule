const getAccountByEmail = async (userEmail, apiUrl) => {
  try {
    const response = await fetch(
      `${apiUrl}account/check/email?email=${userEmail}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking account:', error);
    throw error;
  }
};

export default getAccountByEmail;
