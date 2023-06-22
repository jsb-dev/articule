import ObjectID from 'bson-objectid';

const generateUniqueBsonId = () => new ObjectID().toString();

export default generateUniqueBsonId;
