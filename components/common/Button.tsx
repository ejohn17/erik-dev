import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import cn from 'classnames'

import Spinner from './Spinner'
import classes from './styles/Button.module.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface SharedProps {
	children: ReactNode
	variant?: ButtonVariant
	size?: ButtonSize
	icon?: ReactNode
	iconPosition?: 'start' | 'end'
	loading?: boolean
	fullWidth?: boolean
	className?: string
}

type ButtonElementProps = SharedProps &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & { href?: never }

type AnchorElementProps = SharedProps &
	Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & { href: string }

export type ButtonProps = ButtonElementProps | AnchorElementProps

const isInternalRoute = (href: string) => href.startsWith('/') && !href.includes('.')

const Button = (props: ButtonProps): JSX.Element => {
	const {
		children,
		variant = 'primary',
		size = 'md',
		icon,
		iconPosition = 'end',
		loading = false,
		fullWidth = false,
		className,
		...rest
	} = props

	const rootClassName = cn(classes.button, classes[variant], classes[size], fullWidth && classes.fullWidth, className)

	const adornment = loading ? (
		<Spinner className={classes.icon} />
	) : icon ? (
		<span className={classes.icon}>{icon}</span>
	) : null

	const content = (
		<>
			{iconPosition === 'start' ? adornment : null}
			<span className={classes.label}>{children}</span>
			{iconPosition === 'end' ? adornment : null}
		</>
	)

	if (typeof rest.href === 'string') {
		const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

		if (isInternalRoute(href)) {
			return (
				<Link href={href} className={rootClassName} {...anchorProps}>
					{content}
				</Link>
			)
		}

		return (
			<a href={href} className={rootClassName} {...anchorProps}>
				{content}
			</a>
		)
	}

	const { disabled, type = 'button', ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>

	return (
		<button
			type={type}
			className={rootClassName}
			disabled={disabled || loading}
			aria-busy={loading || undefined}
			{...buttonProps}
		>
			{content}
		</button>
	)
}

export default Button
