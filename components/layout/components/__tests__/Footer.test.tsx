import { render, screen } from '@testing-library/react'

import Footer from '../Footer'

describe('Footer', () => {
	beforeEach(() => {
		render(<Footer />)
	})

	it('links to GitHub, LinkedIn, email and the resume', () => {
		expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/ejohn17')
		expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
			'href',
			'https://www.linkedin.com/in/erik-johnston-842225175/',
		)
		expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:johnstonerik17@gmail.com')
		expect(screen.getByRole('link', { name: /Resume/ })).toHaveAttribute('href', '/files/resume.pdf')
	})

	it('keeps the caption generator under Experiments', () => {
		expect(screen.getByText('Experiments')).toBeInTheDocument()
		expect(screen.getByRole('link', { name: 'Caption Generator' })).toHaveAttribute('href', '/caption-generator')
	})
})
