import { RootState, RootDispatch, AppThunkDispatch } from './store'
import { 
    TypedUseSelectorHook,
    useSelector,
    useDispatch
} from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<RootDispatch>()
export const useAppThunkDispatch = () => useDispatch<AppThunkDispatch>()