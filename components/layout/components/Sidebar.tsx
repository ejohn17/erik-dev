import classes from './styles/Sidebar.module.scss'
import cn from 'classnames'

import IconButton from 'components/common/IconButton'
import SidebarItem from './components/SidebarItem'

import { MdHome } from 'react-icons/md'
import { ImYoutube2 } from 'react-icons/im'
import { BsTranslate } from 'react-icons/bs'

interface SidebarProps {
	open: boolean
}

const Sidebar = ({ open }: SidebarProps): JSX.Element => {
	return (
		<>
			<div className={cn(classes.sidebarRoot, open ? classes.sidebarOpen : classes.sidebarClosed)}>
				<div className={classes.pageSection}>
					<SidebarItem text="Home" icon={<MdHome />} path="/" />
				</div>
				<div className={cn(classes.divider, classes.sectionDivider)}>
					<p className={classes.subtitle}>Exercises</p>
				</div>
				<div className={classes.pageSection}>
					<SidebarItem text="Youtube to Mp4" icon={<ImYoutube2 />} path="/youtube-to-mp4" />
					<SidebarItem
						text="Caption Generator"
						icon={<BsTranslate style={{ width: '2rem', height: '2rem' }} />}
						path="/caption-generator"
					/>
				</div>
				<div className={classes.verticalBorder} />
			</div>
		</>
	)
}

export default Sidebar
