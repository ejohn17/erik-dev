import Link from 'next/link'

import navigation, {
	CONTACT_EMAIL,
	GITHUB_URL,
	LINKEDIN_URL,
	RESUME_PATH,
	RESUME_UPDATED,
	experiments,
} from '../navigation'

import classes from './styles/Footer.module.scss'

const Footer = (): JSX.Element => {
	return (
		<footer className={classes.footer}>
			<div className={classes.inner}>
				<div className={classes.brand}>
					<p className={classes.name}>Erik Johnston</p>
					<p className={classes.tagline}>
						Full-stack software developer in Kelowna, BC. Open to remote work across Canada.
					</p>
				</div>

				<nav className={classes.links} aria-label="Footer">
					<p className={classes.groupTitle}>Pages</p>
					{navigation.map(({ href, label }) => (
						<Link key={href} href={href} className={classes.link}>
							{label}
						</Link>
					))}
				</nav>

				<div className={classes.links}>
					<p className={classes.groupTitle}>Elsewhere</p>
					<a className={classes.link} href={`mailto:${CONTACT_EMAIL}`}>
						Email
					</a>
					<a className={classes.link} href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
						LinkedIn
					</a>
					<a className={classes.link} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
						GitHub
					</a>
					<a className={classes.link} href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
						Resume <span className={classes.meta}>&middot; {RESUME_UPDATED}</span>
					</a>
				</div>

				<div className={classes.links}>
					<p className={classes.groupTitle}>Experiments</p>
					{experiments.map(({ href, label }) => (
						<Link key={href} href={href} className={classes.link}>
							{label}
						</Link>
					))}
				</div>
			</div>

			<div className={classes.baseline}>
				<p>&copy; {new Date().getFullYear()} Erik Johnston</p>
				<p className={classes.builtWith}>Built with Next.js, TypeScript and Sass</p>
			</div>
		</footer>
	)
}

export default Footer
