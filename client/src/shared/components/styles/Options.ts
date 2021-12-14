import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        '&.MuiPaper-root': {
            boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
            WebkitBoxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
        },
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4)
        },
        [theme.breakpoints.only('xs')]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3)
        },
        '& a': {
            textDecoration: "none",
            color: "unset",
            width: "100%",
            height: "100%"
        },
        '& .heading': {
            fontSize: "13px",
            textTransform: "uppercase",
            color: "inherit"
        },
        '& button.MuiButton-root': {
            position: "relative",
            justifyContent: "flex-start",
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(2),
            paddingTop: 0,
            paddingBottom: 0,
            textTransform: "capitalize",
            color: "rgba(0, 0, 0, 0.7)",
            fontSize: "14px",
            borderRadius: 0,
            transition: "all 0.3s ease-out",
            WebkitTransition: "all 0.3s ease-out",
            MozTransition: "all 0.3s ease-out",
            MsTransition: "all 0.3s ease-out",
            OTransition: "all 0.3s ease-out",
            '&:hover, &.actived': {
                color: theme.customColor.tomato.main,
                background: "inherit"
            },
            '&:hover::before, &.actived::before': {
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                background: theme.customColor.tomato.main,
                content: "''"
            },
            '& svg, span': {
                marginRight: theme.spacing(1),
                opacity: 0.8,
                fontSize: "20px"
            }
        }
    }
}))