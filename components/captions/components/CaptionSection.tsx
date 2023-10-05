import { MutableRefObject, useCallback, useMemo, useState } from 'react'
import classes from './styles/CaptionSection.module.scss'
import { YoutubeSubtitle } from '@/pages/api/youtubeUpload'

import cn from 'classnames'

interface CaptionSectionProps {
	videoRef: MutableRefObject<HTMLVideoElement>
	videoCaptions: YoutubeSubtitle[]
	timeElapsed: number
	setTime: (time: number) => void
}

const CaptionSection = ({ videoRef, videoCaptions, timeElapsed, setTime }: CaptionSectionProps): JSX.Element => {
	const activeCaption = useMemo(() => {
		let captionIdx = 0
		for (let i = 0; i < videoCaptions.length - 1; i++) {
			const currentCaption = videoCaptions[i]
			const nextCaption = videoCaptions[i + 1]

			if (timeElapsed >= parseFloat(currentCaption.start) && timeElapsed < parseFloat(nextCaption.start)) {
				captionIdx = i
				break
			}
		}
		return captionIdx
	}, [timeElapsed, videoCaptions])

	const jumpToCaption = useCallback(
		(caption: YoutubeSubtitle) => {
			videoRef.current.currentTime = parseFloat(caption.start)
			setTime(parseFloat(caption.start))
		},
		[videoRef, setTime],
	)

	return (
		<div className={classes.root}>
			{videoCaptions.map((caption, idx) => {
				const handleJumpToCaption = () => jumpToCaption(caption)
				return (
					<button
						key={idx}
						className={cn(classes.caption, idx === activeCaption ? classes.active : '')}
						onClick={handleJumpToCaption}
					>
						{caption.text}
					</button>
				)
			})}
		</div>
	)
}

export default CaptionSection
