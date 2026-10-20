import { render, screen, within } from '@testing-library/react'
import Home from '@/components/home/Home'

describe('Home Component', () => {
	beforeEach(() => {
		render(<Home />)
	})

	describe('Hero', () => {
		it('names the role in the main heading', () => {
			expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
				'Erik JohnstonFull-Stack Software Developer',
			)
		})

		it('states location and remote availability', () => {
			expect(screen.getByText(/Kelowna, BC · Open to remote work across Canada/i)).toBeInTheDocument()
		})

		it('displays the profile image', () => {
			expect(screen.getByRole('img', { name: /headshot/i })).toHaveAttribute('src', '/images/headshot.jpeg')
		})

		it('links to resume, GitHub, LinkedIn and email', () => {
			expect(screen.getAllByRole('link', { name: 'Resume' })[0]).toHaveAttribute('href', '/files/resume.pdf')
			expect(screen.getAllByRole('link', { name: 'GitHub' })[0]).toHaveAttribute('href', 'https://github.com/ejohn17')
			expect(screen.getAllByRole('link', { name: 'LinkedIn' })[0]).toHaveAttribute(
				'href',
				'https://www.linkedin.com/in/erik-johnston-842225175/',
			)
			expect(screen.getAllByRole('link', { name: 'Email' })[0]).toHaveAttribute(
				'href',
				'mailto:johnstonerik17@gmail.com',
			)
		})

		it('shows when the resume was last updated', () => {
			expect(screen.getAllByText(/Resume PDF updated/i).length).toBeGreaterThan(0)
		})
	})

	describe('Highlights', () => {
		it('lists three proof points', () => {
			const list = screen.getByRole('list', { name: 'Highlights' })
			expect(within(list).getAllByRole('listitem')).toHaveLength(3)
		})
	})

	describe('Resume consistency', () => {
		it('uses the same numbers as the resume', () => {
			const text = document.body.textContent

			expect(text).toMatch(/5,000 monthly active users/)
			expect(text).toMatch(/15\+ client/)
			expect(text).toMatch(/two-person team/)
			expect(text).toMatch(/80%/)
			expect(text).toMatch(/roughly 40%/)
		})

		it('does not repeat claims that contradict the resume', () => {
			const text = document.body.textContent

			expect(text).not.toMatch(/10,000/)
			expect(text).not.toMatch(/team of 5/i)
			expect(text).not.toMatch(/60%|35%|50%/)
			expect(text).not.toMatch(/Claude 3/i)
			expect(text).not.toMatch(/6\+ years/i)
		})
	})

	describe('Experience', () => {
		it('lists every role from the resume, most recent first', () => {
			const section = document.getElementById('experience')
			const headings = within(section).getAllByRole('heading', { level: 3 })

			expect(headings[0]).toHaveTextContent(/Bubbas Closet/)
			expect(headings[1]).toHaveTextContent(/Xambi Tech \/ Plutaro Studio/)
			expect(headings[2]).toHaveTextContent(/Saturn Animation Studios/)
			expect(headings[3]).toHaveTextContent(/B\.S\. Computer Science/)
			expect(within(section).getByText('University of British Columbia Okanagan')).toBeInTheDocument()
		})
	})

	describe('Projects', () => {
		it('links to each case study', () => {
			expect(screen.getByRole('link', { name: /Bubbas Closet case study/i })).toHaveAttribute(
				'href',
				'/projects/bubbas-closet',
			)
			expect(screen.getByRole('link', { name: /Local Events & Specials App case study/i })).toHaveAttribute(
				'href',
				'/projects/okanagan-events',
			)
		})

		it('shows Kukarella with its public links', () => {
			expect(screen.getByRole('link', { name: 'kukarella.com' })).toHaveAttribute('href', 'https://www.kukarella.com')
			expect(screen.getByRole('link', { name: /Innovate BC/i })).toBeInTheDocument()
		})

		it('no longer shows the removed hobby tools or the empty blog card', () => {
			expect(screen.queryByText(/Youtube to mp3/i)).not.toBeInTheDocument()
			expect(screen.queryByText(/Technical Blog/i)).not.toBeInTheDocument()
			expect(screen.queryByText(/Coming soon/i)).not.toBeInTheDocument()
		})
	})

	describe('Skills', () => {
		it('uses the same groups as the resume', () => {
			const grid = screen.getByTestId('skills-categories')

			for (const group of ['Languages', 'Frontend & Backend', 'Data & Cloud', 'Tools & Practices']) {
				expect(within(grid).getByRole('heading', { name: group })).toBeInTheDocument()
			}
		})
	})
})
