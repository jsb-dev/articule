import env from 'react-dotenv';

const { REACT_APP_API_URL } = env;

const findAccountByEmail = async (userEmail) => {
  try {
    const response = await fetch(
      `${REACT_APP_API_URL}account/check/email?email=${userEmail}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking account:', error);
    throw error;
  }
};

export default findAccountByEmail;
