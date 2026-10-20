import { IconType } from 'react-icons'
import { MdWorkOutline, MdOutlineDashboard, MdOutlineBuild, MdMailOutline } from 'react-icons/md'

export interface NavigationItem {
	label: string
	href: string
	description: string
	icon: IconType
	/** Pathname prefix that also marks this item active, e.g. case study pages under Projects. */
	activePrefix?: string
}

export const SITE_URL = 'https://erik-dev.ca'
export const CONTACT_EMAIL = 'johnstonerik17@gmail.com'
export const GITHUB_URL = 'https://github.com/ejohn17'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/erik-johnston-842225175/'
export const RESUME_PATH = '/files/resume.pdf'
/** Shown next to every resume link. Update whenever public/files/resume.pdf is replaced. */
export const RESUME_UPDATED = 'Oct 2026'

const navigation: NavigationItem[] = [
	{
		label: 'Experience',
		href: '/#experience',
		description: 'Roles, products and results',
		icon: MdWorkOutline,
	},
	{
		label: 'Projects',
		href: '/#projects',
		description: 'Case studies of recent builds',
		icon: MdOutlineDashboard,
		activePrefix: '/projects',
	},
	{
		label: 'Skills',
		href: '/#skills',
		description: 'Languages, frameworks and cloud',
		icon: MdOutlineBuild,
	},
	{
		label: 'Contact',
		href: '/#contact',
		description: 'Email, LinkedIn and GitHub',
		icon: MdMailOutline,
	},
]

export const experiments = [{ label: 'Caption Generator', href: '/caption-generator' }]

export const isActive = (item: NavigationItem, pathname: string): boolean =>
	pathname === item.href || (!!item.activePrefix && pathname.startsWith(item.activePrefix))

export default navigation
