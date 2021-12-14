import { createStore, combineReducers, applyMiddleware, AnyAction, Action } from 'redux'
import { reducer as headerReducer } from './header/reducer'
import { reducer as authReducer } from './auth/reducer'
import { reducer as homeReducer } from './home/reducer'
import { reducer as cartReducer } from './cart/reducer'
import { reducer as modalReducer } from './modal/reducer'
import { reducer as categoriesReducer } from './categories/reducer'
import { reducer as errorReducer } from './error/reducer'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
    auth: authReducer,
    header: headerReducer,
    home: homeReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    modal: modalReducer,
    error: errorReducer
})

export const store = createStore(
    reducers, 
    composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof reducers>
export type RootDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action<any>>