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

function Home() {
	const classes = useStyles();
	return (
		<div className={classes.virtCenter}>
			<Grid container justifyContent="center" alignItems="stretch" spacing={1} className={classes.virtCenterChild}>
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<div className={classes.virtCenter} style={{flexDirection: "column"}}>
							<Day/>
						</div>
					</Paper>
				</Grid>
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography align="center" className={classes.bold}>This Week</Typography>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>Mon, 12/6</TableCell>
									<TableCell>First Day of Marking Period 3</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Wed, 12/8</TableCell>
									<TableCell>SU Cabinet Meeting</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Mon, 12/10</TableCell>
									<TableCell>Marking Period 2 Grades Due</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Mon, 12/10</TableCell>
									<TableCell>Music Department's Choral Concert at 6:00pm</TableCell>
								</TableRow>
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
						<Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
					</Paper>
				</Grid>
				<Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography className={classes.bold} align="center">Caucus Announcements</Typography>
						<Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Home;
