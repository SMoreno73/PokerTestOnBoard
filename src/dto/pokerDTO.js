const valueRank = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  10: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,
};

const getPaloName = (palo) => {
  switch (palo) {
    case "H":
      return "Heart";
    case "D":
      return "Diamond";
    case "S":
      return "Spade";
    case "C":
      return "Club";
    case "K":
      return "King";
    default:
      return "Unknown";
  }
};

const createResponse = (winnerHand, winnerRank) => {
  if (!winnerHand || !winnerRank) {
    return {
      winnerHand: null,
      winnerHandType: null,
      compositionWinnerHand: [],
    };
  }

  // Verificar si todas las cartas tienen el mismo palo
  const allSameSuit =
    new Set(winnerRank.composition.map((card) => card.slice(-1))).size === 1;

  let compositionWinnerHand;

  if (allSameSuit) {
    // Obtener el palo de las cartas
    const palo = winnerRank.composition[0].slice(-1);
    compositionWinnerHand = [getPaloName(palo)];
  } else {
    // Ordenar las cartas en orden ascendente por valor
    const sortedComposition = winnerRank.composition.sort((a, b) => {
      const valueA = valueRank[a.slice(0, -1)];
      const valueB = valueRank[b.slice(0, -1)];
      return valueA - valueB;
    });

    // Extraer solo el valor de las cartas
    compositionWinnerHand = sortedComposition.map((card) => card.slice(0, -1));
  }

  return {
    winnerHand: winnerHand,
    winnerHandType: winnerRank.type,
    compositionWinnerHand: compositionWinnerHand,
  };
};

module.exports = {
  createResponse,
};
