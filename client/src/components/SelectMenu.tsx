import React, { useState } from 'react'
import { Box, Menu, MenuItem, Button } from '@mui/material'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

interface Item {
    content: string,
    handleEvent?: () => void
}

interface Props {
    buttonId: string,
    menuItems: Item[],
    id: string
}

const SelectMenu: React.FC<Props> = (props) => {

    const [anchorEl, setAnchorEl] = useState<any>(null)
    const open: boolean = Boolean(anchorEl)
    const [btnContent, setBtnContent] = useState<string>(props.menuItems[0].content)

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => setAnchorEl(null)

    return (
        <Box>
            <Button 
                id={ props.buttonId }
                aria-controls={ props.id }
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={ handleClick }
                style={{ color: "#fff", fontSize: "12px" }}
            >
                { btnContent }
                <KeyboardArrowDownRoundedIcon 
                    fontSize="small"
                    style={{ color: "#fff", fontSize: "14px" }}
                />
            </Button>
            <Menu
                open={ open }
                id={ props.id }
                anchorEl={anchorEl}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': props.buttonId,
                }}
            >
                {
                    props.menuItems.map((menuItem, i) => (
                        <MenuItem
                            key={ i }
                            style={{ fontSize: "12px" }}
                            onClick={() => {
                                handleClose()
                                setBtnContent(menuItem.content)
                            }}
                        >
                            { menuItem.content }
                        </MenuItem>
                    ))
                }
            </Menu>
        </Box>
    )
}

export default SelectMenu
