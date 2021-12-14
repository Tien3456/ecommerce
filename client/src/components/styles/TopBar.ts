import { makeStyles } from "@mui/styles"

export const useStyles = makeStyles((theme: any) => ({
    root: {
        background: theme.customColor.indigo.main,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.only('xs')]: {
            height: "10%"
        },
        '& .contact-info': {
            '& span, svg': {
                [theme.breakpoints.down('md')]: {
                    display: "none"
                }
            },
            '& .logo': {
                [theme.breakpoints.up('sm')]: {
                    display: "none"
                }
            }
        },
        '& .select-options': {
            '& a:nth-child(1), a:nth-child(2)': {
                [theme.breakpoints.only('xs')]: {
                    display: "none"
                }
            }
        },
        '& p, span, a': {
            fontSize: "12px",
            color: "#fff"
        },
        '& .top-bar-title': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        '& .top-bar-icon': {
            color: "#fff"
        },
        '& a': {
            textDecoration: "none",
            marginLeft: theme.spacing(3),
            '&:hover': {
                color: theme.customColor.tomato.main
            },
            [theme.breakpoints.between('sm', 'md')]: {
                marginLeft: theme.spacing(2)
            }
        },
        '& .menu-wrapper': {
            marginLeft: theme.spacing(3),
            '& button': {
                color: "#fff",
                fontSize: "12px"
            },
            [theme.breakpoints.between('sm', 'md')]: {
                marginLeft: theme.spacing(2)
            }
        }
    }
}))