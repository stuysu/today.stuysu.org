import React, {useState, useMemo, createContext} from "react";
import { ThemeProvider as Provider, createTheme } from "@material-ui/core"

const ThemeContext = createContext({setTheme: () => {}, userTheme: {}})

function ThemeProvider({children}) {
	const [userTheme, setUserTheme] = useState(JSON.parse(window.localStorage.getItem("userTheme")) || {})
	// Taken from the MUI docs
	// the memo thing is apparently for optimization
	const setTheme = theme => {
		setUserTheme(theme)
		window.localStorage.setItem("userTheme", JSON.stringify(theme))
	}
	const theme = useMemo(
		() => createTheme({
			palette: {
				type: userTheme.type || "light",
				bodyBackground: userTheme.background || (userTheme.type === "dark" ? "#090a0b" : "#f6f5f4"),
				boxColor: userTheme.boxColor,
				text: {
					primary: userTheme.textColor || (userTheme.type === "dark" ? "#fff" : "#000")
				},
				primary: {
					main: userTheme.buttonColor || '#00897b',
				},
				secondary: {
					main: '#d4e157',
				}
			},
			breakpoints: {
				values: {
					xs: 0,
					sm: 600,
					md: 900,
					lg: 1200,
					xl: 1550
				}
			},
			typography: {
				//fontFamily: `'${userTheme.font}', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans"`
				fontFamily: `'${userTheme.font}', -apple-system, BlinkMacSystemFont, sans-serif`
			},
		}),
		[userTheme]
	)

	return (
		<ThemeContext.Provider value={{setTheme, userTheme}}>
			<Provider theme={theme}>{children}</Provider>
		</ThemeContext.Provider>
	);
}

export {
	ThemeProvider,
	ThemeContext
}
