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

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<IconButton className={classes.menuButton} onClick={toggleSidebar}>
					<MdMenu />
				</IconButton>
			</div>
			<div className={classes.main}>
				<Sidebar open={sidebarOpen} />
				{children}
			</div>
		</div>
	)
}

export default Layout
