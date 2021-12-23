import React, { useContext } from "react";
import { Grid, Paper, Typography, Table, TableBody, TableRow, TableCell, Button, makeStyles } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import Day from "./Day";
import { ColorModeContext } from "./context/ThemeProvider";

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(1),
		height: "100%"
	},
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
		}
	},
	body: {
		backgroundColor: theme.palette.bodyBackground
	},
	noMargin: {
		margin: 0,
		width: "100%",
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
	const toggleColorMode = useContext(ColorModeContext)

	const { loading, error, data } = useQuery(QUERY);

	if (loading) return <Typography align="center">Loading...</Typography>;
	if (error) {
		console.error(error);
		return <Typography align="center">Error grabbing data: {error.messsage}</Typography>;
	}

	return (
		<div className={`${classes.virtCenter} ${classes.body}`}>
			<Grid
				container
				justifyContent="center"
				alignItems="stretch"
				spacing={1}
				className={`${classes.virtCenterChild} ${classes.noMargin}`}
			>
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<div className={classes.virtCenter} style={{ flexDirection: "column" }}>
							{data.today ? (
								<Day today={data.today} />
							) : (
								<Typography className={classes.bold}>No schedule data for today.</Typography>
							)}
						</div>
					</Paper>
				</Grid>
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography align="center" className={classes.bold}>
							This Week
						</Typography>
						<Table>
							<TableBody>
								{data.upcomingEvents.map(ev => (
									<TableRow key={ev.id}>
										<TableCell>
											{
												["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
													new Date(ev.date).getUTCDay()
												]
											}
											, {ev.date.split("-")[1]}/{ev.date.split("-")[2]}
										</TableCell>
										<TableCell>{ev.name}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography className={classes.bold} align="center">
							Quick Links
						</Typography>
						<Grid
							container
							alignItems="center"
							alignContent="center"
							justifyContent="space-around"
							style={{ height: "100%" }}
							spacing={1}
						>
							<Grid item xs={6}>
								<Button fullWidth variant="contained" color="primary" onClick={toggleColorMode}>
									Toggle Dark Mode
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button fullWidth variant="contained" color="primary">
									Health Screening
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button fullWidth variant="contained" color="primary">
									Health Screening
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button fullWidth variant="contained" color="primary">
									Health Screening
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
			<Grid
				container
				className={`${classes.virtCenterChild} ${classes.noMargin}`}
				justifyContent="center"
				alignItems="stretch"
				spacing={1}
			>
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
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
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography className={classes.bold} align="center">
							Caucus Announcements
						</Typography>
						<Typography
							className={classes.html}
							dangerouslySetInnerHTML={{
								__html:
									data.currentAnnouncements.find(ann => ann.category === "caucus")?.announcement ||
									"No Announcement Found"
							}}
						/>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Home;
