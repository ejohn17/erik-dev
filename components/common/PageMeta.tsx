import Head from 'next/head'

import { SITE_URL } from 'components/layout/navigation'

const DEFAULT_IMAGE = '/images/og.png'

interface PageMetaProps {
	title: string
	description: string
	/** Site-relative path of the page, e.g. `/projects/bubbas-closet`. */
	path: string
	/** Site-relative path of a 1200×630 preview image. */
	image?: string
}

const PageMeta = ({ title, description, path, image = DEFAULT_IMAGE }: PageMetaProps): JSX.Element => {
	const url = `${SITE_URL}${path}`
	const imageUrl = `${SITE_URL}${image}`

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={url} />

			<meta property="og:type" content="website" />
			<meta property="og:site_name" content="Erik Johnston" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={imageUrl} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={imageUrl} />
		</Head>
	)
}

export default PageMeta
