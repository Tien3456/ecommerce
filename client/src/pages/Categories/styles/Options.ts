import { makeStyles } from "@mui/styles"

export const useStyles = makeStyles((theme: any) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: "30%"
        },
        [theme.breakpoints.down('md')]: {
            width: "32%"
        },
        [theme.breakpoints.only('xs')]: {
            width: "100%",
            marginBottom: theme.spacing(3)
        },
        background: "rgb(255, 255, 255)",
        padding: theme.spacing(2),
        '& .option-wrapper': {
            '& h4': {
                fontWeight: "bold",
                marginBottom: theme.spacing(2)
            }
        }
    },
    selectedCategories: {
        '& .MuiFormControlLabel-root': {
            display: "block",
            position: "relative",
            width: "100%",
            margin: 0,
            marginBottom: theme.spacing(2),
            '& .MuiTypography-root': {
                position: "absolute",
                top: "50%",
                left: theme.spacing(2),
                textTransform: "capitalize",
                transform: "translateY(-50%)",
                webkitTransform: "translateY(-50%)",
                mozTransform: "translateY(-50%)",
                msTransform: "translateY(-50%)",
                oTransform: "translateY(-50%)",
                fontWeight: "bold",
                fontSize: "15px",
                opacity: 0.9
            }
        }
    },
    checkbox: {
        '&.MuiCheckbox-root': {
            width: "100%",
            background: "rgba(25, 118, 210, 0.04)",
            borderRadius: "5px",
            [theme.breakpoints.up('md')]: {
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(3),
            },
            [theme.breakpoints.down('md')]: {
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2),
            },
            '& svg': {
                display: "none"
            },
            '& .MuiTouchRipple-root': {
                transition: "all 0.2s ease-out",
                webkitTransition: "all 0.2s ease-out",
                mozTransition: "all 0.2s ease-out",
                msTransition: "all 0.2s ease-out",
                oTransition: "all 0.2s ease-out"
            },
            '& .PrivateSwitchBase-input:checked ~ .MuiTouchRipple-root': {
                background: theme.customColor.indigo.main
            }
        }
    },
    selectedPrices: {
        '& .MuiFormControlLabel-root': {
            margin: 0,
            marginBottom: theme.spacing(1),
            padding: 0,
            '& .MuiRadio-root': {
                color: `${theme.customColor.indigo.main} !important`
            },
            '& .MuiTypography-root': {
                fontSize: "15px",
                fontWeight: "bold",
                opacity: 0.9
            }
        },
    }
}))