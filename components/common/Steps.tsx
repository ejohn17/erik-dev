import { ReactNode } from 'react'
import cn from 'classnames'

import { addHeadingZero } from '@/utilities/addHeadingZero'

import classes from './styles/Steps.module.scss'

interface StepsProps {
	steps: ReactNode[]
	className?: string
}

const Steps = ({ steps, className }: StepsProps): JSX.Element => {
	return (
		<ol className={cn(classes.steps, className)}>
			{steps.map((step, index) => (
				// The list is static, so the index is a stable key.
				<li key={index} className={classes.step}>
					<span className={classes.index}>{addHeadingZero(index + 1)}</span>
					<span className={classes.text}>{step}</span>
				</li>
			))}
		</ol>
	)
}

export default Steps
