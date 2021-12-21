import React from "react";
import {
	Grid,
	Paper,
	Typography,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Button,
	makeStyles
} from "@material-ui/core";
import {gql, useQuery} from "@apollo/client"
import Day from "./Day";

const useStyles = makeStyles((theme) => ({
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
	bold: {fontWeight: "bold"}
}))

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
		}
	}
`;

function Home() {
	const classes = useStyles();

	const { loading, error, data } = useQuery(QUERY);

	if (loading) return <Typography align="center">Loading...</Typography>
	if (error) {
		console.error(error)
		return <Typography align="center">Error grabbing data: {error.messsage}</Typography>
	}

	return (
		<div className={classes.virtCenter}>
			<Grid container justifyContent="center" alignItems="stretch" spacing={1} className={classes.virtCenterChild}>
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<div className={classes.virtCenter} style={{flexDirection: "column"}}>
							<Day today={data.today}/>
						</div>
					</Paper>
				</Grid>
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography align="center" className={classes.bold}>This Week</Typography>
						<Table>
							<TableBody>
								{data.upcomingEvents.map(ev =>
									<TableRow>
										<TableCell>
										{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(ev.date).getUTCDay()]}, {ev.date.split("-")[1]}/{ev.date.split("-")[2]}</TableCell>
										<TableCell>{ev.name}</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Grid container alignItems="center" alignContent="center" justifyContent="space-around" style={{height: "100%"}} spacing={1}>
							<Grid item xs={6}>
								<Button fullWidth variant="contained">Health Screening</Button>
							</Grid>
							<Grid item xs={6}>
								<Button fullWidth variant="contained">Health Screening</Button>
							</Grid>
							<Grid item xs={6}>
								<Button fullWidth variant="contained">Health Screening</Button>
							</Grid>
							<Grid item xs={6}>
								<Button fullWidth variant="contained">Health Screening</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
			<Grid container className={classes.virtCenterChild} justifyContent="center" alignItems="stretch" spacing={1}>
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography className={classes.bold} align="center">General Announcements</Typography>
						<Typography>{data.currentAnnouncements.find(ann => ann.category === "general")?.announcement || "No Announcement Found"}</Typography>
					</Paper>
				</Grid>
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography className={classes.bold} align="center">Caucus Announcements</Typography>
						<Typography>{data.currentAnnouncements.find(ann => ann.category === "caucus")?.announcement || "No Announcement Found"}</Typography>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Home;
