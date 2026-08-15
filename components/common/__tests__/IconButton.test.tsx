import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import IconButton from '../IconButton'

describe('IconButton', () => {
	it('renders children correctly', () => {
		render(
			<IconButton>
				<span>Test Icon</span>
			</IconButton>,
		)

		expect(screen.getByText('Test Icon')).toBeInTheDocument()
	})

	it('applies custom className when provided', () => {
		render(
			<IconButton className="custom-class">
				<span>Test Icon</span>
			</IconButton>,
		)

		expect(screen.getByRole('button')).toHaveClass('custom-class')
	})

	it('calls onClick handler when clicked', async () => {
		const user = userEvent.setup()
		const handleClick = jest.fn()
		render(
			<IconButton onClick={handleClick}>
				<span>Test Icon</span>
			</IconButton>,
		)

		await user.click(screen.getByRole('button'))

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('forwards accessibility props to the button', () => {
		render(
			<IconButton aria-label="Play" aria-pressed={false} disabled>
				<span>Icon</span>
			</IconButton>,
		)

		const button = screen.getByRole('button', { name: 'Play' })
		expect(button).toBeDisabled()
		expect(button).toHaveAttribute('aria-pressed', 'false')
	})
})
