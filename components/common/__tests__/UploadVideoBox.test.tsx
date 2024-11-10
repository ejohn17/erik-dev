import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import UploadVideoBox from '../UploadVideoBox'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('UploadVideoBox', () => {
	// Setup mock functions
	const mockSetDownloadURL = jest.fn()
	const mockSetVideoTitle = jest.fn()
	const mockSetVideoCaptions = jest.fn()
	const mockSetAudioURL = jest.fn()

	const defaultProps = {
		setDownloadURL: mockSetDownloadURL,
		setVideoTitle: mockSetVideoTitle,
		setVideoCaptions: mockSetVideoCaptions,
		setAudioURL: mockSetAudioURL,
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders correctly', () => {
		render(<UploadVideoBox {...defaultProps} />)
		expect(screen.getByPlaceholderText('youtube.com/watch?v=yOu-TuBe_42')).toBeInTheDocument()
		expect(screen.getByText('Please enter a proper Youtube URL')).toBeInTheDocument()
	})

	it('disables button for invalid YouTube URL', () => {
		render(<UploadVideoBox {...defaultProps} />)
		const input = screen.getByPlaceholderText('youtube.com/watch?v=yOu-TuBe_42')
		const button = screen.getByText('Upload')

		fireEvent.change(input, { target: { value: 'invalid-url' } })
		expect(button).toHaveClass('disabledButton')
	})

	it('enables button for valid YouTube URL', () => {
		render(<UploadVideoBox {...defaultProps} />)
		const input = screen.getByPlaceholderText('youtube.com/watch?v=yOu-TuBe_42')
		const button = screen.getByText('Upload')

		fireEvent.change(input, { target: { value: 'https://www.youtube.com/watch?v=valid-id' } })
		expect(button).toHaveClass('submitButton')
	})
})
