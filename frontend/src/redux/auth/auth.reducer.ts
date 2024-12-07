import { AppStateType, InferActionsTypes } from '../store.ts'
import { ThunkAction } from 'redux-thunk'
import { authAPI } from '../../api/auth.api.ts'
import { removeFromStorage, saveToStorage } from './auth.helper.ts'
import Cookies from 'js-cookie'
import { delProfile, getProfile } from '../user/user.reducer.ts'

const SET_USER_DATA ='movieCatalog/auth/SET_USER_DATA' as const
const LOGOUT = 'movieCatalog/auth/LOGOUT' as const

let initialState = {
	user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
}

type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const AuthReducer = (state=initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				user: action.payload,
			};
		case LOGOUT:
			return {
				...state,
				user: null
			}
		default:
			return state;
	}
}





export const actions = {
	setAuthUseData: (userId: number | null, email: string | null, name: string | null, avatarPath: string | null, role: string | null) => ({
		type: SET_USER_DATA,
		payload:  {userId, email, name, avatarPath, role},
	}),
	logout: () => ({ type: LOGOUT })
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

type ThunkTypeWithoutPromise = ThunkAction<void , AppStateType, unknown, ActionsTypes>

	export const registration = (email: string, password: string, name: string): ThunkType => async (dispatch) => {
		const data = await authAPI.registration(email, password, name, 'https://i.ibb.co/LkFcVgH/avatar-default.png')
		if(data.accessToken) {
			saveToStorage(data)
			dispatch(actions.setAuthUseData(data.user.id, data.user.email, data.user.name, data.user.avatarPath, data.user.role))
		}
	}

	export const login = (email: string, password: string): ThunkType => async (dispatch) => {
			const data = await authAPI.login(email, password)
			if(data.accessToken) {
				saveToStorage(data)
				dispatch(actions.setAuthUseData(data.user.id, data.user.email, data.user.name, data.user.avatarPath, data.user.role))
				getProfile()
			}
	}

export const logoutThunk = () : ThunkTypeWithoutPromise => {
	return (dispatch) => {
		removeFromStorage()
		dispatch(actions.logout())
		delProfile()
	}
}

export const getNewTokens =  async ()  => {
		const refreshToken   =  Cookies.get('refreshToken')
		const response =  await authAPI.getNewTokens(refreshToken)
		if(response.data.accessToken) saveToStorage(response.data)

		return response
}

export default AuthReducer