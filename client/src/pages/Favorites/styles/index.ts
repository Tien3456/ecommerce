import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        '& .grid-container': {
            display: "grid",
            gap: theme.spacing(2),
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.only('xs')]: {
                gridTemplateColumns: "auto auto"
            },
            [theme.breakpoints.up('sm')]: {
                gridTemplateColumns: "auto auto auto"
            },
            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(3)
            }
        }
    }
}))