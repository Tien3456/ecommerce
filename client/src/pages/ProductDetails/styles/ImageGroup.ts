import { makeStyles } from '@mui/styles'

interface Props {
    imageSrc: string | null
}

export const useStyles = makeStyles((theme: any) => ({
    root: {

    },
    rowImages: {
        display: "grid",
        gap: theme.spacing(2),
        [theme.breakpoints.only('xs')]: {
            gridTemplateColumns: "auto auto"
        },
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: "auto auto auto"
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: "auto auto auto auto"
        }
    },
    bgImage: {
        width: "100%",
        borderRadius: "10px",
        cursor: "pointer"
    }
}))