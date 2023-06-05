const appendTopic = async (req, res) => {
  try {
    const data = req.body;

    console.log('Received data:', data);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

export default appendTopic;
