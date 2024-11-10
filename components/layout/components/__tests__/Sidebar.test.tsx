import { render, screen, fireEvent } from '@testing-library/react'
import Sidebar from '../Sidebar'
import '@testing-library/jest-dom'

// Mock the next/router
jest.mock('next/router', () => ({
	useRouter: () => ({
		push: jest.fn(),
	}),
}))

describe('Sidebar Component', () => {
	const mockCloseMenu = jest.fn()

	beforeEach(() => {
		mockCloseMenu.mockClear()
	})

	it('renders all navigation items', () => {
		render(<Sidebar open={true} closeMenu={mockCloseMenu} />)

		expect(screen.getByText('Home')).toBeInTheDocument()
		expect(screen.getByText('Youtube to Mp3')).toBeInTheDocument()
		expect(screen.getByText('Caption Generator')).toBeInTheDocument()
	})

	it('applies correct classes when open', () => {
		const { container } = render(<Sidebar open={true} closeMenu={mockCloseMenu} />)
		const sidebarRoot = container.firstChild
		expect(sidebarRoot).toHaveClass('sidebarRoot')
		expect(sidebarRoot).toHaveClass('sidebarOpen')
	})

	it('applies correct classes when closed', () => {
		const { container } = render(<Sidebar open={false} closeMenu={mockCloseMenu} />)
		const sidebarRoot = container.firstChild
		expect(sidebarRoot).toHaveClass('sidebarRoot')
		expect(sidebarRoot).toHaveClass('sidebarDefault')
	})
})
