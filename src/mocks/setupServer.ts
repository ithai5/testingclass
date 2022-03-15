import { setupServer } from "msw/node"
import { rest } from "msw"
import { currencyData } from "./CurrencyData"

export const server = setupServer(
  rest.get("https://api.currencyapi.com/v3/latest", (req, res, context) => {
    if (req.url.searchParams.get("apikey") !== process.env.apiKey)
      return res(context.status(404))
    switch (req.url.searchParams.get("base_currency")?.toUpperCase()) {
      case "EUR":
        return res(context.json(currencyData.EUR))
      case "USD":
        return res(context.json(currencyData.USD))
      case "DKK":
        return res(context.json(currencyData.DKK))
      default:
        return res(
          context.status(422),
          context.json({
            message: "The selected base currency is invalid.",
            errors: {
              base_currency: ["The selected base currency is invalid."],
            },
          })
        )
    }
  })
)
