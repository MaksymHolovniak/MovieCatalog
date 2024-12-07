import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './auth/auth.reducer.ts'
import { useDispatch } from 'react-redux'
import MoviesReducer from './movies/movies.reducer.ts'
import UserReducer from './user/user.reducer.ts'

const rootReducer = combineReducers({
	auth: AuthReducer,
	movies: MoviesReducer,
	user: UserReducer
});

const store = configureStore({reducer: rootReducer})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

type PropertiesType<T> = T extends  {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends  {[key: string]: (...args: any[])=> any}> = ReturnType<PropertiesType<T>>

// @ts-ignore
window.store = store

export default store