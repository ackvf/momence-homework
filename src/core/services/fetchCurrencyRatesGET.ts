export interface CurrencyRate {
	/** e.g. Australia */
	country: string
	/** e.g. dollar */
	currency: string
	/** e.g. 1 | 100 */
	amount: number
	/** e.g. AUD */
	code: string
	/** Rate is in CZK, e.g. 13.772 */
	rate: number
}

/**
 * ČNB currency rates
 *
 * Swagger: https://api.cnb.cz/cnbapi/swagger-ui.html#/%2Fexrates/dailyUsingGET_1
 * TXT: https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt
 * FAQ: https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/
 *
 * note: There is a problem with CORS when accessing the API, so this doesn't work in the browser.
 * We use a CORS proxy to access the GET endpoint.
 */

export async function fetchCurrencyRatesGET(): Promise<Array<CurrencyRate>> {
	/**
	 * Response looks like this:
	 *
	 * @example
	 * {
	 *   "rates": [
	 *     {
	 *       "validFor": "2025-09-15",
	 *       "order": 179,
	 *       "country": "Australia",
	 *       "currency": "dollar",
	 *       "amount": 1,
	 *       "currencyCode": "AUD",
	 *       "rate": 13.772,
	 *     },
	 *     ...
	 *   ]
	 * }
	 */
	const response = await fetch('https://corsproxy.io/?https://api.cnb.cz/cnbapi/exrates/daily?lang=EN')
	const data: CurrencyRateResponse = await response.json()

	return data.rates.map(item => ({
		country: item.country,
		currency: item.currency,
		amount: item.amount,
		code: item.currencyCode,
		rate: item.rate,
	}))
}

export default fetchCurrencyRatesGET

interface CurrencyRateResponse {
	rates: Array<{
		/** e.g. "2025-09-15" */
		validFor: string
		/** e.g. 179 */
		order: number
		/** e.g. "Australia" */
		country: string
		/** e.g. "dollar" */
		currency: string
		/** e.g. 1 | 100 */
		amount: number
		/** e.g. "AUD" */
		currencyCode: string
		/** e.g. 13.772 */
		rate: number
	}>
}
