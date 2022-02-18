import React from "react";
import { makeStyles, Grid, Typography, Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom"

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
	padding: { padding: theme.spacing(1) },
	users: {
		position: "fixed",
		top: theme.spacing(1),
		right: theme.spacing(1)
	}
}));

function Edit() {
	const classes = useStyles();

	return (
		<>
			<Link to="/edit/users" className={classes.users}>
				<Button variant="contained">Edit Users</Button>
			</Link>
			<Typography variant="h3" align="center">
				Edit the Site
			</Typography>
			<Grid container justifyContent="center" spacing={1} className={classes.padding} style={{ maxWidth: "11020px", margin: "auto" }}>
				<Grid item xl={4} lg={5} md={7} sm={10} xs={12}>
					<Paper className={classes.paper}>
						<Typography align="center" className={classes.title}>
							Days
						</Typography>
						<Days />
					</Paper>
				</Grid>
				<Grid item xl={4} lg={5} md={7} sm={10} xs={12}>
					<Paper className={classes.paper}>
						<Typography align="center" className={classes.title}>
							Events
						</Typography>
						<Events />
					</Paper>
				</Grid>
				<Grid item xl={4} lg={5} md={7} sm={10} xs={12}>
					<Paper className={classes.paper}>
						<Typography align="center" className={classes.title}>
							Announcements
						</Typography>
						<Announcements />
					</Paper>
				</Grid>
			</Grid>
		</>
	);
}

export default Edit;
