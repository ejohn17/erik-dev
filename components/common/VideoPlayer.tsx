import React, { useState, useRef, useCallback, useEffect, MutableRefObject, useMemo } from 'react'

import screenfull from 'screenfull'

import cn from 'classnames'
import classes from './styles/VideoPlayer.module.scss'

import IconButton from './IconButton'
import Slider from './Slider'
import { MdOutlineFullscreen, MdOutlineFullscreenExit, MdPause, MdPlayArrow } from 'react-icons/md'
import { addHeadingZero } from '@/utilities/addHeadingZero'

interface VideoProps {
	url: string
	className: string
	videoRef: MutableRefObject<HTMLVideoElement>
	timeElapsed: number
	setTime: (time: number) => void
}

const VideoPlayer = ({ url, className, videoRef, timeElapsed, setTime }: VideoProps): JSX.Element => {
	const [playing, setPlaying] = useState<boolean>(false)
	const [volume, setVolume] = useState<number>(100)
	const [dragging, setDragging] = useState<boolean>(false)
	const [timerInterval, setTimerInterval] = useState<ReturnType<typeof setInterval>>(null)
	const [isFullscreen, setFullscreen] = useState<boolean>(false)

	const wrapperRef = useRef<HTMLDivElement>(null)

	const togglePlay = useCallback(() => {
		if (playing) {
			setPlaying(false)
			videoRef.current?.pause()
		} else {
			setPlaying(true)
			videoRef.current?.play()
		}
	}, [playing, videoRef])

	const toggleFullscreen = () => {
		screenfull.toggle(wrapperRef.current)
	}

	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			event.preventDefault()
			if (event.code === 'Space') {
				togglePlay()
			}

			const currentTime = videoRef.current.currentTime
			const duration = videoRef.current.duration

			if (event.code === 'ArrowRight') {
				const newTime = currentTime + 3

				if (newTime > duration) {
					videoRef.current.currentTime = duration
					videoRef.current.pause()
					setPlaying(false)
					setTime(duration)
				} else {
					videoRef.current.currentTime = newTime
					setTime(newTime)
				}
			}

			if (event.code === 'ArrowLeft') {
				const newTime = currentTime - 3

				if (newTime < 0) {
					videoRef.current.currentTime = 0
					setTime(0)
				} else {
					videoRef.current.currentTime = newTime
					setTime(newTime)
				}
			}
		}

		const onFullscren = () => setFullscreen(screenfull.isFullscreen)

		window.addEventListener('keydown', onKey)
		screenfull.on('change', onFullscren)

		return () => {
			window.removeEventListener('keydown', onKey)
			screenfull.off('change', onFullscren)
		}
	}, [isFullscreen, togglePlay, videoRef])

	useEffect(() => {
		// if timer should start so the progress bar is updating
		if (videoRef && playing && !dragging) {
			// try to set the timer, updating it if it already was set.
			if (timerInterval) clearInterval(timerInterval)
			const updateInterval = setInterval(() => {
				setTime(videoRef.current.currentTime)
			}, 25)
			setTimerInterval(updateInterval)
			return () => clearInterval(updateInterval)
		} else {
			// we don't want the progress bar updating. Stop the timer.
			if (timerInterval) clearInterval(timerInterval)
			setTimerInterval(null)
		}
	}, [dragging, playing])

	const handleChangeVolume = useCallback(
		(vol: number) => {
			setVolume(vol)
			videoRef.current.volume = vol / 100
		},
		[videoRef],
	)

	const handleSeek = useCallback(
		(val: number) => {
			const newTime = (val / 100) * videoRef.current.duration
			videoRef.current.currentTime = newTime
			setTime(newTime)
		},
		[videoRef],
	)

	const totalDuration = useMemo(() => videoRef.current?.duration, [videoRef])

	const totalM = totalDuration === -1 ? '--' : Math.floor(totalDuration / 60.0)
	const totalS = totalDuration === -1 ? '--' : addHeadingZero(Math.round(totalDuration % 60.0))
	const minutes = Math.floor(timeElapsed ?? 0 / 60.0)
	const seconds = addHeadingZero(Math.floor(timeElapsed ?? 0 % 60.0))

	return (
		<div className={cn(className, classes.root)} ref={wrapperRef} onDoubleClick={toggleFullscreen}>
			<div className={classes.backdrop} onClick={togglePlay} />
			<video src={url} ref={videoRef} />
			<div className={classes.controls}>
				<Slider
					className={classes.progressBar}
					progressBar
					value={(timeElapsed / videoRef.current?.duration) * 100 ?? 0}
					onChange={handleSeek}
				/>
				<div className={classes.leftControls}>
					<IconButton onClick={togglePlay} className={classes.playButton}>
						{playing ? <MdPause /> : <MdPlayArrow />}
					</IconButton>
					<div className={classes.volumeContainer}>
						<Slider value={volume} onChange={handleChangeVolume} />
					</div>
					<p>
						{minutes}:{seconds} / {totalM}:{totalS}
					</p>
				</div>
				<IconButton className={classes.fullscreenButton} onClick={toggleFullscreen}>
					{screenfull.isFullscreen ? <MdOutlineFullscreenExit /> : <MdOutlineFullscreen />}
				</IconButton>
			</div>
		</div>
	)
}

export default VideoPlayer
