import { makeStyles } from "@mui/styles"

export const useStyles = makeStyles((theme: any) => ({
    root: {
        position: "relative",
        '& a': {
            color: "inherit",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "bold"
        }
    },
    heading: {
        fontWeight: "bold",
        textTransform: "capitalize",
        color: theme.customColor.indigo.dark
    },
    gridViewIcon: {
        color: theme.customColor.tomato.main,
        marginRight: theme.spacing(1)
    },
    container: {
        position: "relative",
        '& .arrow-btn': {
            position: "absolute",
            background: theme.customColor.indigo.main,
            zIndex: 9,
            top: "50%",
            '&:hover': {
                background: theme.customColor.indigo.main,
                opacity: 0.8
            },
            '&.back-arrow-btn': {
                left: 0,
                transform: "translate(-50%, -50%) !important",
                webkitTransform: "translate(-50%, -50%) !important",
                mozTransform: "translate(-50%, -50%) !important",
                msTransform: "translate(-50%, -50%) !important",
                oTransform: "translate(-50%, -50%) !important",
            },
            '&.next-arrow-btn': {
                right: 0,
                transform: "translate(50%, -50%) !important",
                webkitTransform: "translate(50%, -50%) !important",
                mozTransform: "(50%, -50%) !important",
                msTransform: "translate(50%, -50%) !important",
                oTransform: "translate(50%, -50%) !important"
            },
            '& .arrow-icon': {
                color: "#fff"
            }
        }
    },
    rowWrapper: {
        overflow: "hidden",
        touchAction: "pan-y",
        msTouchAction: "-ms-pan-y",
        '& *': {
            userSelect: "none",
            webkitUserSelect: "none",
            msUserSelect: "none",
            mozUserSelect: "none"
        }
    },
    categoryItem: {
        marginRight: "3%",
        [theme.breakpoints.only('xs')]: {
            flex: "0 0 100%"
        },
        [theme.breakpoints.only('sm')]: {
            flex: "0 0 calc((100% - 3%) / 2)"
        },
        [theme.breakpoints.up('md')]: {
            flex: "0 0 calc((100% - (3% * 2)) / 3)"
        },
    }
}))