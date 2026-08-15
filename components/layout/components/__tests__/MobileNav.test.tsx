import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import MobileNav from '../MobileNav'

jest.mock('next/router', () => ({
	useRouter: () => ({ pathname: '/youtube-to-mp3' }),
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

		expect(screen.getByRole('link', { name: /youtube to mp3/i })).toHaveAttribute('aria-current', 'page')
	})

	it('closes when a destination is chosen', async () => {
		const user = userEvent.setup()
		render(<MobileNav open onClose={onClose} />)

		await user.click(screen.getByRole('link', { name: /caption generator/i }))

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
