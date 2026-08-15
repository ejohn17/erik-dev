import Head from 'next/head'

import Home from 'components/home/Home'

const HomePage = () => {
	return (
		<>
			<Head>
				<title>Erik Johnston &mdash; Software Developer</title>
				<meta
					name="description"
					content="Erik Johnston is a full-stack developer in Kelowna, BC, building scalable SaaS products with React, Next.js, Node.js and AWS."
				/>
			</Head>
			<Home />
		</>
	)
}

export default HomePage
