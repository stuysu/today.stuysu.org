import React, {useState, useMemo, createContext} from "react";
import { ThemeProvider as Provider, createTheme } from "@material-ui/core"

const ColorModeContext = createContext({ toggleColorMode: () => {}})

function ThemeProvider({children}) {
	const [mode, setMode] = useState(window.localStorage.getItem("theme") || "light")
	// Taken from the MUI docs
	// the memo thing is apparently for optimization
	const toggleColorMode = () => {
		const newMode = mode === "light" ? "dark" : "light"
		setMode(newMode)
		window.localStorage.setItem("theme", newMode)
	}
	const theme = useMemo(
		() => createTheme({
			palette: {
				type: mode,
				bodyBackground: mode === "light" ? "#f6f5f4" : "#090a0b",
				primary: {
					main: '#00897b',
				},
				secondary: {
					main: '#d4e157',
				}
			}
		}),
		[mode]
	)

	return (
		<ColorModeContext.Provider value={toggleColorMode}>
			<Provider theme={theme}>{children}</Provider>
		</ColorModeContext.Provider>
	);
}

export {
	ThemeProvider,
	ColorModeContext
}
