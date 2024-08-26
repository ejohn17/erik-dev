import { useState, useMemo, useCallback } from 'react'

import classes from './styles/UploadVideoBox.module.scss'

import axios from 'axios'
import Spinner from '@/components/common/Spinner'
import { YoutubeSubtitle } from '@/pages/api/videos/youtubeUpload'

interface UploadProps {
	setDownloadURL: (url: string) => void
	setVideoTitle: (title: string) => void
	setVideoCaptions?: (data: YoutubeSubtitle[]) => void
	setAudioURL?: (url: string) => void
}

const UploadVideoBox = ({ setDownloadURL, setVideoTitle, setVideoCaptions, setAudioURL }: UploadProps): JSX.Element => {
	const [youtubeURL, setYoutubeURL] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const setLoadingTrue = () => setLoading(true)
	const setLoadingFalse = () => setLoading(false)

	const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		setYoutubeURL(e.currentTarget.value)
	}

	const isValidURL = useMemo(() => {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
		const match = youtubeURL.match(regExp)
		return match
	}, [youtubeURL])

	const uploadVideo = useCallback(async () => {
		setLoadingTrue()
		axios
			.post('/api/videos/youtubeUpload', { youtubeURL })
			.then((resp) => {
				console.log('????????', resp)
				setVideoTitle(resp.data.title)
				setDownloadURL(resp.data.downloadURL)
				if (!!setVideoCaptions) {
					setVideoCaptions(resp.data.subtitles)
				}
				if (!!setAudioURL) {
					setAudioURL(resp.data.audioURL)
				}
			})
			.finally(setLoadingFalse)
	}, [setAudioURL, setDownloadURL, setVideoCaptions, setVideoTitle, youtubeURL])

	return (
		<div className={classes.inputPaper}>
			<h4>Please enter a proper Youtube URL</h4>
			<div className={classes.actions}>
				<input
					placeholder="youtube.com/watch?v=yOu-TuBe_42"
					onChange={onInputChange}
					value={youtubeURL}
					disabled={loading}
				/>
				{loading ? (
					<div className={classes.loadingContainer}>
						<Spinner className={classes.spinner} />
					</div>
				) : (
					<button className={!isValidURL ? classes.disabledButton : classes.submitButton} onClick={uploadVideo}>
						Upload
					</button>
				)}
			</div>
		</div>
	)
}

export default UploadVideoBox
