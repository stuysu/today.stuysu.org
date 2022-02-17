import React from "react";
import { makeStyles, Grid, Typography, Paper } from "@material-ui/core";

import LoggedIn from "./LoggedIn";
import Announcements from "./edit/Announcements";
import Events from "./edit/Events";
import Days from "./edit/Days";

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(1),
		height: "100%"
	},
	bold: { fontWeight: "bold" },
	title: {
		fontWeight: "bold",
		marginBottom: theme.spacing(1)
	},
	padding: { padding: theme.spacing(1) }
}));

function Edit() {
	const classes = useStyles();

	return (
		<LoggedIn>
			<Typography variant="h3" align="center">
				Edit the Site
			</Typography>
			<Grid container justifyContent="center" spacing={1} className={classes.padding}>
				<Grid item xl={3} lg={4} md={6} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography align="center" className={classes.title}>
							Days
						</Typography>
						<Days />
					</Paper>
				</Grid>
				<Grid item xl={3} lg={4} md={6} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography align="center" className={classes.title}>
							Events
						</Typography>
						<Events />
					</Paper>
				</Grid>
				<Grid item xl={3} lg={4} md={6} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography align="center" className={classes.title}>
							Announcements
						</Typography>
						<Announcements />
					</Paper>
				</Grid>
			</Grid>
		</LoggedIn>
	);
}

export default Edit;
