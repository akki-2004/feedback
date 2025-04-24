
const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(200).json({ message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ timestamp: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
