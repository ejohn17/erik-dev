import classes from './styles/Home.module.scss'

const Home = (): JSX.Element => {
	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<div className={classes.welcome}></div>
			</div>
		</div>
	)
}

export default Home
