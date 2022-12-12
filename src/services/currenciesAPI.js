const ALL_CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

export const fetchCurrencies = async () => {
  const request = await fetch(ALL_CURRENCIES_API);
  const response = await request.json();
  const { USDT, ...data } = response;
  return data;
};

export const fetchCurrenciesWithUSDT = async () => {
  const request = await fetch(ALL_CURRENCIES_API);
  const response = await request.json();
  return response;
};
