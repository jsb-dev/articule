import env from 'react-dotenv';
import LRU from 'lru-cache';
import ObjectID from 'bson-objectid';

const { REACT_APP_API_URL } = env;
const cache = new LRU(1000); // Cache size set to 1000 items

const generateUniqueId = () => new ObjectID().toString();

const checkIdAvailability = async (id) => {
  if (cache.has(id)) {
    return cache.get(id);
  }

  try {
    const response = await fetch(
      `${REACT_APP_API_URL}account/check/id?id=${id}`
    );
    const data = await response.json();
    cache.set(id, data.exists);
    return data.exists;
  } catch (error) {
    console.error('Error checking ID availability:', error);
    throw error;
  }
};

const getAvailableId = async () => {
  let id;
  let attemptCounter = 0;

  do {
    id = generateUniqueId();
    attemptCounter += 1;

    if (attemptCounter > 10) {
      throw new Error('Maximum ID generation attempts exceeded.');
    }
  } while (await checkIdAvailability(id));

  return id;
};

const generateUserId = async () => {
  try {
    const id = await getAvailableId();
    return id;
  } catch (error) {
    console.error('Error generating ID:', error);
    throw error;
  }
};

export default generateUserId;
