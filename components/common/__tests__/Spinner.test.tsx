import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Spinner from '../Spinner'

describe('Spinner', () => {
	it('exposes a status role with an accessible name', () => {
		render(<Spinner label="Uploading" />)

		expect(screen.getByRole('status', { name: 'Uploading' })).toBeInTheDocument()
	})

	it('applies the animation classes and any custom className', () => {
		const { container } = render(<Spinner className="custom-spinner" />)

		expect(container.querySelector('svg')).toHaveClass('spinner', 'custom-spinner')
		expect(container.querySelector('circle')).toHaveClass('path')
	})

	it('honours a custom size', () => {
		render(<Spinner size="2rem" />)

		expect(screen.getByRole('status')).toHaveStyle({ width: '2rem', height: '2rem' })
	})
})
