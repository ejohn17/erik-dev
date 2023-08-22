import classes from './styles/Spinner.module.scss'
import cn from 'classnames'

interface SpinnerProps {
	className: string
}

const Spinner = ({ className }: SpinnerProps): JSX.Element => {
	return (
		<svg className={classes.spinner} viewBox="0 0 50 50">
			<circle className={cn(classes.path, className)} cx="25" cy="25" r="20" strokeWidth="3"></circle>
		</svg>
	)
}

export default Spinner
