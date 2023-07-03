import LRU from 'lru-cache';

const cache = new LRU(1000);

const checkUserIdAvailability = async (id, endpoint) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  if (cache.has(id)) {
    return cache.get(id);
  }

  try {
    const response = await fetch(`${apiUrl}${endpoint}/check/id?id=${id}`);
    const data = await response.json();
    cache.set(id, data.exists);
    return data.exists;
  } catch (error) {
    console.error('Error checking ID availability:', error);
    throw error;
  }
};

export default checkUserIdAvailability;
