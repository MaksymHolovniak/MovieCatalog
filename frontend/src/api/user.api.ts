import { instance } from './api.interceptor.ts'
import { ToggleFavoriteResponse, UserWithFavoritesType } from '../types/user.type.ts'

export const userAPI = {
	toggleFavorite(id: number) {
		return instance.patch<ToggleFavoriteResponse>(`users/profile/favorites/${id}`).then(response => {
			return response
		})
	},
	getProfile() {
		return instance.get<UserWithFavoritesType>('users/profile').then(response => {
			return response
		})
	}
}