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
	const closeMenu = () => setSidebarOpen(false)

	return (
		<div className={classes.root}>
			<header className={classes.header}>
				<IconButton className={classes.menuButton} onClick={toggleSidebar}>
					<MdMenu />
				</IconButton>
			</header>
			<div className={classes.main} onClick={sidebarOpen ? toggleSidebar : undefined}>
				<Sidebar open={sidebarOpen} closeMenu={closeMenu} />
				{children}
			</div>
		</div>
	)
}

export default Layout
