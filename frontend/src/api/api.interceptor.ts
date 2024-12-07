import axios from 'axios'
import { errorCatch, getContentType } from './api.helper.ts'
import { getAccessToken, removeFromStorage } from '../redux/auth/auth.helper.ts'
import { getNewTokens } from '../redux/auth/auth.reducer.ts'

const baseURL = 'http://localhost:4200/api/'


export const axiosOptions = {
	baseURL: baseURL,
	headers: getContentType()
}

export const axiosClassic = axios.create(axiosOptions)
export const instance = axios.create(axiosOptions)

instance.interceptors.request.use(async config => {
	const accessToken = getAccessToken()

	if (config && config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`


	return config
})

instance.interceptors.response.use(config => config, async error => {
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 || errorCatch(error) === 'jwt expired' || errorCatch(error) === 'jwt must be provided')
			&& error.config && !error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired')
				removeFromStorage()
			}
		}
		throw error
	}
)

