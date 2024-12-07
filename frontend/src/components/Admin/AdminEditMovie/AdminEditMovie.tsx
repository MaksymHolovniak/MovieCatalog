import { Box, Button, Flex, FormControl, FormErrorMessage, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import * as yup from 'yup'
import { EnumMovieType } from '../../../types/movie.enum.ts'
import { AppStateType, useAppDispatch } from '../../../redux/store.ts'
import {
	cancelUpdateMovie,
	createMovie,
	getMovieById,
	getSimilarMovies,
	updateMovie
} from '../../../redux/movies/movies.reducer.ts'
import { Field, Form, Formik } from 'formik'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AdminEditMovieInf from './AdminEditMovieInf.tsx'
import { ValuesMovieType } from '../../../types/movie.type.ts'

const validationSchema = yup.object({
	name: yup.string().required('Обов\'язкове поле'),
	type: yup.mixed<EnumMovieType>()
		.oneOf(Object.values(EnumMovieType) as EnumMovieType[])
		.required('Обов\'язкове поле'),	imagePath: yup.string().url('Невірний формат URL').required('Обов\'язкове поле'),
	trailer: yup.string().url('Невірний формат URL').required('Обов\'язкове поле'),
	year: yup.number().required('Обов\'язкове поле'),
	duration: yup.number().optional(),
	rating: yup.number().required('Обов\'язкове поле'),
	description: yup.string().min(10, 'Опис має бути не менше 10 символів').max(700, 'Опис не має перевищувати 700 символів').required('Обов\'язкове поле'),
	country: yup.string().required('Обов\'язкове поле'),
	genres: yup
		.string()
		.required("Обов'язкове поле")
		.test("is-valid-array", "Має бути хоча б один жанр", (value) =>
			value ? value.split(",").map((g) => g.trim()).length > 0 : false
		),
	releaseDate: yup.string().required('Обов\'язкове поле').matches(/^\d{4}-\d{2}-\d{2}$/, 'Формат дати має бути YYYY-MM-DD'),
	cast: yup
		.string()
		.required("Обов'язкове поле")
		.test("is-valid-array", "Має бути хоча б один актор", (value) =>
			value ? value.split(",").map((actor) => actor.trim()).filter(Boolean).length > 0 : false
		),
	clarity: yup.string().required('Обов\'язкове поле')
})

const AdminEditMovie = () => {
	const { id } = useParams()
	const movieId = parseInt(id, 10)
	const dispatch= useAppDispatch()
	const navigate = useNavigate()
	const movie = useSelector((state: AppStateType) => state.movies.currentMovie)
	const toast = useToast();

	useEffect(() => {
		if (id) {
			dispatch(getMovieById(movieId))
		}
	}, [id])
	useEffect(() => {
		return () => {
			dispatch(cancelUpdateMovie());
		};
	}, [dispatch]);

	if (!movie) {
		return <Text>Завантаження...</Text>; // Або спінер
	}
	const onSubmitMovie = async (values: ValuesMovieType) => {
		const submitValues = {...values}
		submitValues.genres = values.genres.split(',').map(g => g.trim())
		submitValues.cast = values.cast.split(',').map(actor => actor.trim())
		submitValues.duration = values.duration === '' || values.duration === undefined ? null : Number(values.duration);

		try {
			await dispatch(updateMovie(submitValues, movieId));
			navigate('/admin');
		} catch (error) {
			if (error.message === 'Доступ заборонено. Ви не маєте прав для редагування цього медіа.') {
				toast({
					title: "Помилка",
					description: "Доступ заборонено. Ви не маєте прав для редагування цього медіа.",
					status: "error",
					isClosable: true,
				});
			}
		}
	}

	return (
		<Flex justify="center" paddingBottom='100px'>
			<Flex gap='100px'>
				<Formik
					enableReinitialize
					initialValues={{
						name: movie?.name,
						type: movie?.type,
						imagePath: movie?.imagePath,
						trailer: movie?.trailer,
						year: movie?.year,
						duration: movie?.duration,
						rating: movie?.rating,
						description: movie?.description,
						country: movie?.country,
						genres: movie?.genres
							? movie.genres.map((g) => g.genre.name).join(", ") // Перетворення масиву об'єктів у рядок
							: "",
						releaseDate: movie?.releaseDate,
						cast: movie?.cast
							? movie.cast.map((c) => c.actor.name).join(", ") // Перетворення масиву об'єктів у рядок
							: "",
						clarity: movie?.clarity
					}}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						actions.setSubmitting(false)
						onSubmitMovie(values)
					}}
				>
					{formik => (
						<Form>
							<Flex gap='100px'>
								<Flex direction="column" gap="20px" w='500px' alignItems='center'>
									<Text fontWeight='600'>Редагувати фільм</Text>
									<Field name="name">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.name && form.touched.name}>
												<Input {...field} placeholder="Назва" />
												<FormErrorMessage>{form.errors.name}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="type">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.type && form.touched.type}>
												<Input {...field} placeholder="Тип (film, serial, cartoon)" />
												<FormErrorMessage>{form.errors.type}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="imagePath">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.imagePath && form.touched.imagePath}>
												<Input {...field} placeholder="Шлях до зображення" />
												<FormErrorMessage>{form.errors.imagePath}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="trailer">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.trailer && form.touched.trailer}>
												<Input {...field} placeholder="Шлях до трейлера" />
												<FormErrorMessage>{form.errors.trailer}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="year">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.year && form.touched.year}>
												<Input {...field} type="number" placeholder="Рік" />
												<FormErrorMessage>{form.errors.year}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="duration">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.duration && form.touched.duration}>
												<Input {...field} type="number" placeholder="Тривалість (хвилини)" />
												<FormErrorMessage>{form.errors.duration}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="rating">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.rating && form.touched.rating}>
												<Input {...field} type="number" placeholder="Рейтинг" />
												<FormErrorMessage>{form.errors.rating}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="description">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.description && form.touched.description}>
												<Textarea {...field} placeholder="Опис" />
												<FormErrorMessage>{form.errors.description}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="country">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.country && form.touched.country}>
												<Input {...field} placeholder="Країна" />
												<FormErrorMessage>{form.errors.country}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="genres">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.genres && form.touched.genres}>
												<Input {...field} placeholder="Жанри (через кому)" />
												<FormErrorMessage>{form.errors.genres}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="releaseDate">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.releaseDate && form.touched.releaseDate}>
												<Input {...field} placeholder="Дата релізу (YYYY-MM-DD)" />
												<FormErrorMessage>{form.errors.releaseDate}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="cast">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.cast && form.touched.cast}>
												<Input {...field} placeholder="Акторський склад (через кому)" />
												<FormErrorMessage>{form.errors.cast}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="clarity">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.clarity && form.touched.clarity}>
												<Input {...field} placeholder="Якість" />
												<FormErrorMessage>{form.errors.clarity}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Flex columnGap='50px'>
										<NavLink to='/admin'><Button bg='#9F1239' color='#FFF'_hover={{ bg: '#881337' }}>Скасувати</Button></NavLink>
										<Button
											bg='#166534'
											_hover={{ bg: '#14532D' }}
											color="#FFF"
											type="submit"
											isLoading={formik.isSubmitting}
										>
											Зберегти
										</Button>
									</Flex>
								</Flex>
								<Box><AdminEditMovieInf movie={formik.values} /></Box>
							</Flex>
						</Form>
					)}
				</Formik>
			</Flex>
		</Flex>
	)
}


export default AdminEditMovie