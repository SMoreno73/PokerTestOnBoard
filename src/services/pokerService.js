const pokerLogic = require("../utils/pokerLogic");
const pokerDTO = require("../dto/pokerDTO");

const compareHands = (hand1, hand2) => {
  const hand1Rank = pokerLogic.rankHand(hand1);
  const hand2Rank = pokerLogic.rankHand(hand2);

  let winnerHand, winnerRank;

  if (hand1Rank.rank > hand2Rank.rank) {
    winnerHand = "hand1";
    winnerRank = hand1Rank;
  } else if (hand1Rank.rank < hand2Rank.rank) {
    winnerHand = "hand2";
    winnerRank = hand2Rank;
  } else {
    // Resuelve empate basado en la carta más alta
    ({ winnerHand, winnerRank } = resolveTie(hand1Rank, hand2Rank));
  }

  return pokerDTO.createResponse(winnerHand, winnerRank);
};

const resolveTie = (hand1Rank, hand2Rank) => {
  const sortedHand1 = hand1Rank.composition.sort(
    (a, b) => valueRank[b.slice(0, -1)] - valueRank[a.slice(0, -1)]
  );
  const sortedHand2 = hand2Rank.composition.sort(
    (a, b) => valueRank[b.slice(0, -1)] - valueRank[a.slice(0, -1)]
  );

  for (let i = 0; i < sortedHand1.length; i++) {
    const value1 = valueRank[sortedHand1[i].slice(0, -1)];
    const value2 = valueRank[sortedHand2[i].slice(0, -1)];

    if (value1 > value2) {
      return { winnerHand: "hand1", winnerRank: hand1Rank };
    } else if (value1 < value2) {
      return { winnerHand: "hand2", winnerRank: hand2Rank };
    }
  }

  return { winnerHand: null, winnerRank: null };
};

module.exports = {
  compareHands,
};
