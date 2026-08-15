import Head from 'next/head'

import Captions from 'components/captions/Captions'

const CaptionsPage = () => {
	return (
		<>
			<Head>
				<title>Caption Generator &mdash; Erik Johnston</title>
				<meta
					name="description"
					content="Extract the captions from any YouTube video, translate them into another language, and download the subtitled video."
				/>
			</Head>
			<Captions />
		</>
	)
}

export default CaptionsPage
