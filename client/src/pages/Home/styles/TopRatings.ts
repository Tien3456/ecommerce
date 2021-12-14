import { makeStyles } from "@mui/styles"

export const useStyles = makeStyles((theme: any) => ({
    root: {
        width: "100%",
        '& a': {
            color: "inherit",
            fontSize: "13px",
            textDecoration: "none",
            fontWeight: "bold"
        }
    },
    heading: {
        fontWeight: "bold",
        textTransform: "capitalize",
        color: theme.customColor.indigo.dark
    },
    headingIcon: {
        color: "yellow",
        marginRight: theme.spacing(1)
    },
    rowProductsWrapper: {
        overflow: "hidden",
        touchAction: "pan-y",
        msTouchAction: "-ms-pan-y",
        userSelect: "none",
        webkitUserSelect: "none",
        MozUserSelect: "none"
    },
    rowProducts: {
        [theme.breakpoints.down('lg')]: {
            display: "grid !important",
            gridTemplateColumns: "auto auto auto",
            gap: "3%"
        },
        [theme.breakpoints.only('xs')]: {
            gridTemplateColumns: "auto auto",
            gap: "3%"
        }
    },
    topRatingItem: {
        [theme.breakpoints.up('lg')]: {
            width: "calc((100% - 9%) / 4)",
            marginRight: "3%"
        },
        [theme.breakpoints.down('lg')]: {
            width: "100%"
        }
    }
}))