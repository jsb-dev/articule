import generateUniqueBsonId from './generate-unique-bson-id';
import checkIdAvailability from './check-id-availability';

const getAvailableId = async () => {
  let id;
  let attemptCounter = 0;

  do {
    id = generateUniqueBsonId();
    attemptCounter += 1;

    if (attemptCounter > 10) {
      throw new Error('Maximum ID generation attempts exceeded.');
    }
  } while (await checkIdAvailability(id, 'edge'));

  return id;
};

const generateEdgeId = async () => {
  try {
    const id = await getAvailableId();
    return id;
  } catch (error) {
    console.error('Error generating ID:', error);
    throw error;
  }
};

export default generateEdgeId;

/*
Refactor generate-edge-id to use a new check-edge-id-availability named export and refer to each accountData.diagram.edges.id in context
*/
