import React, {useState, useEffect} from "react"

import LoggedIn from "./LoggedIn"
import {
	makeStyles,
	Grid,
	Typography,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Button,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions
} from "@material-ui/core"
import {
	Edit,
	Clear
} from "@material-ui/icons"
import { gql, useQuery, useMutation } from "@apollo/client"

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(1),
		height: "100%"
	},
	title: {
		fontWeight: "bold",
		marginBottom: theme.spacing(1)
	}
}))

const QUERY = gql`
	query {
		users {
			id
			firstName
			lastName
			email
			permissions
		}
	}
`

const CREATE_MUTATION = gql`
	mutation CreateUser($email: String!, $permissions: String!) {
		createUser(email: $email, permissions: $permissions) {
			id
		}
	}
`
const ALTER_MUTATION = gql`
	mutation AlterUser($id: Int!, $email: String, $permissions: String) {
		alterUser(id: $id, email: $email, permissions: $permissions) {
			id
		}
	}
`
const REMOVE_MUTATION = gql`
	mutation RemoveMutation($id: Int!) {
		removeUser(id: $id)
	}
`

export default function Users() {
	const classes = useStyles()
	const {loading, error, data, refetch} = useQuery(QUERY)
	const [editingId, setEditingId] = useState(-1)
	const editingUser = editingId < 0 ? undefined : data?.users.find(user => user.id === editingId)
	const action = editingId < 0 ?
		"Add New User" :
		`Editing ${editingUser.firstName} ${editingUser.lastName}`

	const [removingId, setRemovingId] = useState(-1)
	const removingUser = removingId < 0 ? undefined : data?.users.find(user => user.id === removingId)
	const removingAction = !removingUser ? "howdy 🤠" : `Are you sure you want to remove ${removingUser.firstName} ${removingUser.lastName}?`

	const [create] = useMutation(CREATE_MUTATION, {
		update(cache) {
			refetch()
		}
	})
	const [edit] = useMutation(ALTER_MUTATION, {
		update(cache) {
			refetch()
		},
		onCompleted() {
			setEditingId(-1)
		}
	})
	const [remove] = useMutation(REMOVE_MUTATION, {
		update(cache) {
			refetch()
		},
		onCompleted() {
			setRemovingId(-1)
		}
	})

	const [email, setEmail] = useState("")
	const [users, setUsers] = useState(false)
	const [events, setEvents] = useState(false)
	const [days, setDays] = useState(false)
	const [announcements, setAnnouncements] = useState({caucus: false, general: false})

	useEffect(() => {
		const user = editingId < 0 ? undefined : data?.users.find(user => user.id === editingId)
		if (!user) {
			setEmail("")
			setUsers(false)
			setEvents(false)
			setDays(false)
			setAnnouncements({caucus: false, general: false})
			return
		}
		setEmail(user.email)
		const perms = JSON.parse(user.permissions)
		setUsers(perms.users)
		setEvents(perms.events)
		setDays(perms.days)
		setAnnouncements({
			caucus: perms.announcements?.caucus,
			general: perms.announcements?.general
		})
	}, [editingId, data])

	const submit = () => {
		const variables = {
			email,
			permissions: JSON.stringify({
				users,
				events,
				days,
				announcements
			})
		}
		if (editingId > 0) {
			variables.id = editingId
			edit({variables})
		} else {
			create({variables})
		}
	}
	return (
		<LoggedIn>
			<Typography variant="h3" align="center">
				Edit the Users
			</Typography>
			<Grid container justifyContent="center" spacing={1} className={classes.padding}>
				<Grid item xl={5} lg={5} md={6} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography className={classes.title} align="center">{action}</Typography>
						<FormGroup>
							<FormControlLabel control={<Checkbox checked={users} onChange={e => setUsers(e.target.checked)}/>} label="Can Edit Users"/>
							<FormControlLabel control={<Checkbox checked={events} onChange={e => setEvents(e.target.checked)}/>} label="Can Edit Events"/>
							<FormControlLabel control={<Checkbox checked={days} onChange={e => setDays(e.target.checked)}/>} label="Can Edit Days"/>
							<FormControlLabel
								control={<Checkbox checked={announcements.general} onChange={e => setAnnouncements({...announcements, general: e.target.checked})}/>}
								label="Can Edit General Announcements"
							/>
							<FormControlLabel
								control={<Checkbox checked={announcements.caucus} onChange={e => setAnnouncements({...announcements, caucus: e.target.checked})}/>}
								label="Can Edit Caucus Announcements"
							/>
						</FormGroup>
						<Grid container spacing={1}>
							<Grid item xs={editingId < 0 ? 9 : 6}>
								<TextField fullWidth variant="outlined" label="Email" value={email} onChange={e => setEmail(e.target.value)}/>
							</Grid>
							<Grid item xs={3}>
								<Button variant="contained" fullWidth style={{ height: "100%" }} onClick={submit}>Submit</Button>
							</Grid>
							{
								editingId >= 0 &&
									<Grid item xs={3}>
										<Button variant="contained" fullWidth style={{ height: "100%" }} onClick={() => setEditingId(-1)}>Cancel Edit</Button>
									</Grid>
							}
						</Grid>
						<Typography className={classes.title} align="center">Users</Typography>
						{loading ? <Typography>Loading Users...</Typography> :
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell>Email</TableCell>
										<TableCell>Permissions</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										data?.users?.map(user => (
											<TableRow>
												<TableCell>{user.firstName} {user.lastName}</TableCell>
												<TableCell>{user.email}</TableCell>
												<TableCell>{
													Object.entries(JSON.parse(user.permissions)).filter(perm => perm[1]).map(perm =>
														typeof perm[1] === "boolean" ?
															perm[0] :
															Object.keys(perm[1]).filter(subc => perm[1][subc]).map(subc => `${perm[0]} > ${subc}`).join(", ")
													).join(", ")
												}</TableCell>
												<TableCell>
													<IconButton onClick={() => setEditingId(user.id)}>
														<Edit/>
													</IconButton>
													<IconButton onClick={() => setRemovingId(user.id)}>
														<Clear/>
													</IconButton>
												</TableCell>
											</TableRow>
										))
									}
								</TableBody>
							</Table>
						}
					</Paper>
				</Grid>
			</Grid>
			<Dialog open={removingId > 0} onClose={() => setRemovingId(-1)}>
				<DialogTitle>{removingAction}</DialogTitle>
				<DialogActions>
					<Button onClick={() => remove({variables: {id: removingId}})}>Yes</Button>
					<Button onClick={() => setRemovingId(-1)}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</LoggedIn>
	)
}
