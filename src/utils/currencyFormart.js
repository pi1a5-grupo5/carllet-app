export const currencyFormat = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);


export const toFloat = (value, currency = ' ') => {
  const removeCurrency = value.replace(currency, '');
  const newValue = removeCurrency.replace(/\./g, '').replace(',', '.');

  return parseFloat(newValue);
};

