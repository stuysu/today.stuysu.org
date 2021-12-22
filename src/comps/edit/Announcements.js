import React, {useState} from "react";
import {gql, useQuery, useMutation} from "@apollo/client";
import {
	makeStyles,
	Typography,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Grid,
	Button
} from "@material-ui/core";
import {Editor} from "@tinymce/tinymce-react";

const useStyles = makeStyles((theme) => ({
	title: {
		fontWeight: "bold",
		marginBottom: theme.spacing(1)
	},
	bold: {fontWeight: "bold"},
	marginBottom: {marginBottom: theme.spacing(1)},
	html: {
		"& *": {
			margin: 0
		}
	}
}))

const QUERY = gql`
	query {
		currentAnnouncements {
			id
			category
			announcement
		}
	}
`

const MUTATION = gql`
	mutation ($announcement: String!, $category: String!) {
		createAnnouncement(announcement: $announcement, category: $category) {
			id
		}
	}
`

function Announcements() {
	const classes = useStyles();

	const {loading, error, data, refetch} = useQuery(QUERY)
	const [submit, { error: muErr }] = useMutation(MUTATION, {
		update(cache) {
			cache.reset().then(() => refetch())
		}
	})

	const [announcement, setAnnouncement] = useState("")
	const [category, setCategory] = useState("general")

	if (error) {
		console.error(error);
		return <Typography>Error getting current announcements: {error.message}</Typography>
	}

	return (
		<div>
			<div className={classes.marginBottom}>
				<Editor
					apiKey={"bzg71o9rxjiw3vfmrlmdu07vif9lfs9j50q8h932ajzahz4b"}
					init={{
						height: 350,
						menubar: false,
						default_link_target: "_blank",
						plugins: "autolink link searchreplace paste wordcount",
						toolbar: `bold italic forecolor backcolor | removeformat | link`,
						browser_spellcheck: true,
					}}
					onEditorChange={val => setAnnouncement(val)}
					value={announcement}
				/>
				{muErr && <Typography style={{color: "red"}}>Error submitting: {muErr.message}</Typography>}
			</div>
			<Grid container className={classes.marginBottom} spacing={1}>
				<Grid item xs={7}>
					<FormControl fullWidth variant="outlined">
						<InputLabel id="selectLabel">Category</InputLabel>
						<Select value={category} onChange={e => setCategory(e.target.value)} labelId="selectLabel" label="Category">
							<MenuItem value={"general"}>General</MenuItem>
							<MenuItem value={"caucus"}>Caucus</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={5}>
					<Button variant="contained" fullWidth style={{height: "100%"}} onClick={() => submit({variables: {announcement, category}})}>Set as announcement</Button>
				</Grid>
			</Grid>

			<Typography className={classes.title} align="center">Current Announcements</Typography>
			{
				loading ?
					<Typography>Loading current announcements...</Typography> :
				data.currentAnnouncements.map(announcement =>
					<div>
						<Typography className={classes.bold}>Category: {announcement.category}</Typography>
						<Typography className={classes.html} dangerouslySetInnerHTML={{ __html: announcement.announcement }}/>
					</div>
				)
			}
		</div>
	)
}

export default Announcements;
