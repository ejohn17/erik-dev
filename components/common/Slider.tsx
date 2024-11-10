import classes from './styles/Slider.module.scss'

import cn from 'classnames'

interface SliderProps {
	value: number
	progressBar?: boolean
	className?: string
	onChange: (val: number) => void
	onChangeComitted?: (val: number) => void
	dataTestId?: string
}

const Slider = ({
	value,
	className,
	progressBar,
	onChange,
	onChangeComitted,
	dataTestId,
}: SliderProps): JSX.Element => {
	return (
		<div className={cn(classes.slideContainer, className)}>
			<span
				className={cn(classes.progress, progressBar ? classes.progressBar : '')}
				style={{ width: `${(value ? value / 100 : 0) * 100}%` }}
			/>
			<input
				type="range"
				min="0"
				max="100"
				value={value ?? 0}
				className={cn(classes.slider, progressBar ? classes.progressBar : '')}
				onInput={(e: React.MouseEvent<HTMLInputElement>) => onChange(parseInt(e.currentTarget.value))}
				onMouseUp={
					onChangeComitted
						? (e: React.MouseEvent<HTMLInputElement>) => onChangeComitted(parseInt(e.currentTarget.value))
						: undefined
				}
				data-testid={dataTestId}
				role="slider"
			/>
		</div>
	)
}

export default Slider
