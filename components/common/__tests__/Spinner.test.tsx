import { render } from '@testing-library/react'
import Spinner from '../Spinner'

describe('Spinner', () => {
	it('renders correctly with custom className', () => {
		const customClass = 'custom-spinner'
		const { container } = render(<Spinner className={customClass} />)

		// Check if SVG element exists
		const svg = container.querySelector('svg')
		expect(svg).toBeInTheDocument()

		// Check if circle element exists and has the custom class
		const circle = container.querySelector('circle')
		expect(circle).toBeInTheDocument()
		expect(circle).toHaveClass(customClass)
	})

	it('maintains default spinner styling', () => {
		const { container } = render(<Spinner className="custom-class" />)

		// Check if SVG has the default spinner class
		const svg = container.querySelector('svg')
		expect(svg).toHaveClass('spinner')

		// Check if circle has the default path class
		const circle = container.querySelector('circle')
		expect(circle).toHaveClass('path')
	})
})
