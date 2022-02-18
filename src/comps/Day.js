import React, { useState, useEffect } from "react";
import { Grid, Typography, makeStyles, IconButton } from "@material-ui/core";
import { Fullscreen, FullscreenExit } from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
	bold: { fontWeight: "bold" },
	padding: { padding: theme.spacing(1) },
	leftRightPadding: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1)
	},
	button: {
		position: "absolute",
		top: 0,
		right: 0
	}
}));

function timeString() {
	const date = new Date();
	const hours = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
	return `${hours}:${date.getMinutes() < 10 ? 0 : ""}${date.getMinutes()}:${
		date.getSeconds() < 10 ? 0 : ""
	}${date.getSeconds()}`;
}

function periodData(scheduleObj) {
	// sort periods by start time, just in case
	// this might be unnecessary
	const schedule = JSON.parse(scheduleObj.schedule);
	schedule
		.map(period => {
			period.startDate = new Date();
			let startHours = Number(period.start.split(":")[0]);
			if (startHours === 12) startHours = 0;
			if (period.start.includes("PM")) startHours += 12;
			period.startDate.setHours(startHours);
			period.startDate.setMinutes(Number(period.start.split(" ")[0].split(":")[1]));
			period.endDate = new Date();
			let endHours = Number(period.end.split(":")[0]);
			if (endHours === 12) endHours = 0;
			if (period.end.includes("PM")) endHours += 12;
			period.endDate.setHours(endHours);
			period.endDate.setMinutes(Number(period.end.split(" ")[0].split(":")[1]));
			return period;
		})
		.sort((a, b) => (a > b ? 1 : -1));

	// get period
	const now = new Date();
	for (let i = 0; i < schedule.length; i++) {
		if (now >= schedule[i].startDate && now <= schedule[i].endDate)
			return {
				name: schedule[i].name,
				start: schedule[i].start,
				end: schedule[i].end,
				into: Math.floor((now - schedule[i].startDate) / (60 * 1000)),
				left: Math.floor((schedule[i].endDate - now) / (60 * 1000))
			};

		if (now >= schedule[i].endDate) {
			if (i === schedule.length - 1)
				return {
					name: "After school",
					start: schedule[i].end,
					end: "12:00 AM",
					into: Math.floor((now - schedule[i].endDate) / (60 * 1000)),
					left: "Not enough"
				};

			if (now <= schedule[i + 1].startDate)
				return {
					name: "Before " + schedule[i + 1].name,
					start: schedule[i].end,
					end: schedule[i + 1].start,
					into: Math.floor((now - schedule[i].endDate) / (60 * 1000)),
					left: Math.floor((schedule[i + 1].startDate - now) / (60 * 1000))
				};
		}
	}

	return {
		name: "Before school",
		start: "12:00 AM",
		end: schedule[0].start,
		into: "Not enough",
		left: Math.floor((schedule[0].startDate - now) / (60 * 1000))
	};
}

function Day({ today: { testing, block, schedule }, fullscreen, setFullscreen }) {
	const classes = useStyles();

	const dateStringOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	};
	const [time, setTime] = useState(timeString());
	const [date, setDate] = useState(new Date().toLocaleDateString(undefined, dateStringOptions));
	const [period, setPeriod] = useState(periodData(schedule));
	useEffect(() => {
		const dateStringOptions = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric"
		};
		const interval = setInterval(() => {
			setTime(timeString);
			setDate(new Date().toLocaleDateString(undefined, dateStringOptions));
			setPeriod(periodData(schedule));
		}, 1000);
		return () => clearInterval(interval)
	}, [period, schedule])

	return (
		<>
			<IconButton className={classes.button} onClick={() => setFullscreen(!fullscreen)}>
				{fullscreen ? <FullscreenExit/> : <Fullscreen/>}
			</IconButton>
			<Typography align="center" className={classes.bold}>
				{date}
			</Typography>
			<Typography align="center" variant="h3">
				{time}
			</Typography>
			<div style={{ display: "flex", width: "100%" }}>
				<div zing={""/*className={classes.padding}*/}>
					<Typography variant="h1" style={{ margin: 0, lineHeight: 1, width: "2.3ch" }} align="center">
						{block}
					</Typography>
					<Typography align="center">{schedule.name}</Typography>
				</div>
				<div style={{ flexGrow: 1 }} className={classes.leftRightPadding}>
					<div>
						<Typography align="center" className={classes.bold}>
							{period.name}
						</Typography>
						<Grid container>
							<Grid item xs={6}>
								<Typography>{period.into} minutes into</Typography>
							</Grid>
							<Grid item xs={6} align="right">
								<Typography>{period.left} minutes left</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography>{period.start}</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography align="center">to</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography align="right">{period.end}</Typography>
							</Grid>
						</Grid>
					</div>
					<br />
					<Typography align="center" className={classes.bold}>
						Testing today
					</Typography>
					<Typography align="center">{testing}</Typography>
				</div>
			</div>
		</>
	);
}

export default Day;
