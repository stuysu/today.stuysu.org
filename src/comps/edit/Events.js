import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
	makeStyles,
	Table,
	TableRow,
	TableCell,
	TableBody,
	Typography,
	IconButton,
	TextField,
	Button,
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	marginBottom: {
		marginBottom: theme.spacing(1)
	}
}));

const QUERY = gql`
	query {
		upcomingEvents {
			date
			name
			id
		}
	}
`;

const CREATE_MUTATION = gql`
	mutation ($name: String!, $date: Date!) {
		createEvent(name: $name, date: $date) {
			id
		}
	}
`;

const EDIT_MUTATION = gql`
	mutation ($name: String, $date: Date, $id: Int!) {
		alterEvent(name: $name, date: $date, id: $id) {
			id
		}
	}
`;

const DELETE_MUTATION = gql`
	mutation ($id: Int!) {
		removeEvent(id: $id)
	}
`;

function today() {
	const now = new Date();
	return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
function Events() {
	const classes = useStyles();

	const { data, error, loading, refetch } = useQuery(QUERY);

	const [name, setName] = useState("");
	const [date, setDate] = useState(today());

	const [createMutation, { error: cErr }] = useMutation(CREATE_MUTATION, {
		update(cache) {
			cache.reset().then(() => refetch());
		}
	});
	const create = () => {
		if (!name) return;
		createMutation({ variables: { name, date } });
		setName("");
		setDate(today());
	};

	const [editMutation, { error: eErr }] = useMutation(EDIT_MUTATION, {
		update(cache) {
			cache.reset().then(() => refetch());
		}
	});
	const [editing, setEditing] = useState(-1);
	const [editingName, setEditingName] = useState("");
	const [editingDate, setEditingDate] = useState(today());
	useEffect(() => {
		const event = data?.upcomingEvents.find(ev => ev.id === editing);
		if (!event) return;
		setEditingName(event.name);
		setEditingDate(event.date);
	}, [editing, data]);
	const edit = () => {
		editMutation({ variables: { id: editing, name: editingName, date: editingDate } });
		setEditing(-1);
	};

	const [deleteMutation, { error: dErr }] = useMutation(DELETE_MUTATION, {
		update(cache) {
			cache.reset().then(() => refetch());
		}
	});
	const [deleting, setDeleting] = useState(-1);
	const del = () => {
		deleteMutation({ variables: { id: deleting } });
		setDeleting(-1);
	};

	if (error || cErr || eErr || dErr) {
		const fErr = error || cErr || eErr || dErr;
		console.error(error);
		return <Typography>Error communicating with database: {fErr.message}</Typography>;
	}

	return (
		<div>
			<TextField
				label="Name"
				value={name}
				onChange={e => setName(e.target.value)}
				fullWidth
				variant="outlined"
				className={classes.marginBottom}
			/>
			<Grid container spacing={1}>
				<Grid item xs={7}>
					<TextField
						label="Date"
						type="date"
						value={date}
						onChange={e => setDate(e.target.value)}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={5}>
					<Button variant="contained" fullWidth style={{ height: "100%" }} onClick={create}>
						Create new event
					</Button>
				</Grid>
			</Grid>

			<Dialog open={editing >= 0} onClose={() => setEditing(-1)}>
				<DialogTitle>Edit Event</DialogTitle>
				<DialogContent>
					<TextField
						label="Name"
						fullWidth
						value={editingName}
						onChange={e => setEditingName(e.target.value)}
						variant="outlined"
						className={classes.marginBottom}
					/>
					<TextField
						label="Date"
						type="date"
						value={editingDate}
						onChange={e => setEditingDate(e.target.value)}
						variant="outlined"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setEditing(-1)}>Cancel</Button>
					<Button onClick={edit}>Submit</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={deleting >= 0} onClose={() => setDeleting(-1)}>
				<DialogTitle>Are you sure you want to delete this event?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Name: {data?.upcomingEvents.find(ev => ev.id === deleting)?.name || ""}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleting(-1)}>Cancel</Button>
					<Button autoFocus onClick={del}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>

			{loading ? (
				<Typography>Loading events...</Typography>
			) : (
				<Table>
					<TableBody>
						{data.upcomingEvents.map(ev => (
							<TableRow key={ev.id}>
								<TableCell align="left">
									{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(ev.date).getUTCDay()]},{" "}
									{ev.date.split("-")[1]}/{ev.date.split("-")[2]}
								</TableCell>
								<TableCell>{ev.name}</TableCell>
								<TableCell align="right">
									<IconButton onClick={() => setEditing(ev.id)}>
										<Edit />
									</IconButton>
									<IconButton onClick={() => setDeleting(ev.id)}>
										<Delete />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
}

export default Events;
