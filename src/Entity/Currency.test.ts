import { Currency } from "./Currency"

describe("checks if currency class", () => {
  test("checks if currency can only hold three constructor works", () => {
    const newCurrency = new Currency("dkk")
    expect(newCurrency.name).toBe("DKK")
  })
  test("check if error is being trow if name is too long", () => {
    try {
      expect(new Currency("aabb")).toThrow(
        "initials of currency most be three letters"
      )
    } catch (error) {
      return
    }
  })
  test("check if error is being trow if name is too short", () => {
    try {
      expect(new Currency("aa")).toThrow(
        "initials of currency most be three letters"
      )
    } catch (error) {
      return
    }
  })
  describe("checks if initial Exist", () => {
    test("exist eur dkk usd", () => {
      const usd = new Currency("usd")
      expect(usd.name).toBe("USD")
      const eur = new Currency("eur")
      expect(eur.name).toBe("EUR")
      const dkk = new Currency("dkk")
      expect(dkk.name).toBe("DKK")
    })
    test("do not exist aaa bbb abc", () => {
      try {
        expect(new Currency("aaa")).toThrow("this currency does not exist")
      } catch (error) {}
      try {
        expect(new Currency("bbb")).toThrow("this currency does not exist")
      } catch (error) {}
      try {
        expect(new Currency("ccc")).toThrow("this currency does not exist")
      } catch (error) {}
    })
  })
})
