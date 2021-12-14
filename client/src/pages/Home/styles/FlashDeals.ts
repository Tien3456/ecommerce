import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        position: "relative",
        width: "100%",
        '& a': {
            color: "inherit",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "bold"
        },
        '& .arrow-btn': {
            position: "absolute",
            background: theme.customColor.indigo.main,
            zIndex: 9,
            top: "50%",
            transform: "translateY(-50%)",
            webkitTransform: "translateY(-50%)",
            mozTransform: "translateY(-50%)",
            msTransform: "translateY(-50%)",
            oTransform: "translateY(-50%)",
            '&:hover': {
                background: theme.customColor.indigo.main,
                opacity: 0.8
            },
            '&.back-arrow-btn': {
                left: 0,
                transform: "translateX(-50%)",
                webkitTransform: "translateX(-50%)",
                mozTransform: "translateX(-50%)",
                msTransform: "translateX(-50%)",
                oTransform: "translateX(-50%)",
            },
            '&.next-arrow-btn': {
                right: 0,
                transform: "translateX(50%)",
                webkitTransform: "translateX(50%)",
                mozTransform: "translateX(50%)",
                msTransform: "translateX(50%)",
                oTransform: "translateX(50%)"
            },
            '& .arrow-icon': {
                color: "#fff"
            }
        }
    },
    heading: {
        fontWeight: "bold",
        textTransform: "capitalize",
        color: theme.customColor.indigo.dark
    },
    boltIcon: {
        color: theme.customColor.tomato.main,
        marginRight: theme.spacing(1)
    },
    productsWrapper: {
        scrollBehavior: "smooth",
        overflow: "hidden",
        touchAction: "pan-y",
        msTouchAction: "pan-y",
        userSelect: "none",
        webkitUserSelect: "none",
        msUserSelect: "none"
    },
    rowProducts: {
    },
    itemWrapper: {
        marginRight: "3%",
        [theme.breakpoints.only('xs')]: {
            flex: "0 0 calc((100% - 3% * 1) / 2)",
        },
        [theme.breakpoints.only('sm')]: {
            flex: "0 0 calc((100% - 3% * 2) / 3)",
        },
        [theme.breakpoints.up('md')]: {
            flex: "0 0 calc((100% - 3% * 3) / 4)"
        }
    }
}))