import { ReactNode, useState } from 'react'
import IconButton from 'components/common/IconButton'

import classes from './styles/Layout.module.scss'

import { MdMenu } from 'react-icons/md'
import Sidebar from './components/Sidebar'

interface LayoutProps {
	children: ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

	const closeSidebar = () => setSidebarOpen(false)

	return (
		<div className={classes.root}>
			<Sidebar open={sidebarOpen} close={closeSidebar} />
			<div className={classes.header}>
				<IconButton className={classes.menuButton} onClick={toggleSidebar}>
					<MdMenu />
				</IconButton>
			</div>
			<div>{children}</div>
		</div>
	)
}

export default Layout
