import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import Home from '@/components/home/Home'

describe('Home Component', () => {
	beforeEach(() => {
		render(<Home />)
	})

	describe('Introduction Section', () => {
		it('renders the main heading', () => {
			expect(screen.getByText(/Developer\./i)).toBeInTheDocument()
		})

		it('displays the profile image', () => {
			const headshot = screen.getByRole('img', { name: /headshot/i })
			expect(headshot).toBeInTheDocument()
			expect(headshot).toHaveAttribute('src', '/images/headshot.jpeg')
		})

		it('renders experience tags', () => {
			expect(screen.getByText(/Proven track record of leading/i)).toBeInTheDocument()
			expect(screen.getByText(/Expertise in building scalable frontend applications/i)).toBeInTheDocument()
		})
	})

	describe('Skills Section', () => {
		it('renders the Technical Expertise heading', () => {
			expect(screen.getByText(/Technical Expertise/i)).toBeInTheDocument()
		})

		it('displays all skill categories', () => {
			expect(screen.getByText(/Frontend Development/i)).toBeInTheDocument()
			expect(screen.getByText(/Backend Development/i)).toBeInTheDocument()
			expect(screen.getByText(/DevOps & Tools/i)).toBeInTheDocument()
		})

		describe('Frontend Development Skills', () => {
			it('lists all frontend technologies', () => {
				const frontendSkills = [
					/React\.js \/ Next\.js/i,
					/TypeScript \/ JavaScript/i,
					/SCSS \/ CSS3/i,
					/Modern UI\/UX Design/i,
				]

				frontendSkills.forEach((skill) => {
					expect(screen.getByText(skill)).toBeInTheDocument()
				})
			})
		})

		describe('Backend Development Skills', () => {
			it('lists all backend technologies', () => {
				const backendSkills = [/Node\.js \/ Express/i, /RESTful APIs/i, /Database Design/i, /System Architecture/i]

				backendSkills.forEach((skill) => {
					expect(screen.getByText(skill)).toBeInTheDocument()
				})
			})
		})

		describe('DevOps Skills', () => {
			it('lists all DevOps tools and practices', () => {
				const devOpsSkills = [
					/AWS Cloud Services/i,
					/CI\/CD Pipelines/i,
					/Git \/ Version Control/i,
					/Agile Methodologies/i,
				]

				devOpsSkills.forEach((skill) => {
					expect(screen.getByText(skill)).toBeInTheDocument()
				})
			})
		})
	})

	describe('About Me Section', () => {
		it('renders the about me heading', () => {
			expect(screen.getByText(/Professional Journey/i)).toBeInTheDocument()
		})

		it('displays the Kelowna image', () => {
			const kelownaImg = screen.getByRole('img', { name: /kelowna/i })
			expect(kelownaImg).toBeInTheDocument()
			expect(kelownaImg).toHaveAttribute('src', '/images/kelowna.jpg')
		})

		it('contains education information', () => {
			expect(screen.getByText(/University of British Columbia Okanagan/i)).toBeInTheDocument()
		})

		it('contains work experience information', () => {
			expect(screen.getByText(/Saturn Animation Studios/i)).toBeInTheDocument()
		})
	})

	describe('Practice Exercises Section', () => {
		it('renders the section heading', () => {
			expect(screen.getByText(/Practice Exercises/i)).toBeInTheDocument()
		})

		it('displays all exercise cards', () => {
			expect(screen.getByText(/Youtube to mp3/i)).toBeInTheDocument()
			expect(screen.getByText(/Caption Generator/i)).toBeInTheDocument()
			expect(screen.getByText(/Blog/i)).toBeInTheDocument()
		})

		it('shows correct status for upcoming features', () => {
			expect(screen.getByText(/Coming soon/i)).toBeInTheDocument()
		})

		it('renders navigation links for available exercises', () => {
			const links = screen.getAllByRole('link')
			expect(links).toHaveLength(2) // Youtube to mp3 and Caption Generator
			expect(links[0]).toHaveAttribute('href', '/youtube-to-mp3')
			expect(links[1]).toHaveAttribute('href', '/caption-generator')
		})
	})
})
