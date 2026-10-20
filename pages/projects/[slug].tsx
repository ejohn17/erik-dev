import { GetStaticPaths, GetStaticProps } from 'next'

import PageMeta from 'components/common/PageMeta'
import CaseStudy from 'components/projects/CaseStudy'
import { caseStudies, getCaseStudy } from 'content/projects'

interface ProjectPageProps {
	slug: string
}

const ProjectPage = ({ slug }: ProjectPageProps) => {
	const study = getCaseStudy(slug)

	return (
		<>
			<PageMeta
				title={`${study.title} case study — Erik Johnston`}
				description={study.summary}
				path={`/projects/${study.slug}`}
			/>
			<CaseStudy study={study} />
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: caseStudies.map(({ slug }) => ({ params: { slug } })),
	fallback: false,
})

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({ params }) => ({
	props: { slug: String(params?.slug) },
})

export default ProjectPage
