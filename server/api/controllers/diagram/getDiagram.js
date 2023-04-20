import mongoose from 'mongoose';
import User from '../../../database/models/User.js';

const getDiagram = async (req, res) => {
  try {
    const { _id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { nodes, edges } = user.diagram;
    res.status(200).json({ nodes, edges });
  } catch (error) {
    console.error('Error getting diagram data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default getDiagram;
