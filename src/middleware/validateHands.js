const validateHands = (req, res, next) => {
  const { hand1, hand2 } = req.body;

  if (!hand1 || !hand2) {
    return res.status(400).json({ error: "Ambas manos son requeridas" });
  }

  if (hand1.split(" ").length !== 5 || hand2.split(" ").length !== 5) {
    return res.status(400).json({ error: "Ambas manos deben tener 5 cartas" });
  }

  next();
};

module.exports = validateHands;
