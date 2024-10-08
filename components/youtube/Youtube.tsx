import React, { useCallback, useRef, useState } from 'react'

import classes from './styles/Youtube.module.scss'
import { ImYoutube2 } from 'react-icons/im'
import UploadVideoBox from '../common/UploadVideoBox'
import VideoPlayer from '../common/VideoPlayer'

import FileSaver from 'file-saver'
import { getVideoBlob, getVideoRef } from '@/firebaseUtils/storage'
import { MdDownload } from 'react-icons/md'
import Spinner from '../common/Spinner'

import { RxReset } from 'react-icons/rx'

const Youtube = (): JSX.Element => {
	const [downloadURL, setDownloadURL] = useState<string>('')
	const [videoTitle, setVideoTitle] = useState<string>('')
	const [downloadBusy, setDownloadBusy] = useState<boolean>(false)
	const [timeElapsed, setTime] = useState<number>(0)

	const videoRef = useRef<HTMLVideoElement>(null)

	const clearVideo = useCallback(() => {
		setDownloadURL('')
		setVideoTitle('')
	}, [])

	const downloadVideo = useCallback(() => {
		setDownloadBusy(true)
		const videoRef = getVideoRef(videoTitle.replace(/[/\\?%*:|"<>]/g, '') + '.mp3')
		getVideoBlob(videoRef).then((videoBlob) => {
			FileSaver.saveAs(videoBlob, `${videoTitle}.mp3`)
			setDownloadBusy(false)
		})
	}, [videoTitle])

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<h2 className={classes.title}>
					<ImYoutube2 />
					to Mp3
				</h2>
				{downloadURL ? (
					<div className={classes.loadedVideo}>
						<h3>{videoTitle.replaceAll('"', '')}</h3>
						<VideoPlayer
							url={downloadURL}
							className={classes.videoPlayer}
							videoRef={videoRef}
							timeElapsed={timeElapsed}
							setTime={setTime}
						/>
						<div className={classes.videoActions}>
							<button onClick={downloadVideo}>
								Download {downloadBusy ? <Spinner className={classes.spinner} /> : <MdDownload />}
							</button>
							<button onClick={clearVideo}>
								Reset <RxReset />
							</button>
						</div>
					</div>
				) : (
					<UploadVideoBox setDownloadURL={setDownloadURL} setVideoTitle={setVideoTitle} />
				)}
				<div className={classes.seoContent}>
					<p>
						This is a simple tool for you to use in order to take any Youtube video that you find and turn that videos
						audio into a downloadable Mp3 file. This tool makes use of the youtubedl npm package in order to grab
						important information from a given youtube video such as the title and thumbnail and returnt that to the
						client to display. From there we can decide if this video is what we want to download and use the data
						returned from the package in order to download our new Mp3 file.
					</p>
					<p>
						This tool makes use of a Google Cloud NoSQL Database in order to store the information returned from the
						server about the requested video so that we can display this information properly to the user. At upload
						request time this information as well as a download URL for the video will be saved to a NoSQL document that
						we will use to display the information and then perform the download. The actual Mp3 file will be
						automatically uploaded to Firebase Cloud Storage at the time of upload request and then the request to
						download will use the provided cloud url.
					</p>
					<p>Follow these steps to download a Youtube video</p>
					<ol>
						<li>Go to youtube and find the video you would like to download.</li>
						<li>
							Either right click the video and copy the URL or open the video and copy the URL that is in your search
							bar.
						</li>
						<li>Paste the copied URL into the input field on this page and then click the upload button.</li>
						<li>
							Once the video finishes uploading click the download button and your new Mp3 file will be available!
						</li>
					</ol>
				</div>
			</div>
		</div>
	)
}

export default Youtube
