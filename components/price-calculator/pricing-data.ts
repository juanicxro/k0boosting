// Preços base por rank de destino
export const basePrices = {
  Bronze: 19,
  Silver: 29,
  Gold: 49,
  Platinum: 79,
  Diamond: 129,
  Master: 199,
};

// Divisões por rank (5, 4, 3, 2, 1) - em ordem decrescente
export const rankDivisions = [5, 4, 3, 2, 1];

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

  // Para simplificar, vamos considerar que os ranks possuem divisões (ex: Bronze 5, Bronze 4, etc.)
  // A estrutura será "Rank Divisão" (ex: "Bronze 5", "Silver 2")
  const [currentRankName, currentDivStr] = currentRank.split(' ');
  const [desiredRankName, desiredDivStr] = desiredRank.split(' ');

  // Se não houver divisão especificada, usamos a mais baixa do rank atual (5) e a mais alta do rank desejado (1)
  const currentDiv = currentDivStr ? parseInt(currentDivStr) : 5;
  const desiredDiv = desiredDivStr ? parseInt(desiredDivStr) : 1;

  // Conversão de ranks para valores numéricos
  const currentRankValue = rankWeights[currentRankName as keyof typeof rankWeights];
  const desiredRankValue = rankWeights[desiredRankName as keyof typeof rankWeights];

  // Se o rank desejado for menor que o atual, retorna nulo
  if (desiredRankValue < currentRankValue) {
    return null;
  }
  // Se os ranks forem iguais, verifica as divisões
  else if (desiredRankValue === currentRankValue && desiredDiv >= currentDiv) {
    return null;
  }

  // Preço base do boost para o rank desejado
  let basePrice = basePrices[desiredRankName as keyof typeof basePrices];

  // Calcular o total de divisões entre o rank atual e o desejado
  let totalDivisions = 0;

  // Se forem ranks diferentes
  if (currentRankValue !== desiredRankValue) {
    // Adiciona as divisões restantes do rank atual
    totalDivisions += currentDiv - 1;
    
    // Adiciona as divisões completas dos ranks intermediários
    for (let i = currentRankValue + 1; i < desiredRankValue; i++) {
      totalDivisions += 5; // 5 divisões por rank
    }
    
    // Adiciona as divisões do rank desejado
    totalDivisions += 5 - desiredDiv;
  } else {
    // Se for o mesmo rank, calculamos apenas a diferença entre as divisões
    totalDivisions = currentDiv - desiredDiv;
  }

  // Adiciona $1 por divisão ao preço base
  basePrice += totalDivisions;

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