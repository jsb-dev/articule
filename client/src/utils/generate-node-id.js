import generateUniqueBsonId from './generate-unique-bson-id';

const checkNodeIdAvailability = (id, nodeIds) => {
  return !nodeIds.includes(id);
};

const getAvailableId = async (nodeIds) => {
  let id;
  let attemptCounter = 0;

  do {
    id = generateUniqueBsonId();
    attemptCounter += 1;

    if (attemptCounter > 10) {
      throw new Error('Maximum ID generation attempts exceeded.');
    }
  } while (!checkNodeIdAvailability(id, nodeIds));

  return id;
};

const generateNodeId = async (nodeIds) => {
  try {
    const id = await getAvailableId(nodeIds);
    return id;
  } catch (error) {
    console.error('Error generating ID:', error);
    throw error;
  }
};

export { generateNodeId, checkNodeIdAvailability };
