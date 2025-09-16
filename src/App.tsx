import { useEffect, useState } from 'react'
import './App.css'
import { Button } from '@/ui'
import fetchCurrencyRates, { fetchCurrencyRatesTXT, type CurrencyRate } from '@/services/fetchCurrencyRatesTXT'
import fetchCurrencyRatesGET from './services/fetchCurrencyRatesGET'



function App() {
	const [count, setCount] = useState(0)

	const [rates, setRates] = useState<CurrencyRate[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetchCurrencyRatesGET()
			.then(data => {
				setRates(data)
				setLoading(false)
			})
			.catch(err => {
				setError('Failed to fetch currency rates (GET)')
				setLoading(false)
			})
	}, [])

	return (
		<>
			<div>
				<a className="alogo" href="https://qwerty.xyz" target="_blank">
					<img src="https://qwerty.xyz/favicon.png" className="logo spin" alt="Qwerty.xyz logo" />
					<img src="https://qwerty.xyz/favicon.png" className="logo static" alt="Qwerty.xyz logo" />
				</a>
			</div>
			<h1>Currency converter</h1>
			<div className="card">
				{loading && <p>Loading currency rates...</p>}
				{error && <p style={{ color: 'red' }}>{error}</p>}
				{!loading && !error && (
					<ul style={{ textAlign: 'left', maxHeight: '300px', overflowY: 'auto', margin: '1em auto', padding: 0 }}>
						{rates.map(rate => (
							<li key={rate.code} style={{ marginBottom: '0.5em', listStyle: 'none' }}>
								<strong>{rate.code}</strong> ({rate.country}, {rate.currency}): {rate.rate} CZK for {rate.amount} {rate.code}
							</li>
						))}
					</ul>
				)}
			</div>
			<div className="card">
				<Button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</Button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	)
}

export default App
