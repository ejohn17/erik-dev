import cn from 'classnames'

import classes from './styles/Spinner.module.scss'

interface SpinnerProps {
	className?: string
	/** Any CSS length. Defaults to inheriting the surrounding font size. */
	size?: string | number
	label?: string
}

const Spinner = ({ className, size = '1.25em', label = 'Loading' }: SpinnerProps): JSX.Element => {
	return (
		<svg
			className={cn(classes.spinner, className)}
			style={{ width: size, height: size }}
			viewBox="0 0 50 50"
			role="status"
			aria-label={label}
		>
			<circle className={classes.path} cx="25" cy="25" r="20" strokeWidth="4" />
		</svg>
	)
}

export default Spinner
