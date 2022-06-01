import React, { useState, useContext } from "react"
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	FormControlLabel,
	Switch,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel
} from "@material-ui/core"

import { ThemeContext } from "./context/ThemeProvider"

import prideflags from "../prideflags"

const FONTS = [
	"Montserrat",
	"Open Sans",
	"Roboto",
	"Lato",
	"Poppins",
	"Roboto Slab",
	"Merriweather",
	"Playfair Display",
	"Lora",
	"PT Serif",
	"Roboto Mono",
	"Inconsolata",
	"Source Code Pro",
	"Space Mono"
]

export default function ThemeDialog({tdOpen, tdClose}) {
	const {setTheme, userTheme} = useContext(ThemeContext)

	const [type, setType] = useState(userTheme.type || "light")
	const [background, setBackground] = useState(userTheme.background || undefined)
	const [boxColor, setBoxColor] = useState(userTheme.boxColor || undefined)
	const [buttonColor, setButtonColor] = useState(userTheme.buttonColor || undefined)
	const [textColor, setTextColor] = useState(userTheme.textColor || undefined)
	const [font, setFont] = useState(userTheme.font || "Roboto")
	const [UI, setUI] = useState(userTheme.UI || "Original")
	const [boxTheme, setBoxTheme] = useState(userTheme.boxTheme || "None")
	return (
		<Dialog open={tdOpen} onClose={tdClose}>
			<DialogTitle>Theme</DialogTitle>
			<DialogContent>
				<DialogContentText>The theme will be saved in a cookie that stays with your browser on this computer.</DialogContentText>
				<FormControlLabel
					control={
						<Switch
							checked={type === "dark"}
							onChange={e => setType(e.target.checked ? "dark" : "light")}
						/>}
					label="Dark Mode"
				/>
				<br/>
				<FormControlLabel
					control={
						<Switch
							checked={background}
							onChange={e => setBackground(e.target.checked ? "#ffffff" : undefined)}
						/>}
					label="Custom Background"
				/>
				<br/>
				{
					background &&
						<Typography>
							Background:&nbsp;
							<input type="color" onChange={e => setBackground(e.target.value)} value={background} style={{verticalAlign: "middle"}}/>
						</Typography>
				}
				<FormControlLabel
					control={
						<Switch
							checked={boxColor}
							onChange={e => setBoxColor(e.target.checked ? "#ffffff" : undefined)}
						/>}
					label="Custom Box Color"
				/>
				<br/>
				{
					boxColor &&
						<Typography>
							Box Color:&nbsp;
							<input type="color" onChange={e => setBoxColor(e.target.value)} value={boxColor} style={{verticalAlign: "middle"}}/>
						</Typography>
				}
				<FormControlLabel
					control={
						<Switch
							checked={buttonColor}
							onChange={e => setButtonColor(e.target.checked ? "#ffffff" : undefined)}
						/>}
					label="Custom Button Color"
				/>
				<br/>
				{
					buttonColor &&
						<Typography>
							Box Color:&nbsp;
							<input type="color" onChange={e => setButtonColor(e.target.value)} value={buttonColor} style={{verticalAlign: "middle"}}/>
						</Typography>
				}
				<FormControlLabel
					control={
						<Switch
							checked={textColor}
							onChange={e => setTextColor(e.target.checked ? "#ffffff" : undefined)}
						/>}
					label="Custom Text Color"
				/>
				<br/>
				{
					textColor &&
						<Typography>
							Text Color:&nbsp;
							<input type="color" onChange={e => setTextColor(e.target.value)} value={textColor} style={{verticalAlign: "middle"}}/>
						</Typography>
				}
				<FormControl variant="outlined">
					<InputLabel>Font</InputLabel>
					<Select value={font} onChange={e => setFont(e.target.value)} label="Font">
						{
							FONTS.map(font =>
								<MenuItem value={font}>{font}</MenuItem>
							)
						}
					</Select>
				</FormControl>
				<br/>
				<br/>
				<FormControl variant="outlined">
					<InputLabel>UI (beta)</InputLabel>
					<Select value={UI} onChange={e => setUI(e.target.value)} label="UI (beta)">
						<MenuItem value="Original">Original</MenuItem>
						<MenuItem value="Period Focus">Period Focus</MenuItem>
					</Select>
				</FormControl>
				<br/>
				<br/>
				<FormControl variant="outlined">
					<InputLabel>Box Theme</InputLabel>
					<Select value={boxTheme} onChange={e => setBoxTheme(e.target.value)} label="Box Theme">
						<MenuItem value={"None"}>None</MenuItem>
						{
							Object.keys(prideflags).map(flag =>
								<MenuItem value={flag}>{flag}</MenuItem>
							)
						}
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {
						setTheme({type, background, boxColor, buttonColor, textColor, font, UI, boxTheme})
						tdClose()
					}}
				>Set</Button>
				<Button onClick={tdClose}>Close</Button>
			</DialogActions>
		</Dialog>
	)
}
