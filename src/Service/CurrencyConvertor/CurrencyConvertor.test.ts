import { server } from "../../mocks/setupServer"
import { currencyData } from "../../mocks/CurrencyData"
import { Currency } from "../../Entity/Currency"
import { getCurrencyRates } from "./CurrencyConvertor"

describe("check if receives two string and convert currency between them", () => {
  const oldEnv = process.env
  beforeAll(() => {
    process.env = { ...oldEnv }
    server.listen()
  })
  afterAll(() => server.close())
  test("function that takes two currencies and a value, and return the rate", async () => {
    process.env.apiKey = "correctApiKey"
    const currencyCalculator = await getCurrencyRates(new Currency("eur"))
    expect(currencyCalculator).toStrictEqual(currencyData.EUR)
  })
  test("checks if error is throw to wrong api key", async () => {
    process.env.apiKey = "wrongApiKey"
    try {
      const currencyCalculator = await getCurrencyRates(new Currency("eur"))
      expect(currencyCalculator).toThrowError()
    } catch (error) {}
  })
  test("checks if error is thrown if currency initials are unknown", async () => {
    process.env.apiKey = "correctApiKey"
    try {
      const currencyCalculator = await getCurrencyRates(new Currency("abc"))
      expect(currencyCalculator).toThrowError()
    } catch (error) {}
  })
  test("checks if getConvertValue return expected values (dkk to eur = 0.134417, dkk to dkk = 1 ,euro to dkk = 7.439521)", async () => {
    process.env.apiKey = "correctApiKey"
    const resultToDKK = new Currency("dkk")
    expect(
      await resultToDKK
        .getConvertValue(new Currency("eur"))
        .then((response) => response)
        .then((response) => response.value)
    ).toBe(0.134417)
    expect(
      await resultToDKK
        .getConvertValue(new Currency("dkk"))
        .then((response) => response)
        .then((response) => response.value)
    ).toBe(1)
    const resultToEur = new Currency("eur")
    expect(
      await resultToEur
        .getConvertValue(new Currency("dkk"))
        .then((response) => response)
        .then((response) => response.value)
    ).toBe(7.439521)
  })
})
