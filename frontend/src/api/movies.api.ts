import { axiosClassic, instance } from './api.interceptor.ts'
import { MoviesAllResponseType, MovieType, ValuesMovieType } from '../types/movie.type.ts'
import { PostReviewResponse } from '../types/review.type.ts'
import { ToggleFavoriteResponse } from '../types/user.type.ts'

export const moviesAPI = {
	getMovies(page: number, perPage: number, type?: string = '', searchTerm?: string = '', sort?: string = '') {
		return axiosClassic.get<MoviesAllResponseType>(`movies?page=${page}&perPage=${perPage}` + (type.length > 0 ? `&type=${type}` : '') + (searchTerm.length > 0 ? `&searchTerm=${searchTerm}` : '') + (sort.length > 0 ? `&sort=${sort}` : '')).then(response => {
			return response.data
		})
	},
	getMovieById(id: number) {
		return axiosClassic.get<MovieType>(`movies/${id}`).then(response => {
			return response.data
		})
	},
	getSimilar(id: number, page: number, perPage: number) {
		return axiosClassic.get<MoviesAllResponseType>(`movies/similar/${id}?page=${page}&perPage=${perPage}`).then(response => {
			return response.data
		})
	},
	leaveReview(movieId: number, reviewText: string) {
		return instance.post<PostReviewResponse>(`reviews/leave/${movieId}`, { text: String(reviewText) }).then(response => {
			return response.data
		})
	},
	createMovie(values: ValuesMovieType) {
		return instance.post<ValuesMovieType>(`movies`, {
			name: values.name,
			type: values.type,
			imagePath: values.imagePath,
			trailer: values.trailer,
			description: values.description,
			country: values.country,
			duration: values.duration,
			clarity: values.clarity,
			rating: values.rating,
			year: values.year,
			releaseDate: values.releaseDate,
			genres: values.genres,
			cast: values.cast
		}).then(response => {
			return response.data
		})
			.catch(error => {
				if (error.response && error.response.status === 403) {
					throw new Error('Доступ заборонено. Ви не маєте прав для створення цього медіа.');
				}
				throw error;
			});
	},
	updateMovie(values: ValuesMovieType, movieId: number) {
		return instance.put<ValuesMovieType>(`movies/${movieId}`, {
			name: values.name,
			type: values.type,
			imagePath: values.imagePath,
			trailer: values.trailer,
			description: values.description,
			country: values.country,
			duration: values.duration,
			clarity: values.clarity,
			rating: values.rating,
			year: values.year,
			releaseDate: values.releaseDate,
			genres: values.genres,
			cast: values.cast
		}).then(response => {
			return response.data
		})
			.catch(error => {
				if (error.response && error.response.status === 403) {
					throw new Error('Доступ заборонено. Ви не маєте прав для редагування цього медіа.');
				}
				throw error;
			});
	},
	deleteMovie(movieId: number) {
		return instance.delete(`movies/${movieId}`).then(response => {
			return response.data
		})
			.catch(error => {
				if (error.response && error.response.status === 403) {
					throw new Error('Доступ заборонено. Ви не маєте прав для видалення цього медіа.');
				}
				throw error;
			});
	}
}
