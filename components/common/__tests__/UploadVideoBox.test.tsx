import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import axios from 'axios'

import UploadVideoBox from '../UploadVideoBox'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('UploadVideoBox', () => {
	const setDownloadURL = jest.fn()
	const setVideoTitle = jest.fn()
	const setVideoCaptions = jest.fn()

	const defaultProps = { setDownloadURL, setVideoTitle, setVideoCaptions }

	const typeUrl = async (user: ReturnType<typeof userEvent.setup>, url: string) => {
		await user.type(screen.getByRole('textbox', { name: /youtube url/i }), url)
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders the prompt and input', () => {
		render(<UploadVideoBox {...defaultProps} />)

		expect(screen.getByText('Paste a YouTube link')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('youtube.com/watch?v=yOu-TuBe_42')).toBeInTheDocument()
	})

	it('keeps the submit button disabled until the URL looks like YouTube', async () => {
		const user = userEvent.setup()
		render(<UploadVideoBox {...defaultProps} />)

		const button = screen.getByRole('button', { name: 'Upload' })
		expect(button).toBeDisabled()

		await typeUrl(user, 'invalid-url')
		expect(button).toBeDisabled()
		expect(screen.getByText(/does not look like a YouTube URL/i)).toBeInTheDocument()
	})

	it('enables the submit button for a valid URL', async () => {
		const user = userEvent.setup()
		render(<UploadVideoBox {...defaultProps} />)

		await typeUrl(user, 'https://www.youtube.com/watch?v=valid-id')

		expect(screen.getByRole('button', { name: 'Upload' })).toBeEnabled()
	})

	it('passes the uploaded video details back to the page', async () => {
		const user = userEvent.setup()
		mockedAxios.post.mockResolvedValue({
			data: { title: 'A video', downloadURL: 'https://cdn/video.mp4', subtitles: [] },
		})
		render(<UploadVideoBox {...defaultProps} />)

		await typeUrl(user, 'https://www.youtube.com/watch?v=valid-id')
		await user.click(screen.getByRole('button', { name: 'Upload' }))

		await waitFor(() => expect(setVideoTitle).toHaveBeenCalledWith('A video'))
		expect(setDownloadURL).toHaveBeenCalledWith('https://cdn/video.mp4')
		expect(setVideoCaptions).toHaveBeenCalledWith([])
	})

	it('surfaces an error when the upload fails', async () => {
		const user = userEvent.setup()
		mockedAxios.post.mockRejectedValue(new Error('nope'))
		render(<UploadVideoBox {...defaultProps} />)

		await typeUrl(user, 'https://www.youtube.com/watch?v=valid-id')
		await user.click(screen.getByRole('button', { name: 'Upload' }))

		expect(await screen.findByRole('alert')).toHaveTextContent(/could not process that video/i)
	})
})
