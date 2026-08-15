import { ReactNode } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'

import classes from './styles/Layout.module.scss'

interface LayoutProps {
	children: ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<div className={classes.root}>
			<a className={classes.skipLink} href="#main">
				Skip to content
			</a>
			<Header />
			<main id="main" className={classes.main}>
				{children}
			</main>
			<Footer />
		</div>
	)
}

export default Layout
