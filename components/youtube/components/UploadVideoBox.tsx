import { useState, useMemo, useCallback } from 'react'

import classes from './styles/UploadVideoBox.module.scss'

import axios from 'axios'

interface UploadProps {
	downloadURL: string
	videoTitle: string
	setDownloadURL: (url: string) => void
	setVideoTitle: (title: string) => void
}

const UploadVideoBox = ({ downloadURL, videoTitle, setDownloadURL, setVideoTitle }: UploadProps): JSX.Element => {
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
			.post('/api/youtubeUpload', { youtubeURL })
			.then((resp) => {
				setVideoTitle(resp.data.title)
				setDownloadURL(resp.data.downloadURL)
			})
			.finally(setLoadingFalse)
	}, [youtubeURL])

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
					<svg className={classes.spinner} viewBox="0 0 50 50">
						<circle className={classes.path} cx="25" cy="25" r="20" fill="none" stroke-width="3"></circle>
					</svg>
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
