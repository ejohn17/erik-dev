import Head from 'next/head'

import Youtube from 'components/youtube/Youtube'

const YoutubePage = () => {
	return (
		<>
			<Head>
				<title>Youtube to Mp3 &mdash; Erik Johnston</title>
				<meta
					name="description"
					content="Paste a YouTube link, preview the video, and download its audio track as an MP3 file."
				/>
			</Head>
			<Youtube />
		</>
	)
}

export default YoutubePage
