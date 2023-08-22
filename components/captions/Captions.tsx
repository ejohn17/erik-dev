import { useRef, useState } from 'react'
import { BsTranslate } from 'react-icons/bs'
import classes from './styles/Captions.module.scss'
import UploadVideoBox from '../common/UploadVideoBox'
import { YoutubeSubtitle } from '@/pages/api/youtubeUpload'
import VideoPlayer from '../common/VideoPlayer'

const Captions = (): JSX.Element => {
	const [downloadURL, setDownloadURL] = useState<string>('')
	const [videoTitle, setVideoTitle] = useState<string>('')
	const [videoCaptions, setVideoCaptions] = useState<YoutubeSubtitle[]>(null)

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
						<VideoPlayer url={downloadURL} className={classes.videoPlayer} videoRef={videoRef} />
						<div className={classes.videoActions}></div>
					</div>
				) : (
					<UploadVideoBox
						setDownloadURL={setDownloadURL}
						setVideoTitle={setVideoTitle}
						setVideoCaptions={setVideoCaptions}
					/>
				)}
			</div>
		</div>
	)
}

export default Captions
