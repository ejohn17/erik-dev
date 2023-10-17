import { MutableRefObject, useCallback, useMemo, useState } from 'react'
import classes from './styles/CaptionSection.module.scss'
import { YoutubeSubtitle } from '@/pages/api/videos/youtubeUpload'

import cn from 'classnames'

interface CaptionSectionProps {
	videoRef: MutableRefObject<HTMLVideoElement>
	videoCaptions: YoutubeSubtitle[]
	setTime: (time: number) => void
	activeCaption: number
}

const CaptionSection = ({ videoRef, videoCaptions, setTime, activeCaption }: CaptionSectionProps): JSX.Element => {
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
