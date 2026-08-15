import { useCallback, useRef, useState } from 'react'
import FileSaver from 'file-saver'

import { FaYoutube } from 'react-icons/fa'
import { MdDownload } from 'react-icons/md'
import { RxReset } from 'react-icons/rx'

import Button from 'components/common/Button'
import Card from 'components/common/Card'
import ToolPage from 'components/common/ToolPage'
import UploadVideoBox from 'components/common/UploadVideoBox'
import VideoPlayer from 'components/common/VideoPlayer'
import { getVideoBlob, getVideoRef } from '@/firebaseUtils/storage'

import classes from './styles/Youtube.module.scss'

const steps = [
	'Find the video you want on YouTube.',
	'Copy its URL from the address bar, or right click the video and copy the link.',
	'Paste the URL into the field above and press upload.',
	'When the video finishes uploading, hit download and your MP3 is ready.',
]

const about = (
	<>
		<p>
			This is a simple tool for taking any YouTube video you find and turning that video&apos;s audio into a
			downloadable MP3 file. It uses the youtube-dl package to pull the important details out of a video, such as the
			title and thumbnail, and returns them to the browser so you can confirm you picked the right one before
			downloading.
		</p>
		<p>
			The video details are stored in a Google Cloud NoSQL database alongside a download URL, and the MP3 itself is
			uploaded to Firebase Cloud Storage at request time. The download button then streams the file straight from that
			cloud URL.
		</p>
	</>
)

const Youtube = (): JSX.Element => {
	const [downloadURL, setDownloadURL] = useState<string>('')
	const [videoTitle, setVideoTitle] = useState<string>('')
	const [downloading, setDownloading] = useState<boolean>(false)
	const [timeElapsed, setTime] = useState<number>(0)

	const videoRef = useRef<HTMLVideoElement>(null)

	const clearVideo = useCallback(() => {
		setDownloadURL('')
		setVideoTitle('')
		setTime(0)
	}, [])

	const downloadVideo = useCallback(async () => {
		setDownloading(true)

		try {
			const storageRef = getVideoRef(`${videoTitle.replace(/[/\\?%*:|"<>]/g, '')}.mp3`)
			const videoBlob = await getVideoBlob(storageRef)
			FileSaver.saveAs(videoBlob, `${videoTitle}.mp3`)
		} finally {
			setDownloading(false)
		}
	}, [videoTitle])

	return (
		<ToolPage
			icon={<FaYoutube />}
			title="Youtube to Mp3"
			description="Paste a YouTube link, preview the video, and download its audio as an MP3."
			steps={steps}
			about={about}
		>
			{downloadURL ? (
				<Card className={classes.player}>
					<div className={classes.playerHeader}>
						<h2 className={classes.videoTitle}>{videoTitle.replaceAll('"', '')}</h2>
						<div className={classes.actions}>
							<Button onClick={downloadVideo} loading={downloading} icon={<MdDownload />}>
								Download
							</Button>
							<Button onClick={clearVideo} variant="secondary" icon={<RxReset />}>
								Reset
							</Button>
						</div>
					</div>
					<VideoPlayer url={downloadURL} videoRef={videoRef} timeElapsed={timeElapsed} setTime={setTime} />
				</Card>
			) : (
				<UploadVideoBox
					setDownloadURL={setDownloadURL}
					setVideoTitle={setVideoTitle}
					description="We grab the video, pull out the audio track, and hand back an MP3 you can download."
				/>
			)}
		</ToolPage>
	)
}

export default Youtube
