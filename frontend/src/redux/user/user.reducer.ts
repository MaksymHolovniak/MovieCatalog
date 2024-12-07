import { ThunkAction } from 'redux-thunk'
import { AppDispatch, AppStateType, InferActionsTypes } from '../store.ts'
import { userAPI } from '../../api/user.api.ts'
import { UserWithFavoritesType } from '../../types/user.type.ts'

const SET_PROFILE = 'movieCatalog/user/SET_PROFILE' as const
const DEL_PROFILE = 'movieCatalog/user/DEL_PROFILE' as const
const TOGGLE_IS_FETCHING = 'movieCatalog/user/TOGGLE_IS_FETCHING' as const

let initialState = {
	profile: null as UserWithFavoritesType | null,
	isFetching: false
}

type InitialStateType = typeof initialState

const UserReducer = (state=initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_PROFILE: {
			return { ...state, profile: action.profile }
		}
		case DEL_PROFILE: {
			return {...state, profile: null}
		}
		case TOGGLE_IS_FETCHING: {
			return {...state, isFetching: action.isFetching}
		}
		default:
			return state;
	}
}

export const actions = {
		setProfile: (profile: UserWithFavoritesType) => ({
			type: SET_PROFILE,
			profile
		}),
	delProfile: () => ({
		type: DEL_PROFILE,
	}),
	toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching})
	}

type ActionsTypes = InferActionsTypes<typeof actions>


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const toggleFavorite = (id: number): ThunkType => async (dispatch, getState) => {
	const data = await userAPI.toggleFavorite(id)
	if (data) {
		const state = getState()
		const profile = state.user.profile
		if (profile) {
			const isFavorite = profile.favorites.some(favorite => favorite.id === id)
			const updatedFavorites = isFavorite
				? profile.favorites.filter(favorite => favorite.id !== id)
				: [...profile.favorites, { id }]

			dispatch(actions.setProfile({ ...profile, favorites: updatedFavorites }))
		}
	}
}

export const getProfile = (): ThunkType =>  async (dispatch) => {
	dispatch(actions.toggleIsFetching(true))
	const response = await userAPI.getProfile()
		if(response.data) {
			dispatch(actions.setProfile(response.data))
			dispatch(actions.toggleIsFetching(false))
		}
}

export const delProfile = () =>  (dispatch: AppDispatch) => {
	dispatch(actions.delProfile())
}
export default UserReducer