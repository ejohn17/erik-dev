import { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import cn from 'classnames'

import { YoutubeSubtitle } from '@/pages/api/videos/youtubeUpload'
import { addHeadingZero } from '@/utilities/addHeadingZero'

import classes from './styles/CaptionSection.module.scss'

interface CaptionSectionProps {
	videoRef: MutableRefObject<HTMLVideoElement>
	videoCaptions: YoutubeSubtitle[]
	setTime: (time: number) => void
	activeCaption: number
}

const formatTimestamp = (start: string): string => {
	const seconds = parseFloat(start)
	if (!Number.isFinite(seconds)) return '0:00'
	return `${Math.floor(seconds / 60)}:${addHeadingZero(Math.floor(seconds % 60))}`
}

const CaptionSection = ({ videoRef, videoCaptions, setTime, activeCaption }: CaptionSectionProps): JSX.Element => {
	const activeRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		activeRef.current?.scrollIntoView?.({ block: 'nearest' })
	}, [activeCaption])

	const jumpToCaption = useCallback(
		(caption: YoutubeSubtitle) => {
			const start = parseFloat(caption.start)
			if (videoRef.current) videoRef.current.currentTime = start
			setTime(start)
		},
		[setTime, videoRef],
	)

	return (
		<div className={classes.root}>
			{videoCaptions.map((caption, idx) => {
				const isActive = idx === activeCaption

				return (
					<button
						key={`${caption.start}-${idx}`}
						ref={isActive ? activeRef : undefined}
						className={cn(classes.caption, isActive && classes.active)}
						onClick={() => jumpToCaption(caption)}
					>
						<span className={classes.timestamp}>{formatTimestamp(caption.start)}</span>
						{caption.text}
					</button>
				)
			})}
		</div>
	)
}

export default CaptionSection
