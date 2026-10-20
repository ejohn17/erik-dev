import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import MobileNav from '../MobileNav'

jest.mock('next/router', () => ({
	useRouter: () => ({ pathname: '/projects/bubbas-closet' }),
}))

describe('MobileNav', () => {
	const onClose = jest.fn()
	// jsdom cannot follow links, so stop them before they warn about navigation.
	const swallowNavigation = (event: MouseEvent) => event.preventDefault()

	beforeEach(() => {
		jest.clearAllMocks()
		document.addEventListener('click', swallowNavigation)
	})

	afterEach(() => {
		document.removeEventListener('click', swallowNavigation)
	})

	it('hides the drawer from assistive tech while closed', () => {
		render(<MobileNav open={false} onClose={onClose} />)

		expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('aria-hidden', 'true')
	})

	it('marks the active route', () => {
		render(<MobileNav open onClose={onClose} />)

		expect(screen.getByRole('link', { name: /^projects/i })).toHaveAttribute('aria-current', 'page')
	})

	it('offers resume, LinkedIn, GitHub and email links', () => {
		render(<MobileNav open onClose={onClose} />)

		expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute('href', '/files/resume.pdf')
		expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
		expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
		expect(screen.getByRole('link', { name: /johnstonerik17@gmail.com/i })).toBeInTheDocument()
	})

	it('closes when a destination is chosen', async () => {
		const user = userEvent.setup()
		render(<MobileNav open onClose={onClose} />)

		await user.click(screen.getByRole('link', { name: /^experience/i }))

		expect(onClose).toHaveBeenCalledTimes(1)
	})

	it('closes on escape', async () => {
		const user = userEvent.setup()
		render(<MobileNav open onClose={onClose} />)

		await user.keyboard('{Escape}')

		expect(onClose).toHaveBeenCalledTimes(1)
	})

	it('locks page scrolling while open', () => {
		const { rerender } = render(<MobileNav open onClose={onClose} />)
		expect(document.body.style.overflow).toBe('hidden')

		rerender(<MobileNav open={false} onClose={onClose} />)
		expect(document.body.style.overflow).toBe('')
	})
})
