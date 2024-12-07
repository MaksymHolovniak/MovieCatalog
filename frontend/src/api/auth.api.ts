import { axiosClassic } from './api.interceptor.ts'
import { AuthResponse } from '../redux/user/user.type.ts'
import { getContentType } from './api.helper.ts'


export const authAPI = {
	registration(email: string, password: string, name: string, avatarPath: string) {
		return axiosClassic.post<AuthResponse>('auth/register', { email, password, name, avatarPath }).then(response => {
			return response.data
		})
			.catch(error => {
				if (error.response && error.response.data.message === 'User with this email already exists') {
					throw new Error('Ця електронна пошта вже використовується. Спробуйте іншу або увійдіть.')
				}
				if (error.response && error.response.data.message === 'User with this name already exists') {
					throw new Error('Цей нікнейм вже зайнятий. Спробуйте інший.')
				}
				throw error
			})
	},
	login(email: string, password: string) {
		return axiosClassic.post<AuthResponse>('auth/login', { email, password }).then(response => {
			return response.data
		})
			.catch(error => {
				if (error.response && error.response.status === 401) {
					throw new Error('Неправильні дані для входу. Спробуйте ще раз.')
				}
				throw error
			})
	},

	getNewTokens(refreshToken: string) {
		return axiosClassic.post<AuthResponse>('auth/login/access-token', { refreshToken }).then(response => {
			return response
		})

	}
}




