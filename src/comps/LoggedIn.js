// TODO: create context import React, {useState, useEffect, createContext} from "react"
import React, {useState, useEffect} from "react"
import {gql, useQuery, useMutation} from "@apollo/client"
import {GoogleLogin} from "react-google-login"
import {GOOGLE_AUTH_CLIENT_ID} from "../constants"
import {
	Typography,
	makeStyles,
	Button
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	loggedInAs: {
		position: "fixed",
		top: theme.spacing(1),
		left: theme.spacing(1)
	},
	flexContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100%"
	},
	flex: {
		textAlign: "center"
	},
}))

const QUERY = gql`
	query {
		authenticatedUser {
			permissions
			firstName
		}
	}
`

const MUTATION = gql`
	mutation ($token: String!) {
		login(token: $token) {
			permissions
			firstName
		}
	}
`
const LOGOUT_MUTATION = gql`
	mutation {
		logout
	}
`

function LoggedIn(props) {
	const classes = useStyles()

	const { loading, error, data, refetch } = useQuery(QUERY)
	const [login, {data: loginData, error: loginError}] = useMutation(MUTATION)
	const [logout] = useMutation(LOGOUT_MUTATION, {
		onCompleted() {
			setLoggedIn(false)
			refetch()
		}
	})

	const [loggedIn, setLoggedIn] = useState(false)
	const success = response => {
		//const profile = response.getBasicProfile()
		login({
			variables: {
				token: response.getAuthResponse().id_token
			}
		})
	}

	useEffect(() => {
		if (data?.authenticatedUser) setLoggedIn(true)
		if (loginData?.login) setLoggedIn(true)
	}, [data, loginData])

	if (loggedIn)
		return (
			<>
				<div className={classes.loggedInAs}>
					<Button onClick={() => logout()} variant="contained">Log out</Button>
				</div>
				{props.children}
			</>
		);
	if (loading) return <Typography>Loading...</Typography>
	return (
		<div className={classes.flexContainer}>
			<div className={classes.flex}>
				<Typography variant="h4">Please log in to access the editing page</Typography>
				<GoogleLogin clientId={GOOGLE_AUTH_CLIENT_ID} onSuccess={success} onFailure={console.error} cookiePolicy="single_host_origin"/>
				{error && <Typography>Error getting authenticated user: {error.message}</Typography>}
				{loginError && <Typography>Error logging in: {loginError.message}</Typography>}
			</div>
		</div>
	);
}

export default LoggedIn;
