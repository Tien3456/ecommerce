import { makeStyles } from "@mui/styles"

export const useStyles = makeStyles((theme: any) => ({
    root: {
        background: "rgb(255, 255, 255)",
        [theme.breakpoints.only('xs')]: {
            paddingTop: theme.spacing(2)
        }
    },
    bannersWrapper: {
        overflowX: "hidden",
        touchAction: "pan-y",
        msTouchAction: "-ms-pan-y",
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4)
        }
    },
    stack: {
        flexWrap: "nowrap",
        '& .row-banner-wrapper': {
            width: "100%",
            flex: "0 0 100%",
            '& .row-banner': {
                flexWrap: "wrap",
                [theme.breakpoints.up('sm')]: {
                    paddingLeft: theme.spacing(5)
                }
            }
        }
    },
    leftBanner: {
        [theme.breakpoints.up('sm')]: {
            width: "40%"
        },
        [theme.breakpoints.down('xs')]: {
            width: "100%"
        },
        '& h1.title': {
            [theme.breakpoints.up('sm')]: {
                fontSize: "50px"
            },
            [theme.breakpoints.only('xs')]: {
                fontSize: "40px"
            },
            color: theme.customColor.indigo.dark,
            fontWeight: "bold",
            lineHeight: "1.2"
        },
        '& p': {
            color: theme.customColor.indigo.main,
            marginTop: theme.spacing(2),
            fontSize: "14px",
            opacity: 0.8
        },
        '& button': {
            marginTop: theme.spacing(2),
            background: theme.customColor.tomato.main,
            color: "#fff",
            padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
            '&:hover': {
                background: theme.customColor.tomato.main,
                opacity: 0.9
            }
        }
    },
    rightBanner: {
        [theme.breakpoints.up('sm')]: {
            width: "50%",
            paddingRight: theme.spacing(3),
        },
        [theme.breakpoints.only('xs')]: {
            width: "100%"
        },
        '& img': {
            maxWidth: "100%",
            maxHeight: "400px",
            width: "100%"
        }
    },
    radio: {
        padding: "0 !important",
        color: `${theme.customColor.indigo.main} !important`
    }
}))