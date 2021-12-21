import React, {useState} from "react";
import {
	Grid,
	Typography,
	makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	bold: {fontWeight: "bold"},
	padding: {padding: theme.spacing(1)}
}))

function timeString() {
	const date = new Date();
	const hours = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
	return `${hours}:${date.getMinutes() < 10 ? 0 : ""}${date.getMinutes()}:${date.getSeconds() < 10 ? 0 : ""}${date.getSeconds()}`;
}

function Day({today: {testing, block, schedule}}) {
	const classes = useStyles();
	const [time, setTime] = useState(timeString());
	setInterval(() => setTime(timeString), 1000);
	return (
		<>
			<Typography align="center" variant="h3">{time}</Typography>
			<div style={{display: "flex", width: "100%"}}>
				<div className={classes.padding}>
					<Typography variant="h1" style={{margin: 0, lineHeight: 1}} align="center">{block}</Typography>
					<Typography align="center">{schedule.name}</Typography>
				</div>
				<div style={{flexGrow: 1}} className={classes.padding}>
					<Typography align="center" className={classes.bold}>5th Period</Typography>
					<Grid container>
						<Grid item xs={6}>
							<Typography>5 minutes into</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography>36 minutes left</Typography>
						</Grid>
					</Grid>
					<br/>
					<Typography align="center" className={classes.bold}>Testing today</Typography>
					<Typography align="center">{testing}</Typography>
				</div>
			</div>
		</>
	);
}

export default Day;
