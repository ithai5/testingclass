import { ApiCurrencyData } from "./ApiCurrencyData";

export interface ApiCurrencyResponse {
  meta: {
    last_updated_at: string;
  };
  data: ApiCurrencyData;
}
