import { render, screen, fireEvent } from '@testing-library/react'
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
		const customClass = 'custom-class'
		render(
			<IconButton className={customClass}>
				<span>Test Icon</span>
			</IconButton>,
		)

		const button = screen.getByRole('button')
		expect(button).toHaveClass(customClass)
	})

	it('calls onClick handler when clicked', () => {
		const handleClick = jest.fn()
		render(
			<IconButton onClick={handleClick}>
				<span>Test Icon</span>
			</IconButton>,
		)

		const button = screen.getByRole('button')
		fireEvent.click(button)
		expect(handleClick).toHaveBeenCalledTimes(1)
	})
})
