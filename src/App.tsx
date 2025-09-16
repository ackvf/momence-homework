import { useReducer } from 'react'
import styled from 'styled-components'

import { useCurrencyRates } from '@/core/services/useCurrencyRates'
import { highlight, match } from '@/core/utils'
import { Card, Hint, Input } from '@/ui'

import './App.css'


function App() {
	const { data: rates = [], isLoading, error } = useCurrencyRates()

	const [amount, setAmount] = useReducer((_, onChange: React.ChangeEvent<HTMLInputElement>) => Number(onChange.target.value), 0)
	const [search, setSearch] = useReducer((_, onChange: React.ChangeEvent<HTMLInputElement>) => onChange.target.value, '')

	const filtered = rates.filter(rate => match(rate, search))

	return (
		<>
			<div>
				<a className="alogo" href="https://qwerty.xyz" target="_blank">
					<img src="https://qwerty.xyz/favicon.png" className="logo spin" alt="Qwerty.xyz logo" />
					<img src="https://qwerty.xyz/favicon.png" className="logo static" alt="Qwerty.xyz logo" />
				</a>
			</div>
			<h1>Currency converter</h1>
			<Card>
				<Input type="number" value={amount || ''} onChange={setAmount} placeholder='Enter amount' />
				<Input type="text" value={search} onChange={setSearch} placeholder='Search currency' />
				<Hint>
					Enter amount and filter a currency from the list below <i>(fulltext)</i>.
				</Hint>
				<p>
					{filtered[0] && amount && search && `${amount} ${filtered[0].code} = ${(amount * filtered[0].rate / filtered[0].amount).toFixed(2)} CZK` || ' '}
				</p>
			</Card>
			<Card>
				{isLoading && <p>Loading currency rates...</p>}
				{error && <p style={{ color: 'red' }}>{error instanceof Error ? error.message : String(error)}</p>}
				{!isLoading && !error && (
					<List>
						{filtered
							.map(rate => (
								<li key={rate.code} >
									<span><strong>{highlight(rate.code, search)}</strong> ({highlight(rate.country, search)}, {highlight(rate.currency, search)}): <strong>{rate.rate}</strong> CZK for {rate.amount} {rate.code}</span>
									{amount && <span className="converted">{amount && `= ${(amount * rate.rate / rate.amount).toFixed(2)} CZK`}</span> || null}
								</li>
							))}
					</List>
				)}
			</Card>
		</>
	)
}

export default App

const List = styled.ul`
  text-align: left;
  height: 300px;
  overflow-y: auto;
  margin: 1em auto;
  padding: 0;

	li {
		margin-bottom: 0.5em;
		list-style: none;

		.converted {
			float: right;
			text-align: right;
		}
	}
`
