import React, { useState } from "react";
import { Grid, Paper, Typography, Table, TableBody, TableRow, TableCell, Button, makeStyles } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import Day from "./Day";
import ThemeDialog from "./ThemeDialog";
import ApiDialog from "./ApiDialog";
const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(1),
		height: "100%",
		background: theme.palette.boxColor || undefined
	},
	// have fun :)
	...(
		theme.palette.boxes ?
			(Object.fromEntries(Array(5).fill()
				.map((__, i) => ["paper" + (i+1), {
					background: theme.palette.boxes[i],
					color:
						(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(theme.palette.boxes[i])
							.slice(1, 4)
							.reduce((a, b, i) => a + parseInt(b, 16) * [0.299, 0.587, 0.114][i], 0)
							> 186 ? "#000000" : "#ffffff")
						+ " !important"
						}]
				))) :
			{}
	),
	// takes an array of five colors - theme.palette.boxes
	// turns each one into an object with background set to the color and foreground set to black or white (see stackoverflow below)
	// https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
	// puts those objects into an array, first element being paper1..5, creating a 5-length array of 2-length arrays
	// turns those 2-length arrays (treating them as object entries, see Object.entries/Object.fromEntries at MDN for more info) into an object
	// unpacks that object into the classes object this comment is in right now
	// result is classes for paper1..5 with background and color set
	virtCenter: {
		display: "flex",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
		flexWrap: "wrap",
		minHeight: "100%"
	},
	virtCenterChild: {
		padding: theme.spacing(1)
	},
	bold: { fontWeight: "bold" },
	html: {
		"& *": {
			margin: 0
		},
		"& a": {
			fontWeight: "bold",
			color: `${theme.palette.primary.main} !important`
		}
	},
	body: {
		backgroundColor: theme.palette.bodyBackground
	},
	noMargin: {
		margin: 0,
		width: "100%",
	},
	button: {
		height: "100%",
		textAlign: "center"
	},
	fullscreen: {
		position: "fixed",
		height: "100%",
		width: "100%",
		top: "0",
		left: "0",
		zIndex: "1000"
	},
	relative: {
		position: "relative"
	},
	spacer: {
		display: "none",
		[theme.breakpoints.only("md")]: {
			display: "block"
		}
	},
	noDisplay: {
		display: "none"
	},
	scroll: {
		overflowY: "auto",
		maxHeight: "300px"
	}
}));

const QUERY = gql`
	query {
		today {
			block
			testing
			schedule {
				schedule
				name
			}
		}
		currentAnnouncements {
			announcement
			category
		}
		upcomingEvents {
			date
			name
			id
		}
	}
`;

