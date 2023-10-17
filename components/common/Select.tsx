import classes from './styles/Slider.module.scss'

import cn from 'classnames'

interface SliderProps {
	value: string
	options: {
		value: string
		label: string
	}[]
	onSelect: (value: string) => void
	className: string
}

const Slider = ({ options, onSelect, className }: SliderProps): JSX.Element => {
	return (
		<div>
			<select onChange={(e) => onSelect(e.currentTarget.value)}>
				<option>Please a language</option>
				{options.map((option, idx) => {
					return (
						<option key={idx} value={option.value}>
							{option.label}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default Slider
