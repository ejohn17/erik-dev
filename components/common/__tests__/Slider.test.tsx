import { render, fireEvent, screen } from '@testing-library/react'
import Slider from '../Slider'

describe('Slider', () => {
	const mockOnChange = jest.fn()
	const mockOnChangeCommitted = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders correctly with default props', () => {
		render(<Slider value={50} onChange={mockOnChange} />)
		const slider = screen.getByRole('slider')
		expect(slider).toBeInTheDocument()
		expect(slider).toHaveValue('50')
	})

	it('applies custom className when provided', () => {
		const customClass = 'custom-class'
		render(<Slider value={50} onChange={mockOnChange} className={customClass} />)
		expect(screen.getByRole('slider').parentElement).toHaveClass(customClass)
	})

	it('shows progress bar when progressBar prop is true', () => {
		render(<Slider value={50} onChange={mockOnChange} progressBar />)
		const progressBar = screen.getByRole('slider')
		expect(progressBar).toHaveClass('progressBar')
	})

	it('calls onChange when value changes', () => {
		render(<Slider value={50} onChange={mockOnChange} />)
		const slider = screen.getByRole('slider')

		fireEvent.input(slider, { target: { value: '75' } })
		expect(mockOnChange).toHaveBeenCalledWith(75)
	})

	it('calls onChangeCommitted when mouse is released', () => {
		render(<Slider value={50} onChange={mockOnChange} onChangeComitted={mockOnChangeCommitted} />)
		const slider = screen.getByRole('slider')

		fireEvent.mouseUp(slider, { target: { value: '75' } })
		expect(mockOnChangeCommitted).toHaveBeenCalledWith(75)
	})

	it('handles null/undefined value correctly', () => {
		render(<Slider value={0} onChange={mockOnChange} />)
		const slider = screen.getByRole('slider')
		expect(slider).toHaveValue('0')
	})
})
