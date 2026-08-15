import { forwardRef, InputHTMLAttributes, useId } from 'react'
import cn from 'classnames'

import classes from './styles/Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	hint?: string
	error?: string
	containerClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, hint, error, containerClassName, className, id, ...rest }, ref) => {
		const generatedId = useId()
		const inputId = id ?? generatedId
		const messageId = `${inputId}-message`
		const message = error ?? hint

		return (
			<div className={cn(classes.field, containerClassName)}>
				{label ? (
					<label className={classes.label} htmlFor={inputId}>
						{label}
					</label>
				) : null}
				<input
					ref={ref}
					id={inputId}
					className={cn(classes.input, error && classes.invalid, className)}
					aria-invalid={error ? true : undefined}
					aria-describedby={message ? messageId : undefined}
					{...rest}
				/>
				{message ? (
					<p
						id={messageId}
						className={cn(classes.message, error && classes.errorMessage)}
						role={error ? 'alert' : undefined}
					>
						{message}
					</p>
				) : null}
			</div>
		)
	},
)

Input.displayName = 'Input'

export default Input
