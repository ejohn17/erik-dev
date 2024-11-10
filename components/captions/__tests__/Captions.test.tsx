import { render, screen } from '@testing-library/react'
import Captions from '../Captions'

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
		render(<Captions />)

		// Check if title is present
		expect(screen.getByText('Generate Captions')).toBeInTheDocument()

		// Check if SEO content is visible initially
		expect(screen.getByText(/This is a simple tool/)).toBeInTheDocument()
		expect(screen.getByText(/Follow these steps/)).toBeInTheDocument()
	})
})
