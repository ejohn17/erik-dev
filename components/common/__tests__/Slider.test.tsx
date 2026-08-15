import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Slider from '../Slider'

describe('Slider', () => {
	const onChange = jest.fn()
	const onChangeCommitted = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders the current value', () => {
		render(<Slider value={50} onChange={onChange} ariaLabel="Volume" />)

		const slider = screen.getByRole('slider', { name: 'Volume' })
		expect(slider).toHaveValue('50')
	})

	it('applies a custom className to the root', () => {
		render(<Slider value={50} onChange={onChange} className="custom-class" />)

		expect(screen.getByRole('slider').parentElement).toHaveClass('custom-class')
	})

	it('supports the progress bar variant', () => {
		render(<Slider value={50} onChange={onChange} progressBar />)

		expect(screen.getByRole('slider').parentElement).toHaveClass('progressBar')
	})

	it('calls onChange as the value changes', () => {
		render(<Slider value={50} onChange={onChange} />)

		fireEvent.change(screen.getByRole('slider'), { target: { value: '75' } })

		expect(onChange).toHaveBeenCalledWith(75)
	})

	it('commits the value when the pointer is released', () => {
		render(<Slider value={75} onChange={onChange} onChangeCommitted={onChangeCommitted} />)

		fireEvent.pointerUp(screen.getByRole('slider'))

		expect(onChangeCommitted).toHaveBeenCalledWith(75)
	})

	it('clamps values that fall outside the range', () => {
		render(<Slider value={140} onChange={onChange} />)

		expect(screen.getByRole('slider')).toHaveValue('100')
	})

	it('falls back to the minimum for a non finite value', () => {
		render(<Slider value={NaN} onChange={onChange} />)

		expect(screen.getByRole('slider')).toHaveValue('0')
	})
})
