import { render, screen, fireEvent } from '@testing-library/react'
import Layout from '../Layout'
import '@testing-library/jest-dom'

describe('Layout Component', () => {
	const mockChildren = <div data-testid="mock-children">Test Content</div>

	it('renders children correctly', () => {
		render(<Layout>{mockChildren}</Layout>)
		expect(screen.getByTestId('mock-children')).toBeInTheDocument()
	})
})
