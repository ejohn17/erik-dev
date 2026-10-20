import PageMeta from 'components/common/PageMeta'
import Captions from 'components/captions/Captions'

const CaptionsPage = () => {
	return (
		<>
			<PageMeta
				title="Caption Generator — Erik Johnston"
				description="Extract the captions from any YouTube video, translate them into another language, and download the subtitled video."
				path="/caption-generator"
			/>
			<Captions />
		</>
	)
}

export default CaptionsPage
