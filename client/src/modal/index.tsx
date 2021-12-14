import React from 'react'
import { Modal } from '@mui/material'
import CartModal from '../pages/Cart/CartModal'
import { 
    useAppSelector as useSelector,
    useAppDispatch as useDispatch
} from '../redux/hooks'
import { actions } from '../redux/modal/actions'

interface Child {
    name: string,
    component: JSX.Element | JSX.Element[]
}

const CustomModal = () => {

    const children = [
        { name: 'cart', component: <CartModal /> }
    ]

    const dispatch = useDispatch()
    const { isOpen, child } = useSelector(state => state.modal)

    const currentChild = children.find(c => c.name === child)

    return (
        <Modal
            open={ isOpen }
            sx={{ 
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            onClose={() => dispatch(actions.doCloseModal())}
        >
            {
                currentChild
                    ? <>{ currentChild.component }</>
                    : <div></div>
            }
        </Modal>
    )
}

export default CustomModal
