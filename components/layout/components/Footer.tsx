import Link from 'next/link'

import navigation, { CONTACT_EMAIL, RESUME_PATH } from '../navigation'

import classes from './styles/Footer.module.scss'

const Footer = (): JSX.Element => {
	return (
		<footer className={classes.footer}>
			<div className={classes.inner}>
				<div className={classes.brand}>
					<p className={classes.name}>Erik Johnston</p>
					<p className={classes.tagline}>Full-stack developer building scalable SaaS products.</p>
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
					<a className={classes.link} href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
						Resume
					</a>
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
