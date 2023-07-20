import User from '../../../database/models/user-model.js';

const processSaveDiagram = async (req, res) => {
  const { diagram } = req.body;
  const _id = req.query._id;

  try {
    const result = await User.findByIdAndUpdate(
      _id,
      { diagram },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ error: 'User not found' });
    }

    return res.status(200).send(result.diagram);
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error updating diagram', error: error.message });
  }
};

export default processSaveDiagram;
