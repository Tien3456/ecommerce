import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(3)
        }
    },
    headingWrapper: {
        '& svg': {
            marginRight: theme.spacing(2),
            color: theme.customColor.tomato.main
        },
        '& h2.MuiTypography-root': {
            fontWeight: "bold",
            opacity: 0.9
        },
        '& button': {
            background: theme.customColor.tomato.light,
            padding: 0,
            '&:hover': {
                background: theme.customColor.tomato.light,
                opacity: 0.8
            },
            '& a': {
                textDecoration: "none",
                color: theme.customColor.tomato.main,
                textTransform: "capitalize",
                display: "inline-block",
                padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
                fontWeight: "bold"
            }
        }
    },
    gridContainer: {
        display: "grid",
        justifyContent: "space-between",
        [theme.breakpoints.up('lg')]: {
            '--itemWidth': `calc((100% - ${theme.spacing(12)}) / 8)`,
            gridTemplateColumns: "repeat(8, var(--itemWidth))"
        },
        [theme.breakpoints.down('lg')]: {
            '--itemWidth': `calc((100% - ${theme.spacing(6)}) / 4)`,
            gridTemplateColumns: "repeat(4, var(--itemWidth))",
            rowGap: theme.spacing(2)
        },
        [theme.breakpoints.only('xs')]: {
            '--itemWidth': `calc((100% - ${theme.spacing(3)}) / 2)`,
            gridTemplateColumns: "repeat(2, var(--itemWidth))"
        }
    },
    card: {
        background: "#fff",
        boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
        WebkitBoxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
        padding: theme.spacing(2),
        borderRadius: "8px",
        [theme.breakpoints.up('lg')]: {
            gridColumn: "1 / span 4"
        },
        [theme.breakpoints.down('lg')]: {
            gridColumn: "1 / span 2",
            gridRow: "1 / span 2"
        },
        [theme.breakpoints.only('sm')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        },
        [theme.breakpoints.only('xs')]: {
            gridColumn: "1 / span 2"
        },
        '& .avatar': {
            width: "64px",
            height: "64px",
            background: theme.customColor.tomato.light,
            fontWeight: "bold",
            fontSize: "30px",
            color: theme.customColor.tomato.main
        },
        '& p.username': {
            fontSize: "15px",
            fontWeight: "bold",
            opacity: 0.9,
            lineHeight: "1rem"
        },
        '& span.balance': {
            color: theme.customColor.tomato.main
        },
        '& p.MuiTypography-root.user-type': {
            textTransform: "uppercase",
            letterSpacing: "3px",
            fontSize: "14px",
            [theme.breakpoints.only('sm')]: {
                letterSpacing: "2px",
                fontSize: "12px"
            }
        }
    },
    quantityWrapper: {
        borderRadius: "8px",
        boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
        WebkitBoxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
        background: "#fff",
        padding: theme.spacing(2),
        '& > p:first-child': {
            color: theme.customColor.tomato.main,
            fontSize: "18px",
            fontWeight: "bold",
            opacity: 0.9
        },
        '& p:last-child': {
            fontSize: "14px",
            textAlign: "center"
        }
    }
}))