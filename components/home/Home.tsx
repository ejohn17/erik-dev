import Link from 'next/link'
import classes from './styles/Home.module.scss'
import { IoIosArrowRoundForward } from 'react-icons/io'

const Home = (): JSX.Element => {
	return (
		<div className={classes.root}>
			<section className={classes.introduction}>
				<div className={classes.introductionContent}>
					<div className={classes.hook}>
						<div className={classes.hookInfo}>
							<h1>
								<span className={classes.name}>Erik Johnston</span>
								<br />
								Software
								<br />
								Developer.
							</h1>
							<p>
								Senior Full-stack Developer crafting scalable SaaS solutions
								<br />
								Leading teams to deliver high-impact software products
							</p>
						</div>
						<div className={classes.headshot}>
							<img src="/images/headshot.jpeg" alt="headshot" />
						</div>
					</div>
					<div className={classes.tags}>
						<p className={classes.tag}>
							Proven track record of leading development teams and architecting complex SaaS solutions using React,
							Next.js, Node.js, and AWS cloud technologies.
						</p>
						<p className={classes.tag}>
							Expertise in building scalable frontend applications and robust backend systems, with a focus on
							performance optimization and clean architecture.
						</p>
					</div>
				</div>
			</section>

			<section className={classes.skills}>
				<div className={classes.skillsContent}>
					<h2>Technical Expertise</h2>
					<div className={classes.skillCategories} data-testid="skills-categories">
						<div className={classes.skillCategory}>
							<h3>Frontend Development</h3>
							<ul>
								<li>React.js / Next.js</li>
								<li>TypeScript / JavaScript</li>
								<li>SCSS / CSS3</li>
								<li>Modern UI/UX Design</li>
							</ul>
						</div>
						<div className={classes.skillCategory}>
							<h3>Backend Development</h3>
							<ul>
								<li>Node.js / Express</li>
								<li>RESTful APIs</li>
								<li>Database Design</li>
								<li>System Architecture</li>
							</ul>
						</div>
						<div className={classes.skillCategory}>
							<h3>DevOps & Tools</h3>
							<ul>
								<li>AWS Cloud Services</li>
								<li>CI/CD Pipelines</li>
								<li>Git / Version Control</li>
								<li>Agile Methodologies</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className={classes.aboutMe}>
				<div className={classes.aboutMeContent}>
					<div className={classes.information}>
						<h2>Professional Journey</h2>
						<p>
							As Lead Developer at Saturn Animation Studios, I spearheaded the development of multiple enterprise-scale
							SaaS platforms, managing a team of 5 developers and delivering solutions that served over 10,000 active
							users.
						</p>
						<div className={classes.achievements}>
							<h3>Key Achievements</h3>
							<ul>
								<li>
									Architected and delivered 2 new SaaS platforms from concept to production, reducing deployment time by
									40% through implementation of modern CI/CD practices
								</li>
								<li>
									Led a complete technical overhaul of a legacy system, resulting in 60% improved performance and 35%
									reduction in maintenance costs
								</li>
								<li>
									Established development best practices and mentoring programs, leading to a 50% reduction in
									production bugs and improved team velocity
								</li>
							</ul>
						</div>
						<p>
							My journey began at the University of British Columbia Okanagan, where I earned my Bachelor of Science in
							Computer Science. Through hands-on experience and continuous learning, I&apos;ve developed expertise in
							building scalable, maintainable software solutions that drive business value.
						</p>
					</div>
					<div className={classes.kelownaContainer}>
						<div className={classes.kelowna}>
							<img src="/images/kelowna.jpg" alt="kelowna" />
						</div>
					</div>
				</div>
			</section>

			<section className={classes.apps}>
				<div className={classes.appsContent}>
					<div className={classes.heading}>
						<h2>Practice Exercises & Tools</h2>
						<p>Personal projects showcasing practical applications and continuous learning</p>
					</div>
					<div className={classes.exercises}>
						<div className={classes.exercise}>
							<h3>Youtube to mp3</h3>
							<p>Full-stack application demonstrating API integration and file processing capabilities.</p>
							<Link href="/youtube-to-mp3">
								<button>
									View Project
									<IoIosArrowRoundForward />
								</button>
							</Link>
						</div>
						<div className={classes.exercise}>
							<h3>Caption Generator</h3>
							<p>
								Multilingual processing tool showcasing natural language processing and translation API integration.
							</p>
							<Link href="/caption-generator">
								<button>
									View Project
									<IoIosArrowRoundForward />
								</button>
							</Link>
						</div>
						<div className={classes.exercise}>
							<h3>Technical Blog</h3>
							<p>Sharing insights and best practices from real-world software development experiences.</p>
							<button className={classes.disabled}>
								Coming soon
								<IoIosArrowRoundForward />
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Home
