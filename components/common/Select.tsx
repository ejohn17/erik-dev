import classes from './styles/Slider.module.scss'

import cn from 'classnames'

interface SliderProps {
	value: string
	options: {
		value: string
		label: string
	}[]
}

const Slider = ({ options }: SliderProps): JSX.Element => {
	return (
		<select>
			{options.map((option, idx) => {
				return (
					<option key={idx} value={option.value}>
						{option.label}
					</option>
				)
			})}
		</select>
	)
}

export default Slider
