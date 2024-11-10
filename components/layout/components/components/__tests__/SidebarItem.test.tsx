import { render, screen } from '@testing-library/react'
import SidebarItem from '../SidebarItem'

describe('SidebarItem', () => {
	const mockProps = {
		icon: <span data-testid="mock-icon">🏠</span>,
		text: 'Home',
		path: '/home',
		closeMenu: jest.fn(),
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders the icon and text correctly', () => {
		render(<SidebarItem {...mockProps} />)

		expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
		expect(screen.getByText('Home')).toBeInTheDocument()
	})

	it('renders with correct link path', () => {
		const { container } = render(<SidebarItem {...mockProps} />)
		const linkElement = container.firstChild
		expect(linkElement).toHaveAttribute('href', '/home')
	})
})
