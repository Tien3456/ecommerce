import { makeStyles } from "@mui/styles"

export const useStyles = makeStyles((theme: any) => ({
    root: {
        '& button': {
            textTransform: "capitalize",
            background: "rgb(252, 233, 236)",
            color: theme.customColor.tomato.main,
            borderRadius: "20px",
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            '&:hover, &.active': {
                background: theme.customColor.tomato.main,
                color: "#fff"
            },
            '& a': {
                color: "inherit",
                textDecoration: "none"
            }
        },
        '& span.divider': {
            background: "rgb(252, 233, 236)",
            width: "50px",
            height: "4px",
            '&.active': {
                background: theme.customColor.tomato.main
            }
        }
    }
}))