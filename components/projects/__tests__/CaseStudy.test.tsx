import { render, screen } from '@testing-library/react'

import CaseStudy from '../CaseStudy'
import { getCaseStudy } from 'content/projects'

describe('CaseStudy', () => {
	it('covers every section of the case study template', () => {
		render(<CaseStudy study={getCaseStudy('bubbas-closet')} />)

		expect(screen.getByRole('heading', { level: 1, name: 'Bubbas Closet' })).toBeInTheDocument()
		expect(screen.getByRole('img', { name: /mybubbascloset\.ca homepage/i })).toBeInTheDocument()

		for (const heading of [/My role/, /Stack/, /Architecture/, /Hardest problem/, /What I'd do next/, /Links/]) {
			expect(screen.getByRole('heading', { level: 2, name: heading })).toBeInTheDocument()
		}
	})

	it('links to the live site and the code', () => {
		render(<CaseStudy study={getCaseStudy('bubbas-closet')} />)

		expect(screen.getAllByRole('link', { name: 'Live site' })[0]).toHaveAttribute('href', 'https://mybubbascloset.ca')
		expect(screen.getAllByRole('link', { name: 'Code on GitHub' })[0]).toHaveAttribute(
			'href',
			'https://github.com/ejohn17/bubbas-closet',
		)
	})

	it('explains why a private project has no links and does not claim a store launch', () => {
		render(<CaseStudy study={getCaseStudy('okanagan-events')} />)

		expect(screen.getAllByText(/private while it is in development/i).length).toBeGreaterThan(0)
		expect(screen.getByText('In development')).toBeInTheDocument()
		expect(document.body.textContent).not.toMatch(/available on the App Store/i)
	})

	it('links on to the other case study', () => {
		render(<CaseStudy study={getCaseStudy('bubbas-closet')} />)

		expect(screen.getByRole('link', { name: /Next case study/i })).toHaveAttribute('href', '/projects/okanagan-events')
	})
})
