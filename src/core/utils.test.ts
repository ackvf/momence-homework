import { describe, it, expect } from 'vitest'

import type { CurrencyRate } from './services/useCurrencyRates'
import { match, highlight } from './utils'

describe('match', () => {
	const rate: CurrencyRate = {
		code: 'USD',
		country: 'United States',
		currency: 'dollar',
		amount: 1,
		rate: 20,
	}
	it('returns true for empty search', () => {
		expect(match(rate, '')).toBe(true)
	})
	it('matches code, country, or currency', () => {
		expect(match(rate, 'usd')).toBe(true)
		expect(match(rate, 'united')).toBe(true)
		expect(match(rate, 'dollar')).toBe(true)
	})
	it('returns false for non-matching search', () => {
		expect(match(rate, 'euro')).toBe(false)
	})
})

describe('highlight', () => {
	it('returns original text if search is empty', () => {
		expect(highlight('Dollar', '')).toBe('Dollar')
	})
	it('wraps matching fragment in Highlighted', () => {
		// Since highlight returns React nodes, we check the output type and content
		const result = highlight('Dollar', 'll')
		expect(Array.isArray(result)).toBe(true)
		// @ts-expect-error React node props access for test
		expect(result[1].props.children).toBe('ll')
	})
	it('is case-insensitive', () => {
		const result = highlight('Dollar', 'dol')
		// @ts-expect-error React node props access for test
		expect(result[1].props.children).toBe('Dol')
	})
})
