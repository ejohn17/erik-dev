import Link from 'next/link'
import classes from './styles/Home.module.scss'
import { FaArrowRightLong } from 'react-icons/fa6'
import { IoIosArrowRoundForward } from 'react-icons/io'

const Home = (): JSX.Element => {
	return (
		<div className={classes.root}>
			<section className={classes.introduction}>
				<div className={classes.introductionContent}>
					<div className={classes.hook}>
						<div className={classes.hookInfo}>
							<h1>
								Software
								<br />
								Developer.
							</h1>
							<p>
								Constantly looking to improve and discover more
								<br /> about what I do not know
							</p>
						</div>
						<div className={classes.headshot}>
							<img src="/images/headshot.jpeg" />
						</div>
					</div>
					<div className={classes.tags}>
						<p className={classes.tag}>
							Experience working as both team lead as well as many years working within a team.
						</p>
						<p className={classes.tag}>
							Proven experience working with both frontend and backend systems to a professional degree.
						</p>
					</div>
				</div>
			</section>
			<section className={classes.aboutMe}>
				<div className={classes.aboutMeContent}>
					<div className={classes.information}>
						<h2>About me,</h2>
						<p>
							I started by attending the University of British Columbia Okanagan campus in Kelowna British Columbia,
							here I revieved my Bachelors of Science degree with a major in computer science
						</p>
						<p>
							I decided to pursue computer science when I realized I was attending the University and at a loss about
							what path I was going to pursue. It was an easy decision to make however as computers have always been a
							large part in my life so I decided to take a programming course to see what it was all about and
							haven&apos;t had to look back since.
						</p>
						<p>
							I began working with Saturn Animation Studios a local company in Kelowna through the co-op program at the
							end of my third year and continued working there for the next 4 years.
						</p>
						<p>
							While working at Saturn I began with no production experience and eventually found a knack for frontend UI
							design as I had taken a class in school that focused here. I began not exremely proficient in this area,
							though it quickly became something I was quite good at while working and became my primary task for the
							first 2 years in the position.
						</p>
						<p>
							After 2 years I became the lead programmer for Saturn and resultingly shifted my focus away from UI to
							backend API development as well as frontend functional integration handling basically any functional logic
							that the website had to ask for. As of now I have the complete development of 2 new SaaS websites and a
							full overhaul of a third site under my belt becoming proficient in essentially anything that web
							development has to offer.
						</p>
					</div>
					<div className={classes.kelownaContainer}>
						<div className={classes.kelowna}>
							<img src="/images/kelowna.jpg" />
						</div>
					</div>
				</div>
			</section>
			<section className={classes.apps}>
				<div className={classes.appsContent}>
					<div className={classes.heading}>
						<h2>Practice Exercises</h2>
					</div>
					<div className={classes.exercises}>
						<div className={classes.exercise}>
							<h3>Youtube to mp3</h3>
							<p>Convert any youtube video into a downloadable mp3 for all your listening needs.</p>
							<Link href="/youtube-to-mp3">
								<button>
									Next
									<IoIosArrowRoundForward />
								</button>
							</Link>
						</div>
						<div className={classes.exercise}>
							<h3>Caption Generator</h3>
							<p>
								Grab the captions for any youtube video and download it with fully translated captions so you can
								understand any video no matter the original language.
							</p>
							<Link href="/caption-generator">
								<button>
									Next
									<IoIosArrowRoundForward />
								</button>
							</Link>
						</div>
						<div className={classes.exercise}>
							<h3>Blog</h3>
							<p>Create an article and provide the information you possess for others to see.</p>
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
