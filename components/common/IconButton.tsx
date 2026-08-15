import { ButtonHTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

import classes from './styles/IconButton.module.scss'

export type IconButtonVariant = 'ghost' | 'outlined'
export type IconButtonSize = 'sm' | 'md' | 'lg'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	variant?: IconButtonVariant
	size?: IconButtonSize
}

const IconButton = ({
	children,
	variant = 'ghost',
	size = 'md',
	className,
	type = 'button',
	...rest
}: IconButtonProps): JSX.Element => {
	return (
		<button type={type} className={cn(classes.button, classes[variant], classes[size], className)} {...rest}>
			{children}
		</button>
	)
}

export default IconButton
