import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'

import { MdMenu } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import Button from 'components/common/Button'
import IconButton from 'components/common/IconButton'
import IconLink from 'components/common/IconLink'
import MobileNav from './MobileNav'
import NavLink from './NavLink'
import navigation, { GITHUB_URL, LINKEDIN_URL, RESUME_PATH, isActive } from '../navigation'

import classes from './styles/Header.module.scss'

const Header = (): JSX.Element => {
	const { pathname } = useRouter()
	const [menuOpen, setMenuOpen] = useState<boolean>(false)
	const [scrolled, setScrolled] = useState<boolean>(false)

	const closeMenu = useCallback(() => setMenuOpen(false), [])

	useEffect(() => {
		setMenuOpen(false)
	}, [pathname])

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 4)

		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<>
			<header className={cn(classes.header, scrolled && classes.scrolled)}>
				<div className={classes.inner}>
					<Link href="/" className={classes.brand}>
						<span className={classes.mark} aria-hidden>
							EJ
						</span>
						<span className={classes.brandText}>
							<span className={classes.brandName}>Erik Johnston</span>
							<span className={classes.brandRole}>Full-Stack Software Developer</span>
						</span>
					</Link>

					<nav className={classes.nav} aria-label="Main">
						{navigation.map((item) => (
							<NavLink key={item.href} href={item.href} active={isActive(item, pathname)}>
								{item.label}
							</NavLink>
						))}
					</nav>

					<div className={classes.actions}>
						<IconLink
							href={GITHUB_URL}
							aria-label="GitHub"
							className={classes.social}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaGithub />
						</IconLink>
						<IconLink
							href={LINKEDIN_URL}
							aria-label="LinkedIn"
							className={classes.social}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaLinkedin />
						</IconLink>
						<Button
							href={RESUME_PATH}
							variant="secondary"
							size="sm"
							className={classes.resume}
							target="_blank"
							rel="noopener noreferrer"
						>
							Resume
						</Button>
						<IconButton
							className={classes.menuButton}
							variant="outlined"
							onClick={() => setMenuOpen(true)}
							aria-label="Open menu"
							aria-expanded={menuOpen}
						>
							<MdMenu />
						</IconButton>
					</div>
				</div>
			</header>
			<MobileNav open={menuOpen} onClose={closeMenu} />
		</>
	)
}

export default Header
