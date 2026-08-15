import { FormEvent, useCallback, useMemo, useState } from 'react'
import axios from 'axios'

import Button from './Button'
import Card from './Card'
import Input from './Input'
import { YoutubeSubtitle } from '@/pages/api/videos/youtubeUpload'

import classes from './styles/UploadVideoBox.module.scss'

const YOUTUBE_URL_PATTERN = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/

interface UploadVideoBoxProps {
	setDownloadURL: (url: string) => void
	setVideoTitle: (title: string) => void
	setVideoCaptions?: (data: YoutubeSubtitle[]) => void
	setAudioURL?: (url: string) => void
	title?: string
	description?: string
	submitLabel?: string
}

const UploadVideoBox = ({
	setDownloadURL,
	setVideoTitle,
	setVideoCaptions,
	setAudioURL,
	title = 'Paste a YouTube link',
	description = 'We fetch the video, store it, and hand it back ready to work with.',
	submitLabel = 'Upload',
}: UploadVideoBoxProps): JSX.Element => {
	const [youtubeURL, setYoutubeURL] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const isValidURL = useMemo(() => YOUTUBE_URL_PATTERN.test(youtubeURL), [youtubeURL])
	const showValidationError = !!youtubeURL && !isValidURL

	const uploadVideo = useCallback(
		async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			if (!isValidURL || loading) return

			setLoading(true)
			setError('')

			try {
				const { data } = await axios.post('/api/videos/youtubeUpload', { youtubeURL })
				setVideoTitle(data.title)
				setDownloadURL(data.downloadURL)
				setVideoCaptions?.(data.subtitles)
				setAudioURL?.(data.audioURL)
			} catch {
				setError('We could not process that video. Check the link and try again.')
			} finally {
				setLoading(false)
			}
		},
		[isValidURL, loading, setAudioURL, setDownloadURL, setVideoCaptions, setVideoTitle, youtubeURL],
	)

	return (
		<Card padding="lg" className={classes.card}>
			<div className={classes.heading}>
				<h2 className={classes.title}>{title}</h2>
				<p className={classes.description}>{description}</p>
			</div>
			<form className={classes.form} onSubmit={uploadVideo} noValidate>
				<Input
					containerClassName={classes.input}
					aria-label="YouTube URL"
					placeholder="youtube.com/watch?v=yOu-TuBe_42"
					value={youtubeURL}
					onChange={(event) => setYoutubeURL(event.currentTarget.value)}
					disabled={loading}
					error={showValidationError ? 'That does not look like a YouTube URL.' : undefined}
					autoComplete="off"
					spellCheck={false}
				/>
				<Button type="submit" size="lg" disabled={!isValidURL} loading={loading} className={classes.submit}>
					{submitLabel}
				</Button>
			</form>
			{error ? (
				<p className={classes.error} role="alert">
					{error}
				</p>
			) : null}
		</Card>
	)
}

export default UploadVideoBox
