import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        '&.MuiListItem-root': {
            alignItems: "flex-start"
        },
        '& .MuiListItemText-root': {
            '& .MuiListItemText-primary': {
                fontSize: "14px",
                fontWeight: "bold",
                opacity: 0.9,
            },
            '& .MuiListItemText-secondary': {
                display: "flex",
                flexDirection: "column",
                '& .text-comment': {
                    fontSize: "14px",
                    wordWrap: "break-word"
                },
                '& .created-at': {
                    fontSize: "13px"
                }
            }
        }
    }
}))