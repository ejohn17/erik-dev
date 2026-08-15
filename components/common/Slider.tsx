import { ChangeEvent, KeyboardEvent, PointerEvent } from 'react'
import cn from 'classnames'

import classes from './styles/Slider.module.scss'

interface SliderProps {
	value: number
	onChange: (value: number) => void
	onChangeCommitted?: (value: number) => void
	min?: number
	max?: number
	step?: number
	/** Renders the flat, edge-to-edge variant used for video scrubbing. */
	progressBar?: boolean
	disabled?: boolean
	ariaLabel?: string
	ariaValueText?: string
	className?: string
	dataTestId?: string
}

const Slider = ({
	value,
	onChange,
	onChangeCommitted,
	min = 0,
	max = 100,
	step = 1,
	progressBar = false,
	disabled = false,
	ariaLabel,
	ariaValueText,
	className,
	dataTestId,
}: SliderProps): JSX.Element => {
	const safeValue = Number.isFinite(value) ? Math.min(Math.max(value, min), max) : min
	const percent = max === min ? 0 : ((safeValue - min) / (max - min)) * 100

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(Number(event.currentTarget.value))

	const commit = (event: PointerEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) => {
		onChangeCommitted?.(Number(event.currentTarget.value))
	}

	return (
		<div className={cn(classes.root, progressBar && classes.progressBar, disabled && classes.disabled, className)}>
			<span className={classes.fill} style={{ width: `${percent}%` }} aria-hidden />
			<input
				type="range"
				className={classes.input}
				min={min}
				max={max}
				step={step}
				value={safeValue}
				disabled={disabled}
				onChange={handleChange}
				onPointerUp={onChangeCommitted ? commit : undefined}
				onKeyUp={onChangeCommitted ? commit : undefined}
				aria-label={ariaLabel}
				aria-valuetext={ariaValueText}
				data-testid={dataTestId}
			/>
		</div>
	)
}

export default Slider
