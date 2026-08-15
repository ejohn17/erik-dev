import { KeyboardEvent, MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import screenfull from 'screenfull'
import cn from 'classnames'

import {
	MdOutlineFullscreen,
	MdOutlineFullscreenExit,
	MdPause,
	MdPlayArrow,
	MdVolumeOff,
	MdVolumeUp,
} from 'react-icons/md'

import IconButton from './IconButton'
import Slider from './Slider'
import { addHeadingZero } from '@/utilities/addHeadingZero'

import classes from './styles/VideoPlayer.module.scss'

const SKIP_SECONDS = 5

interface VideoPlayerProps {
	url: string
	videoRef: MutableRefObject<HTMLVideoElement>
	timeElapsed: number
	setTime: (time: number) => void
	/** Rendered over the video, above the controls. Used for live captions. */
	overlay?: ReactNode
	className?: string
}

const formatTime = (seconds: number): string => {
	if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
	return `${Math.floor(seconds / 60)}:${addHeadingZero(Math.floor(seconds % 60))}`
}

const VideoPlayer = ({ url, videoRef, timeElapsed, setTime, overlay, className }: VideoPlayerProps): JSX.Element => {
	const [playing, setPlaying] = useState<boolean>(false)
	const [volume, setVolume] = useState<number>(100)
	const [muted, setMuted] = useState<boolean>(false)
	const [duration, setDuration] = useState<number>(0)
	const [isFullscreen, setFullscreen] = useState<boolean>(false)

	const wrapperRef = useRef<HTMLDivElement>(null)

	// `timeupdate` only fires a few times a second, which makes the scrubber
	// stutter, so drive it from an animation frame loop while playing instead.
	useEffect(() => {
		if (!playing) return undefined

		let frame: number
		const tick = () => {
			const video = videoRef.current
			if (video) setTime(video.currentTime)
			frame = requestAnimationFrame(tick)
		}

		frame = requestAnimationFrame(tick)
		return () => cancelAnimationFrame(frame)
	}, [playing, setTime, videoRef])

	useEffect(() => {
		if (!screenfull.isEnabled) return undefined

		const onChange = () => setFullscreen(screenfull.isFullscreen)
		screenfull.on('change', onChange)
		return () => screenfull.off('change', onChange)
	}, [])

	const togglePlay = useCallback(() => {
		const video = videoRef.current
		if (!video) return
		if (video.paused) {
			void video.play()
		} else {
			video.pause()
		}
	}, [videoRef])

	const toggleFullscreen = useCallback(() => {
		if (!screenfull.isEnabled || !wrapperRef.current) return
		void screenfull.toggle(wrapperRef.current)
	}, [])

	const toggleMuted = useCallback(() => {
		const video = videoRef.current
		if (!video) return
		video.muted = !video.muted
		setMuted(video.muted)
	}, [videoRef])

	const handleChangeVolume = useCallback(
		(nextVolume: number) => {
			const video = videoRef.current
			setVolume(nextVolume)
			if (!video) return
			video.volume = nextVolume / 100
			video.muted = nextVolume === 0
			setMuted(video.muted)
		},
		[videoRef],
	)

	const seekTo = useCallback(
		(seconds: number) => {
			const video = videoRef.current
			if (!video || !Number.isFinite(video.duration)) return
			const nextTime = Math.min(Math.max(seconds, 0), video.duration)
			video.currentTime = nextTime
			setTime(nextTime)
		},
		[setTime, videoRef],
	)

	const handleSeek = useCallback(
		(percent: number) => seekTo((percent / 100) * (videoRef.current?.duration ?? 0)),
		[seekTo, videoRef],
	)

	// Scoped to the player so the page stays usable while it is on screen.
	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const handlers: Record<string, () => void> = {
				Space: togglePlay,
				KeyK: togglePlay,
				KeyM: toggleMuted,
				KeyF: toggleFullscreen,
				ArrowRight: () => seekTo((videoRef.current?.currentTime ?? 0) + SKIP_SECONDS),
				ArrowLeft: () => seekTo((videoRef.current?.currentTime ?? 0) - SKIP_SECONDS),
			}

			const handler = handlers[event.code]
			if (!handler) return

			event.preventDefault()
			handler()
		},
		[seekTo, toggleFullscreen, toggleMuted, togglePlay, videoRef],
	)

	const progress = duration > 0 ? (timeElapsed / duration) * 100 : 0

	return (
		<div
			className={cn(classes.root, playing ? classes.playing : classes.paused, className)}
			ref={wrapperRef}
			onDoubleClick={toggleFullscreen}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role="region"
			aria-label="Video player"
		>
			<video
				className={classes.video}
				src={url}
				ref={videoRef}
				onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
				onPlay={() => setPlaying(true)}
				onPause={() => setPlaying(false)}
				onEnded={() => setPlaying(false)}
				onTimeUpdate={(event) => {
					if (event.currentTarget.paused) setTime(event.currentTarget.currentTime)
				}}
				onClick={togglePlay}
			/>

			{overlay ? <div className={classes.overlay}>{overlay}</div> : null}

			<div className={classes.controls}>
				<Slider
					className={classes.progress}
					progressBar
					value={progress}
					onChange={handleSeek}
					ariaLabel="Seek"
					ariaValueText={`${formatTime(timeElapsed)} of ${formatTime(duration)}`}
					dataTestId="progress"
				/>
				<div className={classes.buttons}>
					<IconButton onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} className={classes.control}>
						{playing ? <MdPause /> : <MdPlayArrow />}
					</IconButton>
					<div className={classes.volume}>
						<IconButton onClick={toggleMuted} aria-label={muted ? 'Unmute' : 'Mute'} className={classes.control}>
							{muted || volume === 0 ? <MdVolumeOff /> : <MdVolumeUp />}
						</IconButton>
						<Slider
							className={classes.volumeSlider}
							value={muted ? 0 : volume}
							onChange={handleChangeVolume}
							ariaLabel="Volume"
							dataTestId="volume"
						/>
					</div>
					<p className={classes.time}>
						<span>{formatTime(timeElapsed)}</span>
						<span className={classes.timeDivider}>/</span>
						<span>{formatTime(duration)}</span>
					</p>
					<IconButton
						className={cn(classes.control, classes.fullscreen)}
						onClick={toggleFullscreen}
						aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
						data-testid="fullscreen"
					>
						{isFullscreen ? <MdOutlineFullscreenExit /> : <MdOutlineFullscreen />}
					</IconButton>
				</div>
			</div>
		</div>
	)
}

export default VideoPlayer
