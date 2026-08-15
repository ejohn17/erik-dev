import { useCallback, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import FileSaver from 'file-saver'

import { BsTranslate } from 'react-icons/bs'
import { MdDownload } from 'react-icons/md'
import { RxReset } from 'react-icons/rx'

import Button from 'components/common/Button'
import Card from 'components/common/Card'
import Select from 'components/common/Select'
import ToolPage from 'components/common/ToolPage'
import UploadVideoBox from 'components/common/UploadVideoBox'
import VideoPlayer from 'components/common/VideoPlayer'
import CaptionSection from './components/CaptionSection'

import { YoutubeSubtitle } from '@/pages/api/videos/youtubeUpload'
import { getVideoBlob, getVideoRef } from '@/firebaseUtils/storage'
import languages from '@/utilities/languages'

import classes from './styles/Captions.module.scss'

const SOURCE_LANGUAGE = 'en'

const languageOptions = languages.map((language) => ({ value: language.code, label: language.label }))

const steps = [
	'Find the video you want on YouTube.',
	'Copy its URL from the address bar, or right click the video and copy the link.',
	'Paste the URL into the field above and press upload.',
	'Pick a language, generate the translation, then watch it live or download the subtitled video.',
]

const about = (
	<>
		<p>
			This is a simple tool for pulling the captions out of any YouTube video. Once they are loaded you can translate
			them into any supported language, follow along with the transcript, and see the translated captions play back on
			the video itself.
		</p>
		<p>
			Video details are stored in a Google Cloud NoSQL database alongside a download URL, and the media is uploaded to
			Firebase Cloud Storage at request time. Downloading burns the captions you generated into the video as an optional
			subtitle track.
		</p>
	</>
)

const Captions = (): JSX.Element => {
	const [downloadURL, setDownloadURL] = useState<string>('')
	const [videoTitle, setVideoTitle] = useState<string>('')
	const [videoCaptions, setVideoCaptions] = useState<YoutubeSubtitle[]>(null)
	const [translatedCaptions, setTranslatedCaptions] = useState<Record<string, YoutubeSubtitle[]>>({})
	const [language, setLanguage] = useState<string>(SOURCE_LANGUAGE)
	const [translating, setTranslating] = useState<boolean>(false)
	const [downloading, setDownloading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [timeElapsed, setTime] = useState<number>(0)

	const videoRef = useRef<HTMLVideoElement>(null)

	const languageLabel = useMemo(
		() => languageOptions.find((option) => option.value === language)?.label ?? language,
		[language],
	)

	const currentCaptions = useMemo(() => {
		if (language === SOURCE_LANGUAGE) return videoCaptions
		return translatedCaptions[language] ?? videoCaptions
	}, [language, translatedCaptions, videoCaptions])

	const isTranslated = language === SOURCE_LANGUAGE || !!translatedCaptions[language]

	const activeCaption = useMemo(() => {
		if (!currentCaptions?.length) return 0
		const upcoming = currentCaptions.findIndex((caption) => parseFloat(caption.start) > timeElapsed)
		return upcoming === -1 ? currentCaptions.length - 1 : Math.max(upcoming - 1, 0)
	}, [currentCaptions, timeElapsed])

	const clearVideo = useCallback(() => {
		setDownloadURL('')
		setVideoTitle('')
		setVideoCaptions(null)
		setTranslatedCaptions({})
		setLanguage(SOURCE_LANGUAGE)
		setError('')
		setTime(0)
	}, [])

	const translateCaptions = useCallback(async () => {
		setTranslating(true)
		setError('')

		try {
			const { data } = await axios.post('/api/videos/translateCaptions', { captions: videoCaptions, language })
			setTranslatedCaptions((previous) => ({ ...previous, [language]: data.captions }))
		} catch {
			setError('We could not translate those captions. Please try again.')
		} finally {
			setTranslating(false)
		}
	}, [language, videoCaptions])

	const downloadTranslations = useCallback(async () => {
		setDownloading(true)
		setError('')

		const savedTitle = `${videoTitle.replace(/[/\\?%*:|"<>]/g, '')}-${languageLabel}.mp4`

		try {
			await axios.post('/api/videos/downloadTranslatedVideo', {
				cloudURL: downloadURL,
				captions: currentCaptions,
				title: videoTitle,
				lang: languageLabel,
				langKey: language,
			})
			const videoBlob = await getVideoBlob(getVideoRef(savedTitle))
			FileSaver.saveAs(videoBlob, savedTitle)
		} catch {
			setError('We could not build that download. Please try again.')
		} finally {
			setDownloading(false)
		}
	}, [currentCaptions, downloadURL, language, languageLabel, videoTitle])

	const activeCaptionText = currentCaptions?.[activeCaption]?.text

	return (
		<ToolPage
			icon={<BsTranslate />}
			title="Caption Generator"
			description="Pull the captions out of a YouTube video, translate them, and download the subtitled result."
			steps={steps}
			about={about}
		>
			{downloadURL ? (
				<div className={classes.workspace}>
					<div className={classes.stage}>
						<h2 className={classes.videoTitle}>{videoTitle.replaceAll('"', '')}</h2>
						<VideoPlayer
							url={downloadURL}
							videoRef={videoRef}
							timeElapsed={timeElapsed}
							setTime={setTime}
							overlay={activeCaptionText ? <p className={classes.caption}>{activeCaptionText}</p> : null}
						/>
						<Card padding="sm" className={classes.toolbar}>
							<Select
								containerClassName={classes.languageSelect}
								label="Caption language"
								options={languageOptions}
								value={language}
								onChange={setLanguage}
								disabled={translating || downloading}
							/>
							<div className={classes.toolbarActions}>
								{isTranslated ? (
									<Button onClick={downloadTranslations} loading={downloading} icon={<MdDownload />}>
										Download
									</Button>
								) : (
									<Button onClick={translateCaptions} loading={translating} icon={<BsTranslate />}>
										Translate
									</Button>
								)}
								<Button onClick={clearVideo} variant="secondary" icon={<RxReset />}>
									Reset
								</Button>
							</div>
						</Card>
						{error ? (
							<p className={classes.error} role="alert">
								{error}
							</p>
						) : null}
					</div>

					{currentCaptions?.length ? (
						<Card padding="none" className={classes.transcript}>
							<div className={classes.transcriptHeader}>
								<h3 className={classes.transcriptTitle}>Transcript</h3>
								<span className={classes.transcriptMeta}>
									{languageLabel} &middot; {currentCaptions.length} lines
								</span>
							</div>
							<CaptionSection
								videoRef={videoRef}
								videoCaptions={currentCaptions}
								setTime={setTime}
								activeCaption={activeCaption}
							/>
						</Card>
					) : null}
				</div>
			) : (
				<UploadVideoBox
					setDownloadURL={setDownloadURL}
					setVideoTitle={setVideoTitle}
					setVideoCaptions={setVideoCaptions}
					description="We fetch the video and its caption track so you can translate and re-download it."
				/>
			)}
		</ToolPage>
	)
}

export default Captions
