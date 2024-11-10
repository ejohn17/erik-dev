import { render, screen } from '@testing-library/react'
import Youtube from '../Youtube'

// Mock the dependencies
jest.mock('axios')
jest.mock('@/firebaseUtils/storage')
jest.mock('file-saver')

describe('Captions Component', () => {
	beforeEach(() => {
		// Clear all mocks before each test
		jest.clearAllMocks()
	})

	it('renders initial state correctly', () => {
		render(<Youtube />)

		// Check if title is present
		expect(screen.getByText('to Mp3')).toBeInTheDocument()

		// Check if SEO content is visible initially
		expect(screen.getByText(/This is a simple tool/)).toBeInTheDocument()
		expect(screen.getByText(/Follow these steps/)).toBeInTheDocument()
	})
})
