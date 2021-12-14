import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        position: "relative",
        padding: theme.spacing(1),
        '& img': {
            objectFit: "cover",
            cursor: "pointer",
            aspectRatio: "1 / 1"
        },
        '& .name-wrapper span': {
            color: theme.customColor.indigo.dark,
            textTransform: "capitalize",
            fontSize: "14px",
            fontWeight: "bold",
            lineHeight: "1.5rem",
            maxHeight: "3rem",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        '& .price-wrapper span': {
            fontSize: "14px",
            fontWeight: "bold",
            [theme.breakpoints.only('xs')]: {
                fontSize: "13px"
            },
            '&.current-price': {
                color: theme.customColor.tomato.main,
                marginRight: "5px"
            },
            '&:not(.current-price)': {
                textDecoration: "line-through"
            },
        },
        '& .sale-percent': {
            background: theme.customColor.tomato.main,
            position: "absolute",
            top: theme.spacing(1),
            left: theme.spacing(1),
            zIndex: 1,
            color: "#fff",
            fontWeight: "bold",
            fontSize: "11px",
            height: "27px",
            '& .MuiChip-label': {
                opacity: 0.9
            }
        },
        '& .contact-wrapper': {
            display: "none",
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            zIndex: 1,
            '& button': {
                padding: "5px",
            },
            '& .contact-icon': {
                color: theme.customColor.indigo.main
            }
        },
        '&:hover .contact-wrapper': {
            display: "block"
        }
    }
}))