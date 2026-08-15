import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Select from '../Select'

describe('Select', () => {
	const options = [
		{ value: 'en', label: 'English' },
		{ value: 'es', label: 'Spanish' },
		{ value: 'fr', label: 'French' },
	]
	const onChange = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('associates the label with the control', () => {
		render(<Select label="Caption language" options={options} value="en" onChange={onChange} />)

		expect(screen.getByRole('combobox', { name: 'Caption language' })).toBeInTheDocument()
	})

	it('renders every option', () => {
		render(<Select label="Caption language" options={options} value="en" onChange={onChange} />)

		options.forEach((option) => {
			expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument()
		})
	})

	it('renders a placeholder when provided', () => {
		render(<Select options={options} value="" onChange={onChange} placeholder="Select a language" />)

		expect(screen.getByRole('option', { name: 'Select a language' })).toBeDisabled()
	})

	it('reports the selected value', async () => {
		const user = userEvent.setup()
		render(<Select label="Caption language" options={options} value="en" onChange={onChange} />)

		await user.selectOptions(screen.getByRole('combobox'), 'es')

		expect(onChange).toHaveBeenCalledWith('es')
	})
})
