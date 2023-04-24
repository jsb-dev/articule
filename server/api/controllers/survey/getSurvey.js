import Survey from '../../../database/models/Survey.js';

const getSurvey = async (req, res) => {
  try {
    const { _id } = req.query;
    const survey = await Survey.findById(_id);

    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    res.status(200).json(survey);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching the survey',
      error: error.message,
    });
  }
};

export default getSurvey;
