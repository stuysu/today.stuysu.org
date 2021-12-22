import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
	Typography,
	Select,
	MenuItem,
	TextField,
	FormControl,
	InputLabel,
	Grid,
	Button,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell
} from "@material-ui/core";

const QUERY = gql`
	query {
		upcomingDays {
			id
			date
			testing
			block
			schedule {
				name
			}
		}
		schedules {
			id
			name
		}
	}
`;

const MUTATION = gql`
	mutation ($testing: String, $block: String, $scheduleId: Int, $date: Date) {
		editDay(testing: $testing, block: $block, scheduleId: $scheduleId, date: $date) {
			id
		}
	}
`;

function today() {
	const now = new Date();
	return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
function Days() {
	const [date, setDate] = useState(today());
	const [testing, setTesting] = useState("");
	const [block, setBlock] = useState("A");
	const [schedule, setSchedule] = useState(3);

	const { loading, error, data, refetch } = useQuery(QUERY);
	const [editMutation, { error: eErr }] = useMutation(MUTATION, {
		update(cache) {
			cache.reset().then(() => refetch());
		}
	});

	if (error) {
		console.error(error);
		return <Typography>Error loading days: {error.message}</Typography>;
	}

	const edit = () => {
		if (!testing) return;
		editMutation({
			variables: {
				date,
				testing,
				block,
				scheduleId: schedule
			}
		});
		setDate(today());
		setTesting("");
		setBlock("A");
		setSchedule(3);
	};

	return (
		<div>
			<Grid container spacing={1}>
				<Grid item xs={5}>
					<TextField
						type="date"
						value={date}
						onChange={e => setDate(e.target.value)}
						variant="outlined"
						label="Date"
						fullWidth
					/>
				</Grid>
				<Grid item xs={2}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Block</InputLabel>
						<Select value={block} onChange={e => setBlock(e.target.value)} label="Block">
							<MenuItem value="A">A</MenuItem>
							<MenuItem value="B">B</MenuItem>
							<MenuItem value="A1">A1</MenuItem>
							<MenuItem value="B1">B1</MenuItem>
							<MenuItem value="A2">A2</MenuItem>
							<MenuItem value="B2">B2</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={5}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Schedule</InputLabel>
						<Select value={schedule} onChange={e => setSchedule(e.target.value)} label="Schedule">
							{!loading &&
								data.schedules.map(sched => <MenuItem value={sched.id}>{sched.name}</MenuItem>)}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={7}>
					<TextField
						value={testing}
						onChange={e => setTesting(e.target.value)}
						variant="outlined"
						label="Testing"
						fullWidth
					/>
				</Grid>
				<Grid item xs={5}>
					<Button variant="contained" fullWidth style={{ height: "100%" }} onClick={edit}>
						Edit Day
					</Button>
				</Grid>
			</Grid>

			{loading ? (
				<Typography>Loading upcoming days...</Typography>
			) : (
				<div>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Date</TableCell>
								<TableCell>Block</TableCell>
								<TableCell>Schedule</TableCell>
								<TableCell>Testing</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.upcomingDays.map(day => (
								<TableRow key={day.id}>
									<TableCell>
										{
											["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
												new Date(day.date).getUTCDay()
											]
										}
										, {day.date.split("-")[1]}/{day.date.split("-")[2]}
									</TableCell>
									<TableCell>{day.block}</TableCell>
									<TableCell>{day.schedule.name}</TableCell>
									<TableCell>{day.testing}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
}

export default Days;
