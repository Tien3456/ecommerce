import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
    
    },
    formWrapper: {
        borderRadius: "10px",
        [theme.breakpoints.only('xs')]: {
            width: "100%",
            height: "100%",
            maxHeight: "120%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "55%",
            padding: theme.spacing(5)
        },
        [theme.breakpoints.up('md')]: {
            width: "40%",
            padding: theme.spacing(5)
        },
        [theme.breakpoints.up('lg')]: {
            width: "30%"
        },
        '& .heading-wrapper': {
            '& .MuiTypography-root': {
                fontWeight: 700,
                textTransform: "capitalize"
            }
        },
        '& .title-wrapper': {
            '& .MuiTypography-root': {
                fontWeight: "bold",
                fontSize: "12px",
                opacity: 0.9
            }
        },
        '& .label-wrapper': {
            width: "100%",
            '& .MuiTypography-root': {
                fontSize: "12px",
                fontWeight: "bold",
                opacity: 0.9
            }
        },
        '& .input-wrapper': {
            width: "100%",
            '& .MuiOutlinedInput-root': {
                width: "100%",
                '& input': {
                    padding: `10px ${theme.spacing(2)}`,
                    fontSize: "13px"
                },
            }
        },
        '& .error-wrapper': {
            '& p': {
                fontSize: "13px",
                color: theme.customColor.tomato.main
            }
        },
        '& .divider-wrapper': {
            width: "100%",
            '& span.divider': {
                width: "80px",
                height: "1px",
                background: "#c5c5c5"
            },
            '& span:not(.divider)': {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                fontSize: "13px",
                fontWeight: "bold"
            }
        },
        '& .button-wrapper': {
            width: "100%",
            '& .MuiButton-root': {
                width: "100%",
                textTransform: "capitalize",
                fontSize: "13px",
                fontWeight: "bold",
                color: "#fff",
                '&.btn-local-login': {
                    background: theme.customColor.tomato.main,
                    '&:hover': {
                        background: theme.palette.error.main
                    }
                },
                '&.btn-facebook-login': {
                    background: theme.palette.primary.main,
                    '&:hover': {
                        background: theme.palette.primary.dark
                    }
                },
                '&.btn-google-login': {
                    background: theme.palette.info.main,
                    '&:hover': {
                        background: theme.palette.info.dark
                    }
                }
            }
        },
        '& .link-wrapper': {
            '& .MuiTypography-root': {
                fontSize: "13px",
                fontWeight: "bold"
            },
            '& a': {
                color: theme.palette.primary.main,
                textDecoration: "none"
            }
        }
    }
}))