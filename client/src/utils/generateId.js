import env from 'react-dotenv';

const { REACT_APP_API_URL } = env;

const generateRandomId = () => {
  const characters = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 24; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const checkIdAvailability = async (generatedId) => {
  try {
    const response = await fetch(
      `${REACT_APP_API_URL}account/check/id/${generatedId}`
    );
    const data = await response.json();
    if (data.exists === false) {
      return generatedId;
    } else {
      return checkIdAvailability(generateRandomId());
    }
  } catch (error) {
    console.error('Error checking ID availability:', error);
    throw error;
  }
};

const generateId = async () => {
  try {
    const id = await checkIdAvailability(generateRandomId());
    return id;
  } catch (error) {
    console.error('Error generating ID:', error);
    throw error;
  }
};

// Usage example
// generateId((id) => {
//   console.log('Generated ID:', id);
// });

export default generateId;
