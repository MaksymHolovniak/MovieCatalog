import Cookies from 'js-cookie'
import { AuthResponse, TokensType } from '../user/user.type.ts'

export const getAccessToken = () => {
	const accessToken = Cookies.get('accessToken')

	return accessToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}
export const saveTokensToStorage = (data: TokensType) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

export const removeFromStorage = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
	localStorage.removeItem('user')
}

export const saveToStorage = (data: AuthResponse) => {
	saveTokensToStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}