import { makeStyles } from "@mui/styles"

export const useStyles = makeStyles((theme: any) => ({
    root: {

    },
    headingWrapper: {
        '& .heading-icon': {
            color: "rgb(104, 201, 68)",
            marginRight: theme.spacing(1)
        },
        '& h2': {
            fontWeight: "bold",
            color: theme.customColor.indigo.main
        }
    },
    viewLinkWrapper: {
        '& a': {
            fontSize: "13px",
            color: "inherit",
            textDecoration: "none",
            fontWeight: "bold",
            opacity: 0.9
        }
    },
    container: {
        position: "relative",
        padding: theme.spacing(2),
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
                transform: "translate(-50%, -50%)",
                webkitTransform: "translate(-50%, -50%)",
                mozTransform: "translate(-50%, -50%)",
                msTransform: "translate(-50%, -50%)",
                oTransform: "translate(-50%, -50%)",
            },
            '&.next-arrow-btn': {
                right: 0,
                transform: "translate(50%, -50%)",
                webkitTransform: "translate(50%, -50%)",
                mozTransform: "(50%, -50%)",
                msTransform: "translate(50%, -50%)",
                oTransform: "translate(50%, -50%)"
            },
            '& .arrow-icon': {
                color: "#fff"
            }
        },
        '& .row-products-wrapper': {
            overflow: "hidden",
            touchAction: "pan-y",
            msTouchAction: "-ms-pan-y",
            '& *': {
                userSelect: "none",
                msUserSelect: "none",
                webkitUserSelect: "none",
            },
            '& .row-products': {
                display: "grid",
                gap: "3%",
                [theme.breakpoints.up('md')]: {
                    gridTemplateColumns: "repeat(10, calc((100% - 3% * 3) / 4))",
                },
                [theme.breakpoints.down('md')]: {
                    gridTemplateColumns: "repeat(10, calc((100% - 3% * 2) / 3))"
                },
                [theme.breakpoints.only('xs')]: {
                    gridTemplateColumns: "repeat(10, calc((100% - 3% * 1) / 2))"
                },
                '&:fist-child': {
                    marginBottom: theme.spacing(2)
                },
                '&:last-child': {
                    marginTop: theme.spacing(2)
                }
            }
        }
    }
}))