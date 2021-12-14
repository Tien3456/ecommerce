import { makeStyles } from "@mui/styles"

export const useStyles = makeStyles((theme: any) => ({
    root: {
        background: "rgb(12, 14, 48)",
        paddingTop: "120px",
        paddingBottom: "120px"
    },
    row: {
        display: "grid",
        justifyContent: "space-between",
        gap: theme.spacing(3),
        [theme.breakpoints.only('xs')]: {
            gridTemplateColumns: "auto",
        },
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: "auto auto",
        },
        [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: "auto auto auto auto",
            gap: "unset"
        },
        '& > *:first-child, & > *:last-child': {
            [theme.breakpoints.up('lg')]: {
                maxWidth: "370px"
            },
            [theme.breakpoints.down('lg')]: {
            }
        },
        '& > *': {
            
        },
        '& span, p': {
            color: "rgb(174, 180, 190)",
            fontSize: "14px"
        },
        '& h4': {
            color: "#fff",
            fontSize: "22px",
            fontWeight: "bold"
        }
    },
    downloadBtn: {
        background: "rgb(12, 42, 77) !important",
        '& span': {
            color: "#fff",
            fontSize: "10px",
            lineHeight: 1
        },
        '& h6': {
            textTransform: "capitalize",
            fontWeight: "bold",
            color: "#fff",
            fontSize: "14px",
        }
    },
    socialBtn: {
        background: "rgba(0, 0, 0, 0.2) !important",
        padding: theme.spacing(1),
        '& .social-icon': {
            color: "#fff",
            fontSize: "14px"
        }
    }
}))