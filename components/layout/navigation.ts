import { IconType } from 'react-icons'
import { MdHome } from 'react-icons/md'
import { FaYoutube } from 'react-icons/fa'
import { BsTranslate } from 'react-icons/bs'

export interface NavigationItem {
	label: string
	href: string
	description: string
	icon: IconType
}

export const CONTACT_EMAIL = 'johnstonerik17@gmail.com'
export const RESUME_PATH = '/files/resume.pdf'

const navigation: NavigationItem[] = [
	{
		label: 'Home',
		href: '/',
		description: 'About me, experience and projects',
		icon: MdHome,
	},
	{
		label: 'Youtube to Mp3',
		href: '/youtube-to-mp3',
		description: 'Pull the audio out of any YouTube video',
		icon: FaYoutube,
	},
	{
		label: 'Caption Generator',
		href: '/caption-generator',
		description: 'Extract and translate video captions',
		icon: BsTranslate,
	},
]

export default navigation
