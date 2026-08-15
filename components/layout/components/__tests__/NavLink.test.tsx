import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import NavLink from '../NavLink'

describe('NavLink', () => {
	it('renders a link to the given path', () => {
		render(
			<NavLink href="/youtube-to-mp3" active={false}>
				Youtube to Mp3
			</NavLink>,
		)

		const link = screen.getByRole('link', { name: 'Youtube to Mp3' })
		expect(link).toHaveAttribute('href', '/youtube-to-mp3')
		expect(link).not.toHaveAttribute('aria-current')
	})

	it('flags the active page', () => {
		render(
			<NavLink href="/" active>
				Home
			</NavLink>,
		)

		expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
	})

	it('notifies on click', async () => {
		const user = userEvent.setup()
		const onClick = jest.fn()
		render(
			<NavLink href="/" active={false} onClick={onClick}>
				Home
			</NavLink>,
		)

		await user.click(screen.getByRole('link', { name: 'Home' }))

		expect(onClick).toHaveBeenCalledTimes(1)
	})
})
