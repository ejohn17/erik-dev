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

		expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
		expect(within(nav).getByRole('link', { name: 'Youtube to Mp3' })).toHaveAttribute('href', '/youtube-to-mp3')
		expect(within(nav).getByRole('link', { name: 'Caption Generator' })).toHaveAttribute('href', '/caption-generator')
	})

	it('marks the current page in the navigation', () => {
		mockPathname.mockReturnValue('/youtube-to-mp3')
		render(<Header />)
		const nav = screen.getByRole('navigation', { name: 'Main' })

		expect(within(nav).getByRole('link', { name: 'Youtube to Mp3' })).toHaveAttribute('aria-current', 'page')
		expect(within(nav).getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
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
