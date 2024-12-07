import { AppDispatch, AppStateType, InferActionsTypes } from '../store.ts'
import { MoviesAllType, MovieType, ValuesMovieType } from '../../types/movie.type.ts'
import { ThunkAction } from 'redux-thunk'
import { moviesAPI } from '../../api/movies.api.ts'
import { string } from 'yup'
import { authAPI } from '../../api/auth.api.ts'
import { saveToStorage } from '../auth/auth.helper.ts'
import { getProfile } from '../user/user.reducer.ts'

const SET_FILMS = 'movieCatalog/movies/SET_FILMS' as const
const SET_SERIALS = 'movieCatalog/movies/SET_SERIALS' as const
const SET_CARTOONS = 'movieCatalog/movies/SET_CARTOONS' as const
const SET_CURRENT_PAGE = 'movieCatalog/movies/SET_CURRENT_PAGE' as const
const SET_PER_PAGE = 'movieCatalog/movies/SET_PER_PAGE' as const
const SET_LENGTH = 'movieCatalog/movies/SET_LENGTH' as const
const SET_CURRENT_MOVIE = 'movieCatalog/movies/SET_CURRENT_MOVIE' as const
const SET_SEARCH_TERM = 'movieCatalog/movies/SET_SEARCH_TERM' as const
const SET_ALL_MOVIES = 'movieCatalog/movies/SET_ALL_MOVIES' as const
const SET_SIMILAR_MOVIES = 'movieCatalog/movies/SET_SIMILAR_MOVIES' as const
const SET_TEXT_REVIEW = 'movieCatalog/movies/SET_TEXT_REVIEW' as const
const SET_SORT = 'movieCatalog/movies/SET_SORT' as const
const SET_SORT_USER_MOVIES = 'movieCatalog/movies/SET_SORT_USER_MOVIES' as const
const SET_TYPE_MOVIE = 'movieCatalog/movies/SET_TYPE_MOVIE' as const
const DEL_CURRENT_MOVIE='movieCatalog/movies/DEL_CURRENT_MOVIE' as const

let initialState = {
	allMovies: [] as Array<MoviesAllType>,
	films: [] as Array<MoviesAllType>,
	serials: [] as Array<MoviesAllType>,
	cartoons: [] as Array<MoviesAllType>,
	similarMovies: [] as Array<MoviesAllType>,
	lengthMovies: 0,
	page: 1,
	perPage: 30,
	currentMovie: null as MovieType | null,
	searchTerm: '',
	sort: '',
	typeMovie: '',
	reviewText: '',
	sortUserMovies: ''
}

type InitialStateType = typeof initialState


const MoviesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_FILMS: {
			return { ...state, films: action.films }
		}
		case SET_SERIALS: {
			return { ...state, serials: action.serials }
		}
		case SET_CARTOONS: {
			return { ...state, cartoons: action.cartoons }
		}
		case SET_CURRENT_PAGE: {
			return { ...state, page: action.page }
		}
		case SET_PER_PAGE: {
			return { ...state, perPage: action.perPage }
		}
		case SET_LENGTH: {
			return { ...state, lengthMovies: action.length }
		}
		case SET_CURRENT_MOVIE: {
			return {...state, currentMovie: action.movie}
		}
		case SET_SEARCH_TERM: {
			return {...state, searchTerm: action.searchTerm}
		}
		case SET_ALL_MOVIES: {
			return {...state, allMovies: action.movies}
		}
		case SET_SIMILAR_MOVIES: {
			return {...state, similarMovies: action.movies}
		}
		case SET_TEXT_REVIEW: {
			return {...state, reviewText: action.reviewText}
		}
		case SET_SORT: {
			return {...state, sort: action.sort}
		}
		case SET_SORT_USER_MOVIES: {
			return {...state, sortUserMovies: action.sortUserMovies}
		}
		case SET_TYPE_MOVIE: {
			return {...state, typeMovie: action.typeMovie}
		}
		case DEL_CURRENT_MOVIE: {
			return {...state, currentMovie: null }
		}
		default:
			return state
	}
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
	setFilms: (films: Array<MovieType>) => ({
		type: SET_FILMS,
		films
	}),
	setSerials: (serials: Array<MovieType>) => ({
		type: SET_SERIALS,
		serials
	}),
	setCartoons: (cartoons: Array<MovieType>) => ({
		type: SET_CARTOONS,
		cartoons
	}),
	setCurrentPage: (page: number) => ({
		type: SET_CURRENT_PAGE,
		page
	}),
	setPerPage: (perPage: number) => ({
		type: SET_PER_PAGE,
		perPage
	}),
	setLength: (length: number) => ({
		type: SET_LENGTH,
		length
	}),
	setCurrentMovie: (movie: MovieType) => ({
		type: SET_CURRENT_MOVIE,
		movie
	}),
	setSearchTerm: (searchTerm: string) => ({
		type: SET_SEARCH_TERM,
		searchTerm
	}),
	setAllMovies: (movies: MoviesAllType) => ({
		type: SET_ALL_MOVIES,
		movies
	}),
	setSimilarMovies: (movies: MoviesAllType) => ({
		type: SET_SIMILAR_MOVIES,
		movies
	}),
	setReviewText: (reviewText: string) => ({
		type: SET_TEXT_REVIEW,
		reviewText
	}),
	setSort: (sort: string) => ({
		type: SET_SORT,
		sort
	}),
	setSortUserMovies: (sortUserMovies: string) => ({
		type: SET_SORT_USER_MOVIES,
		sortUserMovies
	}),
	setType: (typeMovie: string) => ({
		type: SET_TYPE_MOVIE,
		typeMovie
	}),
	delCurrentMovie: () => ({
		type: DEL_CURRENT_MOVIE
	})
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getMoviesWithType = (page: number, perPage: number, type: string, sort: string = ''): ThunkType =>
	async (dispatch) => {
			dispatch(actions.setCurrentPage(page))
			dispatch(actions.setPerPage(perPage))
			dispatch(actions.setSortUserMovies(sort))
			const data = await moviesAPI.getMovies(page, perPage, type, '', sort)
			if(type === 'film') {
				dispatch(actions.setFilms(data.movies))
			}
			else if(type === 'serial') {
				dispatch(actions.setSerials(data.movies))
			}
			else if(type === 'cartoon') {
				dispatch(actions.setCartoons(data.movies))
			}
			dispatch(actions.setLength(data.length))
}

