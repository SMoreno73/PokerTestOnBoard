function rankHand(hand) {
  // Paso 1: Parsear la mano
  const cardArray = hand.split(" "); // Divide la cadena en cartas individuales
  const values = cardArray.map((card) => card.slice(0, -1)); // Extrae valores
  const suits = cardArray.map((card) => card.slice(-1)); // Extrae palos

  // Función para obtener el valor numérico de una carta
  const valueRank = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  // Ordenar cartas por valor
  const sortedValues = values
    .map((val) => valueRank[val])
    .sort((a, b) => a - b);

  // Función para contar ocurrencias de valores y palos
  const countOccurrences = (arr) => {
    return arr.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  };

  const valueCount = countOccurrences(values);
  const suitCount = countOccurrences(suits);

  // Paso 2: Clasificar la mano
  const isFlush = Object.keys(suitCount).length === 1; // Todos los palos son iguales
  const isStraight = sortedValues.every(
    (val, index) => val === sortedValues[0] + index
  );
  const valueFrequency = Object.values(valueCount).sort((a, b) => b - a);

  // Paso 3: Determinar el tipo de mano
  let handType = "";
  let rank = 0;

  if (isStraight && isFlush) {
    if (sortedValues[0] === 10 && sortedValues[4] === 14) {
      handType = "RoyalFlush";
      rank = 9;
    } else {
      handType = "StraightFlush";
      rank = 8;
    }
  } else if (valueFrequency[0] === 4) {
    handType = "FourOfAKind";
    rank = 7;
  } else if (valueFrequency[0] === 3 && valueFrequency[1] === 2) {
    handType = "FullHouse";
    rank = 6;
  } else if (isFlush) {
    handType = "Flush";
    rank = 5;
  } else if (isStraight) {
    handType = "Straight";
    rank = 4;
  } else if (valueFrequency[0] === 3) {
    handType = "ThreeOfAKind";
    rank = 3;
  } else if (valueFrequency[0] === 2 && valueFrequency[1] === 2) {
    handType = "Two Pair";
    rank = 2;
  } else if (valueFrequency[0] === 2) {
    handType = "OnePair";
    rank = 1;
  } else {
    handType = "HighCard";
    rank = 0;
  }

  // Paso 4: Construir la respuesta
  const composition = cardArray.sort((a, b) => {
    return valueRank[b.slice(0, -1)] - valueRank[a.slice(0, -1)];
  });

  return {
    type: handType,
    rank: rank,
    composition: composition,
  };
}

module.exports = {
  rankHand,
};
