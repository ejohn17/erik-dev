import { useCallback, useMemo, useRef, useState } from 'react'
import classes from './styles/Captions.module.scss'

import { YoutubeSubtitle } from '@/pages/api/videos/youtubeUpload'
import languages from '@/utilities/languages'

import { BsTranslate } from 'react-icons/bs'
import { RxReset } from 'react-icons/rx'
import { PiTranslateThin } from 'react-icons/pi'

import UploadVideoBox from '../common/UploadVideoBox'
import VideoPlayer from '../common/VideoPlayer'
import CaptionSection from './components/CaptionSection'
import Select from 'react-select'
import axios from 'axios'
import Spinner from '../common/Spinner'
import { MdDownload } from 'react-icons/md'
import FileSaver from 'file-saver'
import { getVideoBlob, getVideoRef } from '@/firebaseUtils/storage'

const Captions = (): JSX.Element => {
	const [downloadURL, setDownloadURL] = useState<string>('')
	const [videoTitle, setVideoTitle] = useState<string>('')
	const [translating, setTranslating] = useState<boolean>(false)
	const [downloading, setDownloading] = useState<boolean>(false)
	const [videoCaptions, setVideoCaptions] = useState<YoutubeSubtitle[]>(null)

	const [translatedCaptions, setTranslatedCaptions] = useState<Record<string, YoutubeSubtitle[]>>({})

	const [currentLanguage, setCurrentLanguage] = useState({ value: 'en', label: 'English' })

	const [timeElapsed, setTime] = useState<number>(0)

	const videoRef = useRef<HTMLVideoElement>(null)

	const clearVideo = useCallback(() => {
		setDownloadURL('')
		setVideoTitle('')
	}, [])

	const handleSelectLang = useCallback((lang) => setCurrentLanguage(lang), [])

	const currentCaptions = useMemo(() => {
		if (currentLanguage.label !== 'en') {
			if (!!translatedCaptions[currentLanguage.value]) {
				return translatedCaptions[currentLanguage.value]
			}
			return videoCaptions
		}
		return videoCaptions
	}, [currentLanguage, translatedCaptions, videoCaptions])

	const activeCaption = useMemo(() => {
		if (!videoCaptions) return 0
		let captionIdx = 0
		for (let i = 0; i < videoCaptions.length - 1; i++) {
			const currentCaption = videoCaptions[i]
			const nextCaption = videoCaptions[i + 1]

			if (timeElapsed >= parseFloat(currentCaption.start) && timeElapsed < parseFloat(nextCaption.start)) {
				captionIdx = i
				break
			}
		}
		return captionIdx
	}, [timeElapsed, videoCaptions])

	const translateCaptions = useCallback(async () => {
		setTranslating(true)
		axios
			.post('/api/videos/translateCaptions', { captions: videoCaptions, language: currentLanguage.value })
			.then((resp) => {
				const newCaptions = { ...translateCaptions }
				newCaptions[currentLanguage.value] = resp.data.captions

				setTranslatedCaptions(newCaptions)
			})
			.finally(() => setTranslating(false))
	}, [currentLanguage, videoCaptions])

	const downloadTranslations = useCallback(async () => {
		setDownloading(true)
		axios
			.post('/api/videos/downloadTranslatedVideo', {
				cloudURL: downloadURL,
				captions: currentCaptions,
				title: videoTitle,
				lang: currentLanguage.label,
				langKey: currentLanguage.value,
			})
			.then((resp) => {
				const savedTitle = `${videoTitle.replace(/[/\\?%*:|"<>]/g, '')}-${currentLanguage.label}.mp4`
				const videoRef = getVideoRef(savedTitle)
				getVideoBlob(videoRef).then((videoBlob) => {
					FileSaver.saveAs(videoBlob, savedTitle)
					setDownloading(false)
				})
			})
	}, [currentCaptions, currentLanguage, downloadURL, videoTitle])

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<h2 className={classes.title}>
					<BsTranslate />
					Generate Captions
				</h2>
				{downloadURL ? (
					<>
						<div className={classes.loadedVideo}>
							<h3>{videoTitle.replaceAll('"', '')}</h3>
							<div className={classes.videoWrapper}>
								<VideoPlayer
									url={downloadURL}
									className={classes.videoPlayer}
									videoRef={videoRef}
									timeElapsed={timeElapsed}
									setTime={setTime}
								/>
								{!!currentCaptions[activeCaption] ? (
									<p className={classes.caption}>{currentCaptions[activeCaption].text}</p>
								) : null}
							</div>
						</div>
						<div className={classes.videoActions}>
							<div className={classes.languageSelection}>
								{!!translatedCaptions[currentLanguage.value] ? (
									<button onClick={downloadTranslations}>
										Download {downloading ? <Spinner className={classes.spinner} /> : <MdDownload />}
									</button>
								) : (
									<button onClick={translateCaptions}>
										Translate {translating ? <Spinner className={classes.spinner} /> : <PiTranslateThin />}
									</button>
								)}
								<Select
									// @ts-ignore
									options={languages.map((lang) => ({ value: lang.code, label: lang.label }))}
									value={currentLanguage}
									onChange={handleSelectLang}
								/>
							</div>
							<button onClick={clearVideo}>
								Reset <RxReset />
							</button>
						</div>
					</>
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
						videoCaptions={currentCaptions}
						setTime={setTime}
						activeCaption={activeCaption}
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
