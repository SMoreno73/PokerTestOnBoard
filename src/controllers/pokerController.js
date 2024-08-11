const pokerService = require("../services/pokerService");

const compareHands = (req, res) => {
  const { hand1, hand2 } = req.body;

  const result = pokerService.compareHands(hand1, hand2);

  res.json(result);
};

module.exports = {
  compareHands,
};
