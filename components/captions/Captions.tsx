import { useRef, useState } from 'react'
import { BsTranslate } from 'react-icons/bs'
import classes from './styles/Captions.module.scss'
import UploadVideoBox from '../common/UploadVideoBox'
import { YoutubeSubtitle } from '@/pages/api/youtubeUpload'
import VideoPlayer from '../common/VideoPlayer'
import CaptionSection from './components/CaptionSection'

const Captions = (): JSX.Element => {
	const [downloadURL, setDownloadURL] = useState<string>('')
	const [videoTitle, setVideoTitle] = useState<string>('')
	const [videoCaptions, setVideoCaptions] = useState<YoutubeSubtitle[]>(null)

	const [timeElapsed, setTime] = useState(0)

	const videoRef = useRef<HTMLVideoElement>(null)

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<h2 className={classes.title}>
					<BsTranslate />
					Generate Captions
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
						<div className={classes.videoActions}></div>
					</div>
				) : (
					<UploadVideoBox
						setDownloadURL={setDownloadURL}
						setVideoTitle={setVideoTitle}
						setVideoCaptions={setVideoCaptions}
					/>
				)}
				{videoCaptions ? (
					<CaptionSection
						videoRef={videoRef}
						videoCaptions={videoCaptions}
						timeElapsed={timeElapsed}
						setTime={setTime}
					/>
				) : (
					<div className={classes.seoContent}>
						<p>
							This is a simple tool for you to use in order to take any Youtube video that you find and turn that videos
							audio into a downloadable mp3 file. This tool makes use of the youtubedl npm package in order to grab
							important information from a given youtube video such as the title and thumbnail and returnt that to the
							client to display. From there we can decide if this video is what we want to download and use the data
							returned from the package in order to download our new Mp3 file.
						</p>
						<p>
							This tool makes use of a Google Cloud NoSQL Database in order to store the information returned from the
							server about the requested video so that we can display this information properly to the user. At upload
							request time this information as well as a download URL for the video will be saved to a NoSQL document
							that we will use to display the information and then perform the download. The actual Mp3 file will be
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
								Once the video finishes uploading click the download button and your new Mp4 file will be available!
							</li>
						</ol>
					</div>
				)}
			</div>
		</div>
	)
}

export default Captions
