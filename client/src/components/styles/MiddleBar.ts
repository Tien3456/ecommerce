import { makeStyles } from '@mui/styles'

interface Props {
    hasFilledText: boolean
}

export const useStyles = makeStyles((theme: any) => ({
    root: {
        [theme.breakpoints.only('xs')]: {
            height: "12%",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            background: "rgb(255, 255, 255)",
            zIndex: 99,
            boxShadow: "rgb(43 52 69 / 10%) 0 6px 3px -3px"
        },
        '&.fixed': {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            background: "rgb(255, 255, 255)",
            zIndex: 99,
            boxShadow: "rgb(43 52 69 / 10%) 0 6px 3px -3px",
        },
        '& .MuiContainer-root': {
            [theme.breakpoints.only('xs')]: {
                height: "100%"
            }
        }
    },
    stack: {
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
        },
        height: "100%"
    },
    logo: {
        [theme.breakpoints.only('xs')]: {
            display: "none"
        }
    },
    formWrapper: {
        [theme.breakpoints.only('xs')]: {
            width: "100%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "60%"
        },
        '& form': {
            width: "100%",
            '& .search-icon, & .loading-wrapper': {
                position: "absolute",
                top: "50%",
                left: theme.spacing(2),
                transform: "translateY(-50%)",
                webkitTransform: "translateY(-50%)",
                mozTransform: "translateY(-50%)",
                msTransform: "translateY(-50%)",
                oTransform: "translateY(-50%)",
                '&.search-icon': {
                    opacity: 0.8
                }
            }
        }
    },
    selectWrapper: {
        position: "absolute",
        right: 0,
        top: 0,
        height: "100%",
        zIndex: 100,
        [theme.breakpoints.up('md')]: {
            width: "160px"
        },
        [theme.breakpoints.down('md')]: {
            width: "30%",
            '& svg': {
                display: "none"
            }
        },
        [theme.breakpoints.only('xs')]: {
            width: "35%",
        },
        '& .MuiOutlinedInput-root': {
            height: "100%",
            '& .MuiSelect-select': {
                padding: "0 !important",
                height: "100%",
                width: "100%"
            },
            '& fieldset': {
                border: "none"
            },
            '& button': {
                background: "rgba(25, 118, 210, 0.04)",
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: "14px",
                opacity: 0.7,
                color: "black",
                width: "100%",
                height: "100%",
                padding: 0,
                [theme.breakpoints.only('xs')]: {
                    fontSize: "12px"
                }
            }
        }
    },
    textField: (props: Props) => ({
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        borderRadius: "20px",
        width: "100%",
        color: theme.customColor.indigo.light,
        outline: 0,
        border: 
            props.hasFilledText 
                ? `2px solid ${theme.customColor.tomato.main}`
                : `1px solid #c4c4c4`,
        '&::placeholder, &:-ms-input-placeholder, &::-webkit-input-placeholder': {
            color: "#c4c4c4",
            fontFamily: "'Open sans'"
        },
        '&:hover': {
            borderColor: "rgba(0, 0, 0, 0.5)"
        },
        '&:focus': {
            borderColor: theme.customColor.tomato.main
        },
        [theme.breakpoints.up('md')]: {
            paddingRight: "165px"
        },
        [theme.breakpoints.down('md')]: {
            paddingRight: "calc(30% + 5px)"
        },
        [theme.breakpoints.only('xs')]: {
            paddingRight: "calc(35% + 5px)"
        }
    }),
    searchedProducts: {
        '&.MuiList-root': {
            position: "absolute",
            top: "calc(100% + 5px)",
            left: 0,
            width: "100%",
            maxHeight: "400px",
            overflow: "auto",
            zIndex: 100,
            background: "#fff",
            transition: "all 0.5s ease-out",
            webkitTransition: "all 0.5s ease-out",
            mozTransition: "all 0.5s ease-out",
            msTransition: "all 0.5s ease-out",
            oTransition: "all 0.5s ease-out",
            transform: "scaleY(0)",
            webkitTransform: "scaleY(0)",
            mozTransform: "scaleY(0)",
            msTransform: "scaleY(0)",
            oTransform: "scaleY(0)",
            transformOrigin: "center top",
            '&.show-list': {
                transform: "scaleY(1)",
                webkitTransform: "scaleY(1)",
                mozTransform: "scaleY(1)",
                msTransform: "scaleY(1)",
                oTransform: "scaleY(1)",
            },
            '&::-webkit-scrollbar': {
                width: "8px"
            },
            '&::-webkit-scrollbar-thumb': {
                background: theme.customColor.tomato.main
            }
        }
    },
    iconButtonsWrapper: {
        [theme.breakpoints.only('xs')]: {
            display: "none"
        },
        '& .badge': {
            '& .MuiBadge-badge': {
                background: theme.customColor.tomato.main,
                color: "#fff"
            }
        }
    },
    iconButton: {
        background: "rgb(243, 245, 249) !important"
    }
}))