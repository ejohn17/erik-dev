import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Layout from '../Layout'

jest.mock('next/router', () => ({
	useRouter: () => ({ pathname: '/' }),
}))

describe('Layout', () => {
	const mockChildren = <div data-testid="mock-children">Test Content</div>

	it('renders children inside the main landmark', () => {
		render(<Layout>{mockChildren}</Layout>)

		expect(screen.getByRole('main')).toContainElement(screen.getByTestId('mock-children'))
	})

	it('renders the header and footer around the page', () => {
		render(<Layout>{mockChildren}</Layout>)

		expect(screen.getByRole('banner')).toBeInTheDocument()
		expect(screen.getByRole('contentinfo')).toBeInTheDocument()
	})

	it('offers a skip link to the main content', () => {
		render(<Layout>{mockChildren}</Layout>)

		expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main')
	})
})
