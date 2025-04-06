// Preços base por rank de destino
export const basePrices = {
  Silver: 29,
  Gold: 49,
  Platinum: 79,
  Diamond: 129,
  Master: 199,
};

// Multiplicadores de preço por região
export const regionMultipliers = {
  "North America (NA)": 1.0,
  "South America (SA)": 0.9,
  "Europe (EU)": 1.1,
  "Asia": 1.2,
};

// Multiplicadores por modo de boost
export const modeMultipliers = {
  "self-piloted": 1.0,
  "duo": 1.5, // Duo boost é 50% mais caro
};

// Preços dos addons
export const addonPrices = {
  "offline": 10,
  "livestream": 15,
  "priority": 20,
  "coaching": 30,
};

// Ranks com seus pesos para cálculo
export const rankWeights = {
  "Bronze": 0,
  "Silver": 1,
  "Gold": 2,
  "Platinum": 3,
  "Diamond": 4,
  "Master": 5,
};

// Taxa adicional por campeão selecionado
export const championFee = 5;

// Função para calcular o preço com base nas seleções do usuário
export const calculatePrice = (
  region: string,
  boostMode: string,
  currentRank: string,
  desiredRank: string,
  selectedChampions: string[],
  selectedAddons: string[]
): { basePrice: number; addonsPrice: number; totalPrice: number } | null => {
  if (!region || !boostMode || !currentRank || !desiredRank) {
    return null;
  }

  // Conversão de ranks para valores numéricos
  const currentRankValue = rankWeights[currentRank as keyof typeof rankWeights];
  const desiredRankValue = rankWeights[desiredRank as keyof typeof rankWeights];

  // Se o rank desejado for menor que o atual, ou iguais, retorna nulo
  if (desiredRankValue <= currentRankValue) {
    return null;
  }

  // Preço base do boost para o rank desejado
  let basePrice = basePrices[desiredRank as keyof typeof basePrices];

  // Ajuste baseado na diferença entre rank atual e desejado
  // Se a diferença for maior, o preço é ajustado proporcionalmente
  const rankDifference = desiredRankValue - currentRankValue;
  basePrice = basePrice * (rankDifference / desiredRankValue);

  // Aplicar multiplicador de região
  basePrice *= regionMultipliers[region as keyof typeof regionMultipliers];

  // Aplicar multiplicador de modo de boost
  basePrice *= modeMultipliers[boostMode as keyof typeof modeMultipliers];

  // Adicionar taxa por campeão selecionado
  basePrice += selectedChampions.length * championFee;

  // Calcular o total dos addons
  const addonsPrice = selectedAddons.reduce(
    (total, addonId) => total + addonPrices[addonId as keyof typeof addonPrices],
    0
  );

  // Preço total
  const totalPrice = basePrice + addonsPrice;

  return {
    basePrice: Math.round(basePrice),
    addonsPrice,
    totalPrice: Math.round(totalPrice),
  };
}; 