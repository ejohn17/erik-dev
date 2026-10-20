import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Header from '../Header'

const mockPathname = jest.fn(() => '/')

jest.mock('next/router', () => ({
	useRouter: () => ({ pathname: mockPathname() }),
}))

describe('Header', () => {
	beforeEach(() => {
		mockPathname.mockReturnValue('/')
	})

	it('renders every navigation destination', () => {
		render(<Header />)
		const nav = screen.getByRole('navigation', { name: 'Main' })

		expect(within(nav).getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/#experience')
		expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects')
		expect(within(nav).getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '/#skills')
		expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/#contact')
	})

	it('links to GitHub, LinkedIn and the resume', () => {
		render(<Header />)

		expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/ejohn17')
		expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
			'href',
			'https://www.linkedin.com/in/erik-johnston-842225175/',
		)
		expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute('href', '/files/resume.pdf')
	})

	it('marks Projects as current on a case study page', () => {
		mockPathname.mockReturnValue('/projects/bubbas-closet')
		render(<Header />)
		const nav = screen.getByRole('navigation', { name: 'Main' })

		expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page')
		expect(within(nav).getByRole('link', { name: 'Experience' })).not.toHaveAttribute('aria-current')
	})

	it('opens the mobile menu from the toggle', async () => {
		const user = userEvent.setup()
		render(<Header />)

		const toggle = screen.getByRole('button', { name: /open menu/i })
		expect(toggle).toHaveAttribute('aria-expanded', 'false')

		await user.click(toggle)

		expect(toggle).toHaveAttribute('aria-expanded', 'true')
		expect(screen.getByRole('dialog', { name: /site navigation/i })).toBeInTheDocument()
	})
})
