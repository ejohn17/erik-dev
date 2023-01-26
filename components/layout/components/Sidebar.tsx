import classes from './styles/Sidebar.module.scss'
import cn from 'classnames'

import IconButton from 'components/common/IconButton'
import SidebarItem from './components/SidebarItem'

import { MdClose, MdHome } from 'react-icons/md'
import { TbUnlink } from 'react-icons/tb'
import { ImYoutube2 } from 'react-icons/im'

interface SidebarProps {
	open: boolean
	close: () => void
}

const Sidebar = ({ open, close }: SidebarProps): JSX.Element => {
	return (
		<>
			<div className={cn(classes.sidebarRoot, open ? classes.sidebarOpen : classes.sidebarClosed)}>
				<div className={classes.sidebarHeader}>
					<IconButton className={classes.closeButton} onClick={close}>
						<MdClose />
					</IconButton>
				</div>
				<div className={classes.divider} />
				<div className={classes.pageSection}>
					<SidebarItem text="Home" icon={<MdHome />} path="/" />
				</div>
				<div className={cn(classes.divider, classes.sectionDivider)}>
					<p className={classes.subtitle}>Exercises</p>
				</div>
				<div className={classes.pageSection}>
					<SidebarItem text="Youtube to mp3" icon={<ImYoutube2 />} path="/youtube-to-mp3" />
					<SidebarItem text="Webscraper" icon={<TbUnlink />} path="/webscraper" />
				</div>
			</div>
			<div className={cn(classes.backdrop, open ? classes.backdropOpen : classes.backdropClosed)} onClick={close} />
		</>
	)
}

export default Sidebar
