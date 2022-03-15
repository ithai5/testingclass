import { Currency } from "../../Entity/Currency"
import axios from "axios"
import { ApiCurrencyResponse } from "../../Entity/ApiCurrencyResponse"

export function getCurrencyRates(
  currency: Currency
): Promise<ApiCurrencyResponse> {
  return axios({
    method: "GET",
    url: `https://api.currencyapi.com/v3/latest?apikey=${process.env.apiKey}&base_currency=${currency.name}`,
  })
    .then((response) => response.data)
    .catch((error) => console.log(error))
}
