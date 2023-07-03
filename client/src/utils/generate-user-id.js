import generateUniqueBsonId from './generate-unique-bson-id';
import checkUserIdAvailability from './check-user-id-availability';

const getAvailableId = async () => {
  let id;
  let attemptCounter = 0;

  do {
    id = generateUniqueBsonId();
    attemptCounter += 1;

    if (attemptCounter > 10) {
      throw new Error('Maximum ID generation attempts exceeded.');
    }
  } while (await checkUserIdAvailability(id, 'account'));

  return id;
};

const generateUserId = async () => {
  try {
    const id = await getAvailableId();
    console.log('Generated User ID:', id);
    return id;
  } catch (error) {
    console.error('Error generating ID:', error);
    throw error;
  }
};

export default generateUserId;
