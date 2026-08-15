import { forwardRef, SelectHTMLAttributes, useId } from 'react'
import cn from 'classnames'
import { MdKeyboardArrowDown } from 'react-icons/md'

import classes from './styles/Select.module.scss'

export interface SelectOption {
	value: string
	label: string
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
	options: SelectOption[]
	onChange: (value: string) => void
	label?: string
	placeholder?: string
	containerClassName?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ options, onChange, label, placeholder, containerClassName, className, id, ...rest }, ref) => {
		const generatedId = useId()
		const selectId = id ?? generatedId

		return (
			<div className={cn(classes.field, containerClassName)}>
				{label ? (
					<label className={classes.label} htmlFor={selectId}>
						{label}
					</label>
				) : null}
				<div className={classes.control}>
					<select
						ref={ref}
						id={selectId}
						className={cn(classes.select, className)}
						onChange={(event) => onChange(event.currentTarget.value)}
						{...rest}
					>
						{placeholder ? (
							<option value="" disabled>
								{placeholder}
							</option>
						) : null}
						{options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<MdKeyboardArrowDown className={classes.chevron} aria-hidden />
				</div>
			</div>
		)
	},
)

Select.displayName = 'Select'

export default Select
