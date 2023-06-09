import generateUniqueBsonId from './generate-unique-bson-id';

const checkEdgeIdAvailability = (id, edgeIds) => {
  return !edgeIds.includes(id);
};

const getAvailableId = async (edgeIds) => {
  let id;
  let attemptCounter = 0;

  do {
    id = generateUniqueBsonId();
    attemptCounter += 1;

    if (attemptCounter > 10) {
      throw new Error('Maximum ID generation attempts exceeded.');
    }
  } while (!checkEdgeIdAvailability(id, edgeIds));

  return id;
};

const generateEdgeId = async (edgeIds) => {
  try {
    const id = await getAvailableId(edgeIds);
    return id;
  } catch (error) {
    console.error('Error generating ID:', error);
    throw error;
  }
};

export { generateEdgeId, checkEdgeIdAvailability };
