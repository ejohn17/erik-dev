import { render, screen, fireEvent } from '@testing-library/react'
import CaptionSection from '../CaptionSection'
import { YoutubeSubtitle } from '@/pages/api/videos/youtubeUpload'

describe('CaptionSection', () => {
	const mockSetTime = jest.fn()
	const mockVideoRef = {
		current: {
			currentTime: 0,
		},
	} as unknown as React.MutableRefObject<HTMLVideoElement>

	const mockCaptions: YoutubeSubtitle[] = [
		{ start: '0', dur: '2', text: 'First caption' },
		{ start: '2', dur: '2', text: 'Second caption' },
		{ start: '4', dur: '2', text: 'Third caption' },
	]

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders all captions', () => {
		render(
			<CaptionSection videoRef={mockVideoRef} videoCaptions={mockCaptions} setTime={mockSetTime} activeCaption={0} />,
		)

		mockCaptions.forEach((caption) => {
			expect(screen.getByText(caption.text)).toBeInTheDocument()
		})
	})

	it('highlights active caption', () => {
		const activeIndex = 1
		render(
			<CaptionSection
				videoRef={mockVideoRef}
				videoCaptions={mockCaptions}
				setTime={mockSetTime}
				activeCaption={activeIndex}
			/>,
		)

		const activeButton = screen.getByText(mockCaptions[activeIndex].text)
		expect(activeButton).toHaveClass('active')
	})

	it('jumps to correct time when caption is clicked', () => {
		render(
			<CaptionSection videoRef={mockVideoRef} videoCaptions={mockCaptions} setTime={mockSetTime} activeCaption={0} />,
		)

		const secondCaption = screen.getByText(mockCaptions[1].text)
		fireEvent.click(secondCaption)

		expect(mockVideoRef.current.currentTime).toBe(2)
		expect(mockSetTime).toHaveBeenCalledWith(2)
	})
})
