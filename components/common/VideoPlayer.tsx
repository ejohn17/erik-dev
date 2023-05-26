import React, { useState, useRef, useCallback } from 'react'

import cn from 'classnames'
import classes from './styles/VideoPlayer.module.scss'
import IconButton from './IconButton'
import { MdPause, MdPlayArrow } from 'react-icons/md'

interface VideoProps {
	url: string
	className: string
}

const VideoPlayer = ({ url, className }: VideoProps): JSX.Element => {
	const [playing, setPlaying] = useState<boolean>(false)

	const playerRef = useRef<HTMLVideoElement>(null)

	const togglePlay = useCallback(() => {
		if (playing) {
			setPlaying(false)
			playerRef.current?.pause()
		} else {
			setPlaying(true)
			playerRef.current?.play()
		}
	}, [playing, setPlaying])

	return (
		<div className={cn(className, classes.root)}>
			<div className={classes.backdrop} />
			<video src={url} ref={playerRef} />
			<div className={classes.controls}>
				<IconButton onClick={togglePlay} className={classes.playButton}>
					{playing ? <MdPause /> : <MdPlayArrow />}
				</IconButton>
			</div>
		</div>
	)
}

export default VideoPlayer
