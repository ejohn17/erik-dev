import { ReactNode } from 'react'
import classes from './styles/IconButton.module.scss'

import cn from 'classnames'

interface ButtonProps {
	children: ReactNode
	onClick?: () => void
	className?: string
}

const IconButton = ({ children, onClick, className }: ButtonProps): JSX.Element => {
	return (
		<button onClick={onClick} className={cn(classes.button, className)}>
			{children}
		</button>
	)
}

export default IconButton
