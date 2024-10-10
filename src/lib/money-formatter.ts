const moneyFormatterBRL = Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  const moneyFormatterUSD = Intl.NumberFormat("en-US", {
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  export const moneyFormatters = {
    "pt_BR": moneyFormatterBRL,
    "en_US": moneyFormatterUSD,
  };
  