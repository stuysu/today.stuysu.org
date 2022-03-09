import React from "react"
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button
} from "@material-ui/core"

export default function ApiDialog({apiOpen, apiClose}) {
	return (
		<Dialog open={apiOpen} onClose={apiClose}>
			<DialogTitle>Use the API</DialogTitle>
			<DialogContent>
				<DialogContentText>
					There are two ways to get data from the site. The first, easy way is the JSON API, available at <code>https://today-api.stuysu.org/today.json</code>, will return data about the current period, the schedule of the day, the block, and what classes are testing.
					<br/><br/>
					If you need more data, for example about other schedules, upcoming days, events, or announcements, you must use the GraphQL API available at <code>https://today-api.stuysu.org/graphql</code>. If you visit that URL in your browser, you will have access to the GraphQL playground, where you will be able to test out different queries.
					<br/><br/>
					If you want to use the API on your website, please email <code>it@stuysu.org</code>, so we can add it to our allowed-hosts list for CORS. If you have any other questions or need help, email <code>it@stuysu.org</code>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={apiClose}>Ok</Button>
			</DialogActions>
		</Dialog>
	);
}
