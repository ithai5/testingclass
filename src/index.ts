import express, { Application, Request } from "express"
import { Currency } from "./Entity/Currency"

const app: Application = express()
const port = 9000

app.get("/", (req, res) => {
  res.send("hello world")
})
app.get("/currency", async (req: Request<{}, {}, RequestCurrency>, res) => {
  try {
    const currency = new Currency(req.query.fromCurrency + "")
    const result = await currency
      .getConvertValue(new Currency(req.query.toCurrency + ""))
      .then((response) => response.value)
    res.json({ value: result })
  } catch (error) {
    const result = error as unknown as Error
    res.json({ error: result.message })
  }
})

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`)
})

interface RequestCurrency {
  fromCurrency: string
  toCurrency: string
}