export const getMovieById = (id: number): ThunkType => async (dispatch) => {
		const data = await moviesAPI.getMovieById(id)
		if(data) {
			dispatch(actions.setCurrentMovie(data))
		}
}

export const searchMovies = (page: number, perPage: number,searchText: string, sort: string = ''): ThunkType => async (dispatch) => {
		const data = await moviesAPI.getMovies(page, perPage, '', searchText, sort)
		if(data) {
			dispatch(actions.setCurrentPage(page))
			dispatch(actions.setPerPage(page))
			dispatch(actions.setSearchTerm(searchText))
			dispatch(actions.setSort(sort))
			dispatch(actions.setAllMovies(data.movies))
			dispatch(actions.setLength(data.length))
		}
}
export const searchMoviesWithType = (page: number, perPage: number, searchText: string = '', type: string, sort: string = ''): ThunkType => async (dispatch) => {
	const data = await moviesAPI.getMovies(page, perPage, type, searchText, sort)
	if(data) {
		dispatch(actions.setCurrentPage(page))
		dispatch(actions.setPerPage(page))
		dispatch(actions.setSearchTerm(searchText))
		dispatch(actions.setSort(sort))
		dispatch(actions.setType(type))
		dispatch(actions.setAllMovies(data.movies))
		dispatch(actions.setLength(data.length))
	}
}

export const getSimilarMovies = (id: number, page: number, perPage: number): ThunkType => async (dispatch) => {
	const data = await moviesAPI.getSimilar(id, page, perPage)
	if(data) {
		dispatch(actions.setSimilarMovies(data.movies))
	}
}

export const leaveReview = (movieId: number, reviewText: string): ThunkType => async (dispatch) => {
	const data = await moviesAPI.leaveReview(movieId, reviewText)
	if(data) {
		dispatch(actions.setReviewText(''))
		const movie = await moviesAPI.getMovieById(movieId)
		if(movie) {
			dispatch(actions.setCurrentMovie(movie))
		}
	}
}

export const cancelUpdateMovie = () =>  (dispatch: AppDispatch) => {
	dispatch(actions.delCurrentMovie())
}

export const createMovie = (values: ValuesMovieType): ThunkType => async (dispatch) => {
	const data = await moviesAPI.createMovie(values)
	if (data) {
		const updatedMovies = await moviesAPI.getMovies(1, 20, '', '', '');
		if (updatedMovies) {
			dispatch(actions.setAllMovies(updatedMovies.movies));
			dispatch(actions.setLength(updatedMovies.length));
			dispatch(actions.setCurrentPage(1))
			dispatch(actions.setPerPage(20))
		}
	}
}

export const updateMovie = (values: ValuesMovieType, movieId: number): ThunkType => async (dispatch) => {
	const data = await moviesAPI.updateMovie(values, movieId)
	if (data) {
		const updatedMovies = await moviesAPI.getMovies(1, 20, '', '', '');
		if (updatedMovies) {
			dispatch(actions.setAllMovies(updatedMovies.movies));
			dispatch(actions.setLength(updatedMovies.length));
			dispatch(actions.setCurrentPage(1))
			dispatch(actions.setPerPage(20))
		}
	}
}

export const deleteMovie = (movieId: number): ThunkType => async (dispatch) => {
	const data = await moviesAPI.deleteMovie(movieId)
	if (data) {
		const updatedMovies = await moviesAPI.getMovies(1, 20, '', '', '');
		if (updatedMovies) {
			dispatch(actions.setAllMovies(updatedMovies.movies));
			dispatch(actions.setLength(updatedMovies.length));
			dispatch(actions.setCurrentPage(1))
			dispatch(actions.setPerPage(20))
		}
	}
}

export default MoviesReducer