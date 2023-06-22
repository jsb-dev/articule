import env from 'react-dotenv';
import LRU from 'lru-cache';

const { REACT_APP_API_URL } = env;
const cache = new LRU(1000);

const checkIdAvailability = async (id, endpoint) => {
  if (cache.has(id)) {
    return cache.get(id);
  }

  try {
    const response = await fetch(
      `${REACT_APP_API_URL}${endpoint}/check/id?id=${id}`
    );
    const data = await response.json();
    cache.set(id, data.exists);
    return data.exists;
  } catch (error) {
    console.error('Error checking ID availability:', error);
    throw error;
  }
};

export default checkIdAvailability;
