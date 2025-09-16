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
 * note: There is a problem with CORS when accessing the txt file, so this doesn't work in the browser.
 */

export async function fetchCurrencyRatesTXT(): Promise<Array<CurrencyRate>> {
	/**
	 * Response looks like this:
	 *
	 * @example
	 * 15 Sep 2025 #179
	 * Country|Currency|Amount|Code|Rate
	 * Australia|dollar|1|AUD|13.772
	 * Brazil|real|1|BRL|3.875
	 */
	const response = await fetch(
		'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'
	)
	const text = await response.text()
	const lines = text.trim().split('\n')
	const dataLines = lines.slice(2)

	return dataLines.map(line => {
		const [country, currency, amount, code, rate] = line.split('|')
		return {
			country,
			currency,
			amount: Number(amount),
			code,
			rate: Number(rate),
		}
	})
}

export default fetchCurrencyRatesTXT
