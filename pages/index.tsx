import PageMeta from 'components/common/PageMeta'
import Home from 'components/home/Home'

const HomePage = () => {
	return (
		<>
			<PageMeta
				title="Erik Johnston — Full-Stack Software Developer"
				description="Full-stack TypeScript developer in Kelowna, BC. React, Next.js, Node.js, PostgreSQL and Firebase. Led Kukarella and two sibling SaaS products serving 5,000 monthly active users. Open to remote work across Canada."
				path="/"
			/>
			<Home />
		</>
	)
}

export default HomePage
