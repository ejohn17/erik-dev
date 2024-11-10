import { render, screen, fireEvent } from '@testing-library/react'
import Select from '../Select'

describe('Select Component', () => {
	const mockOptions = [
		{ value: 'en', label: 'English' },
		{ value: 'es', label: 'Spanish' },
		{ value: 'fr', label: 'French' },
	]
	const mockOnSelect = jest.fn()

	beforeEach(() => {
		mockOnSelect.mockClear()
	})

	it('renders without crashing', () => {
		render(<Select value="" options={mockOptions} onSelect={mockOnSelect} className="test-class" />)
		expect(screen.getByRole('combobox')).toBeInTheDocument()
	})

	it('displays default placeholder option', () => {
		render(<Select value="" options={mockOptions} onSelect={mockOnSelect} className="test-class" />)
		expect(screen.getByText('Please a language')).toBeInTheDocument()
	})

	it('renders all options correctly', () => {
		render(<Select value="" options={mockOptions} onSelect={mockOnSelect} className="test-class" />)
		mockOptions.forEach((option) => {
			expect(screen.getByText(option.label)).toBeInTheDocument()
		})
	})

	it('calls onSelect with correct value when option is selected', () => {
		render(<Select value="" options={mockOptions} onSelect={mockOnSelect} className="test-class" />)

		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: 'es' },
		})

		expect(mockOnSelect).toHaveBeenCalledWith('es')
	})
})
