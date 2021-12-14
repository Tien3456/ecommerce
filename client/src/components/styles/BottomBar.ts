import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        width: "100%",
        [theme.breakpoints.only('xs')]: {
            position: "fixed",
            bottom: 0,
            left: 0,
            boxShadow: "rgb(43 52 69 / 10%) 0 -4px 3px",
            zIndex: 99,
            background: "rgb(255, 255, 255)",
            padding: `${theme.spacing(1)} 0`,
            height: "10%",
            '& a': {
                textDecoration: "none",
                color: "unset"
            }
        },
        [theme.breakpoints.up('sm')]: {
            position: "relative",
            boxShadow: "rgb(43 52 69 / 10%) 0 6px 3px -3px",
            zIndex: 10
        }
    },
    stack: {
        [theme.breakpoints.up('sm')]: {
            paddingBottom: theme.spacing(2)
        }
    },
    mobileIconWrapper: {
        '& .nav-icon': {
            color: theme.customColor.indigo.light
        },
        '& span': {
            color: theme.customColor.indigo.light,
            fontSize: "13px"
        }
    },
    nav: {
        '& a': {
            color: theme.customColor.indigo.main,
            textDecoration: "none",
            fontSize: "14px",
            marginLeft: theme.spacing(3),
            opaticy: 0.8,
            '&:hover': {
                color: theme.customColor.tomato.main
            }
        }
    },
    categoriesMenuWrapper: {
        position: "relative",
        width: "278px",
        '& button': {
            width: "100%",
            color: theme.customColor.indigo.main,
            fontSize: "14px",
            textTransform: "capitalize",
            background: "rgba(25, 118, 210, 0.04)",
            '& .view-list-icon': {
                marginRight: theme.spacing(1)
            }
        },
        '& .arrow-icon': {
            transition: "all 0.3s ease-out",
            WebkitTransition: "all 0.3s ease-out",
            MozTransition: "all 0.3s ease-out",
            MsTransition: "all 0.3s ease-out",
            OTransition: "all 0.3s ease-out",
            '&.right': {
                transform: "rotate(0)",
                Webkitransform: "rotate(0)",
                MozTransform: "rotate(0)",
                MsTransform: "rotate(0)"
            },
            '&.bottom': {
                transform: "rotate(90deg)",
                WebkitTransform: "rotate(90deg)",
                MozTransform: "rotate(90deg)",
                MsTransform: "rotate(90deg)"
            }
        },
        '& .categories-list': {
            position: "absolute",
            top: `calc(100% + ${theme.spacing(1)})`,
            left: 0,
            width: "100%",
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            transition: "all 0.3s ease-out",
            WebkitTransition: "all 0.3s ease-out",
            MsTransition: "all 0.3s ease-out",
            OTransition: "all 0.3s ease-out",
            transformOrigin: "center top",
            background: "fff",
            zIndex: 1,
            '&.hide': {
                transform: "scaleY(0)",
                WebkitTransform: "scaleY(0)",
                MsTransform: "scaleY(0)",
                MozTransform: "scaleY(0)",
            },
            '&.show': {
                transform: "scaleY(1)",
                WebkitTransform: "scaleY(1)",
                MsTransform: "scaleY(1)",
                MozTransform: "scaleY(1)",
            },
            '& a': {
                textDecoration: "none",
                color: theme.customColor.indigo.main,
                fontSize: "14px",
                padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
                transition: "all 0.3s ease-out",
                WebkitTransition: "all 0.3s ease-out",
                MsTransition: "all 0.3s ease-out",
                OTransition: "all 0.3s ease-out",
                '&:hover': {
                    background: theme.customColor.tomato.light,
                    color: theme.customColor.tomato.main
                }
            }
        }
    }
}))