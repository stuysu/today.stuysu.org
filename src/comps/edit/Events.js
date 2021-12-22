import React, {useState} from "react";
import {gql, useQuery, useMutation} from "@apollo/client"
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
	Grid
} from "@material-ui/core"
import {
	Edit,
	Delete
} from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
	marginBottom: {
		marginBottom: theme.spacing(1)
	}
}))

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

function Events() {
	const classes = useStyles()

	const {data, error, loading, refetch} = useQuery(QUERY);

	const [name, setName] = useState("");
	const now = new Date();
	const [date, setDate] = useState(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`)

	const [createMutation, {error: cErr}] = useMutation(CREATE_MUTATION, {
		update(cache) {
			cache.reset().then(() => refetch())
		}
	})

	const create = () => {
		if (!name) return
		createMutation({variables: {name, date}})
		setName("");
		setDate(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`)
	}

	return (
		<div>
			<TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth variant="outlined" className={classes.marginBottom}/>
			<Grid container spacing={1}>
				<Grid item xs={7}>
					<TextField label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} variant="outlined" fullWidth/>
				</Grid>
				<Grid item xs={5}>
					<Button variant="contained" fullWidth style={{height: "100%"}} onClick={create}>Create new event</Button>
				</Grid>
			</Grid>

			{
				loading ?
					<Typography>Loading events...</Typography> :
					<Table>
						<TableBody>
							{data.upcomingEvents.map(ev =>
								<TableRow key={ev.id}>
									<TableCell align="left">
										{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(ev.date).getUTCDay()]}, {ev.date.split("-")[1]}/{ev.date.split("-")[2]}
									</TableCell>
									<TableCell>{ev.name}</TableCell>
									<TableCell align="right">
										<IconButton>
											<Edit/>
										</IconButton>
										<IconButton>
											<Delete/>
										</IconButton>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
			}
		</div>
	);
}

export default Events;
