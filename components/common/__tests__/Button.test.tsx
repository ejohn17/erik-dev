import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Button from '../Button'

describe('Button', () => {
	it('renders a button by default and calls onClick', async () => {
		const user = userEvent.setup()
		const onClick = jest.fn()
		render(<Button onClick={onClick}>Upload</Button>)

		const button = screen.getByRole('button', { name: 'Upload' })
		expect(button).toHaveAttribute('type', 'button')

		await user.click(button)
		expect(onClick).toHaveBeenCalledTimes(1)
	})

	it('renders a link when given an href', () => {
		render(<Button href="/youtube-to-mp3">View Project</Button>)

		expect(screen.getByRole('link', { name: 'View Project' })).toHaveAttribute('href', '/youtube-to-mp3')
	})

	it('renders an external anchor for non route hrefs', () => {
		render(<Button href="mailto:hello@example.com">Get in Touch</Button>)

		expect(screen.getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', 'mailto:hello@example.com')
	})

	it('blocks interaction while loading', async () => {
		const user = userEvent.setup()
		const onClick = jest.fn()
		render(
			<Button onClick={onClick} loading>
				Download
			</Button>,
		)

		const button = screen.getByRole('button', { name: /download/i })
		expect(button).toBeDisabled()
		expect(button).toHaveAttribute('aria-busy', 'true')

		await user.click(button)
		expect(onClick).not.toHaveBeenCalled()
	})

	it('respects the disabled prop', () => {
		render(<Button disabled>Coming soon</Button>)

		expect(screen.getByRole('button', { name: 'Coming soon' })).toBeDisabled()
	})
})
