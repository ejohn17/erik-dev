import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'

import { MdClose, MdMailOutline } from 'react-icons/md'

import IconButton from 'components/common/IconButton'
import navigation, { CONTACT_EMAIL } from '../navigation'

import classes from './styles/MobileNav.module.scss'

const FOCUSABLE = 'a[href], button:not([disabled])'

interface MobileNavProps {
	open: boolean
	onClose: () => void
}

const MobileNav = ({ open, onClose }: MobileNavProps): JSX.Element => {
	const { pathname } = useRouter()
	const panelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!open) return undefined

		const panel = panelRef.current
		const previouslyFocused = document.activeElement as HTMLElement | null
		const previousOverflow = document.body.style.overflow

		document.body.style.overflow = 'hidden'
		panel?.focus()

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
				return
			}

			if (event.key !== 'Tab' || !panel) return

			const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
			if (!focusable.length) return

			const first = focusable[0]
			const last = focusable[focusable.length - 1]
			const active = document.activeElement

			if (event.shiftKey && (active === first || active === panel)) {
				event.preventDefault()
				last.focus()
			} else if (!event.shiftKey && active === last) {
				event.preventDefault()
				first.focus()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.body.style.overflow = previousOverflow
			previouslyFocused?.focus()
		}
	}, [onClose, open])

	return (
		<div className={cn(classes.root, open && classes.open)}>
			<div className={classes.backdrop} onClick={onClose} aria-hidden />
			<div
				className={classes.panel}
				ref={panelRef}
				role="dialog"
				aria-modal="true"
				aria-label="Site navigation"
				aria-hidden={!open}
				tabIndex={-1}
			>
				<div className={classes.header}>
					<p className={classes.eyebrow}>Menu</p>
					<IconButton onClick={onClose} aria-label="Close menu" variant="outlined">
						<MdClose />
					</IconButton>
				</div>

				<nav className={classes.links}>
					{navigation.map(({ href, label, description, icon: Icon }) => {
						const active = pathname === href

						return (
							<Link
								key={href}
								href={href}
								className={cn(classes.link, active && classes.activeLink)}
								aria-current={active ? 'page' : undefined}
								onClick={onClose}
							>
								<span className={classes.linkIcon}>
									<Icon />
								</span>
								<span className={classes.linkText}>
									<span className={classes.linkLabel}>{label}</span>
									<span className={classes.linkDescription}>{description}</span>
								</span>
							</Link>
						)
					})}
				</nav>

				<a className={classes.contact} href={`mailto:${CONTACT_EMAIL}`} onClick={onClose}>
					<MdMailOutline />
					{CONTACT_EMAIL}
				</a>
			</div>
		</div>
	)
}

export default MobileNav
