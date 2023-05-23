import { useState, useMemo, useCallback } from 'react'

import classes from './styles/UploadVideoBox.module.scss'

import axios from 'axios'

const UploadVideoBox = (): JSX.Element => {
	const [youtubeURL, setYoutubeURL] = useState<string>('')

	const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		setYoutubeURL(e.currentTarget.value)
	}

	const isValidURL = useMemo(() => {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
		const match = youtubeURL.match(regExp)
		return match
	}, [youtubeURL])

	const uploadVideo = useCallback(async () => {
		const resp = await axios.post('/api/youtubeUpload', { youtubeURL })
		console.log('RESP!', resp)
	}, [youtubeURL])

	return (
		<div className={classes.inputPaper}>
			<h4>Please enter a proper Youtube URL</h4>
			<div className={classes.actions}>
				<input placeholder="youtube.com/watch?v=yOu-TuBe_42" onChange={onInputChange} value={youtubeURL} />
				<button className={!isValidURL ? classes.disabledButton : classes.submitButton} onClick={uploadVideo}>
					Upload
				</button>
			</div>
		</div>
	)
}

export default UploadVideoBox
