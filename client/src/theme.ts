import { createTheme } from '@mui/material'

declare module '@mui/material/styles/createTheme' {
    interface ThemeOptions {
        customColor: {
            [key: string]: {
                light?: string,
                main?: string,
                dark?: string
            }
        }
    }
}

export const theme = createTheme({
    components: {
        MuiCssBaseline: {
          styleOverrides: {
            "@global": {
                html: {
                    fontFamily: "'Open Sans',Roboto,-apple-system"
                },
            }
          },
        },
    },
    typography: {
        fontFamily: "'Open Sans',Roboto,-apple-system"
    },
    customColor: {
        indigo: {
            light: "#4B566B",
            main: "#0F3460",
            dark: "#2B3445"
        },
        cyan: {
            light: "#F6F9FC"
        },
        whiteGrey: {
            light: "#F3F5F9"
        },
        tomato: {
            light: "#FCE9EC",
            main: "#D23F57"
        }
    }
})