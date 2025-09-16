import type { CurrencyRate } from '@/core/services/useCurrencyRates'
import { Highlighted } from '@/ui'

/** Check if a rate matches the search string. */
export function match(rate: CurrencyRate, search: string): boolean {
	const s = search.toLowerCase()
	if (!s) return true
	return (
		rate.code.toLowerCase().includes(s) ||
		rate.country.toLowerCase().includes(s) ||
		rate.currency.toLowerCase().includes(s)
	)
}

/** Wrap a matching text fragment in a span to apply css highlight. */
export function highlight(text: string, search: string): React.ReactNode {
	if (!search) return text
	const regex = new RegExp(`(${search.replace(/[^\w ]/g, '')})`, 'gi')
	const parts = text.split(regex)
	return parts.map(part =>
		regex.test(part)
			? <Highlighted>{part}</Highlighted>
			: part
	)
}