function Home() {
	const classes = useStyles();

	const { loading, error, data } = useQuery(QUERY);
	const [fullscreen, setFullscreen] = useState(false)

	const [tdOpen, setTdOpen] = useState(false)
	const [apiOpen, setApiOpen] = useState(false)

	if (loading) return <Typography align="center">Loading...</Typography>;
	if (error) {
		console.error(error);
		return <Typography align="center">Error grabbing data: {error.messsage}</Typography>;
	}

	return (
		<>
			<ThemeDialog tdOpen={tdOpen} tdClose={() => setTdOpen(false)}/>
			<ApiDialog apiOpen={apiOpen} apiClose={() => setApiOpen(false)}/>
			<div className={`${classes.virtCenter} ${classes.body}`}>
				<Grid
					container
					justifyContent="center"
					alignItems="stretch"
					spacing={1}
					className={`${classes.virtCenterChild} ${classes.noMargin}`}
				>
					<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
					<Grid item xl={3} lg={4} md={6} sm={8} xs={12}>
						<Paper className={fullscreen ? `${classes.paper} ${classes.fullscreen} ${classes.paper1}` : `${classes.paper} ${classes.relative} ${classes.paper1}`}>
							<div className={classes.virtCenter}>
								<div className={classes.virtCenter} style={{ flexDirection: "column" }}>
									{data.today ? (
										<Day today={data.today} setFullscreen={setFullscreen} fullscreen={fullscreen} />
									) : (
										<Typography className={classes.bold}>No schedule data for today.</Typography>
									)}
								</div>
							</div>
						</Paper>
					</Grid>
					<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
					<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
					<Grid item className={fullscreen && classes.noDisplay} xl={3} lg={4} md={6} sm={8} xs={12}>
						<Paper className={`${classes.paper} ${classes.scroll} ${classes.paper2}`}>
							<Typography align="center" className={classes.bold}>
								Upcoming Events
							</Typography>
							<Table>
								<TableBody>
									{data.upcomingEvents.map(ev => (
										<TableRow key={ev.id}>
											<TableCell className={classes.paper2}>
												{
													["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
														new Date(ev.date).getUTCDay()
													]
												}
												, {ev.date.split("-")[1]}/{ev.date.split("-")[2]}
											</TableCell>
											<TableCell className={classes.paper2}>{ev.name}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Paper>
					</Grid>
					<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
					<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
					<Grid item className={fullscreen && classes.noDisplay} xl={3} lg={4} md={6} sm={8} xs={12}>
						<Paper className={`${classes.paper} ${classes.paper3}`}>
							<Typography className={classes.bold} align="center">
								Quick Links
							</Typography>
							<Grid
								container
								alignItems="stretch"
								alignContent="center"
								justifyContent="space-around"
								spacing={1}
							>
								<Grid item xs={6}>
									<Button className={classes.button} fullWidth variant="contained" color="primary" onClick={() => setTdOpen(true)}>
										Change Theme
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://healthscreening.schools.nyc/" target="_blank">
										Health Screening
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://stuy.libguides.com/stuylib" target="_blank">
										Library Website
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://auth.ioeducation.com/users/sign_in" target="_blank">
										PupilPath/Skedula
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://talos.stuy.edu/cms/pages/stuyvesant-blog/" target="_blank">
										Stuyvesant Blog
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://talos.stuy.edu/" target="_blank">
										Talos
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://stuy.entest.org/Stuyvesant%20HS%20Early%20Excuse%20form%202021-22.pdf" target="_blank">
										Early Excuse Form
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://docs.google.com/forms/d/e/1FAIpQLSe9RTY0O8GkvnBE-P0VSh3TsH-ry57hanE8t5nOnq9UH3z9KQ/viewform" target="_blank">
										Attendance Form
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://stuy.edu" target="_blank">
										Stuy Website
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://stuysu.org" target="_blank">
										Student Union
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://docs.google.com/forms/d/e/1FAIpQLSepfBAG922lzR32cYbhB9LsppePddO1qe0WgeveBflweel5pQ/viewform" target="_blank">
										Morning Ad Form
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button className={classes.button} fullWidth variant="contained" color="primary" onClick={() => setApiOpen(true)}>
										Use the API
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
				</Grid>
				<Grid
					container
					className={`${classes.virtCenterChild} ${classes.noMargin}`}
					justifyContent="center"
					alignItems="stretch"
					spacing={1}
				>
					<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
					<Grid item className={fullscreen && classes.noDisplay} xl={3} lg={4} md={6} sm={8} xs={12}>
						<Paper className={`${classes.paper} ${classes.paper4}`}>
							<Typography className={classes.bold} align="center">
								General Announcements
							</Typography>
							<Typography
								className={classes.html}
								dangerouslySetInnerHTML={{
									__html:
										data.currentAnnouncements.find(ann => ann.category === "general")?.announcement ||
										"No Announcement Found"
								}}
							/>
						</Paper>
					</Grid>
					<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
					<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
					<Grid item className={fullscreen && classes.noDisplay} xl={3} lg={4} md={6} sm={8} xs={12}>
						<Paper className={`${classes.paper} ${classes.paper5}`}>
							<Typography className={classes.bold} align="center">
								Morning Announcements
							</Typography>
							<Typography
								className={classes.html}
								dangerouslySetInnerHTML={{
									__html:
										data.currentAnnouncements.find(ann => ann.category === "morning")?.announcement ||
										"No Announcement Found"
								}}
							/>
						</Paper>
					</Grid>
					<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
				</Grid>
			</div>
		</>
	);
}

export default Home;
