import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        '& .MuiButtonBase-root': {
            borderRadius: "5px",
            border: `1px solid ${theme.customColor.indigo.main}`,
            fontWeight: "bold",
            '&.Mui-selected': {
                background: theme.customColor.indigo.main,
                color: "#fff"
            }
        }
    }
}))