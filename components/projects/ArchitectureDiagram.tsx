import { Fragment } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'

import { ArchitectureFlow } from 'content/projects'

import classes from './styles/ArchitectureDiagram.module.scss'

interface ArchitectureDiagramProps {
	flows: ArchitectureFlow[]
}

const ArchitectureDiagram = ({ flows }: ArchitectureDiagramProps): JSX.Element => {
	return (
		<div className={classes.diagram}>
			{flows.map(({ label, steps }) => (
				<figure key={label} className={classes.flow}>
					<figcaption className={classes.label}>{label}</figcaption>
					<ol className={classes.steps}>
						{steps.map((step, index) => (
							<Fragment key={step}>
								{index > 0 ? (
									<li className={classes.arrow} aria-hidden>
										<IoIosArrowRoundForward />
									</li>
								) : null}
								<li className={classes.step}>{step}</li>
							</Fragment>
						))}
					</ol>
				</figure>
			))}
		</div>
	)
}

export default ArchitectureDiagram
