import { Box, Button, Flex, Image } from '@chakra-ui/react'
import Header from '../components/Header/Header.tsx'
import CalendarIcon from './../assets/CalendarIcon.png'
import DataIcon from './../assets/DataIcon.png'
import RatingIcon from './../assets/RatingIcom.png'
import RedRatingIcon from './../assets/RedRatingIcom.png'
import YellowRatingIcon from './../assets/YellowRatingIcom.png'
import GreenRatingIcon from './../assets/GreenRatingIcom.png'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMovieById, getSimilarMovies } from '../redux/movies/movies.reducer.ts'
import { AppStateType, useAppDispatch } from '../redux/store.ts'
import { useSelector } from 'react-redux'
import plus from './../assets/plus.png'
import minus from './../assets/minus.png'
import { getProfile, toggleFavorite } from '../redux/user/user.reducer.ts'
import CardItem from '../components/CardItem/CardItem.tsx'
import MovieInputReview from '../components/Reviews/MovieInputReview.tsx'
import MovieAllReviews from '../components/Reviews/MovieAllReviews.tsx'

const MoviePage = () => {
	const { id } = useParams()
	const dispatch = useAppDispatch()
	const movie = useSelector((state: AppStateType) => state.movies.currentMovie)
	const profile = useSelector((state: AppStateType) => state.user.profile)
	const user = useSelector((state:AppStateType) => state.auth.user)
	const movieParseId = parseInt(id, 10)
	const similar = useSelector((state: AppStateType) => state.movies.similarMovies)

	useEffect(() => {
		if (id) {
			dispatch(getMovieById(movieParseId))
			dispatch(getSimilarMovies(movieParseId, 1, 8))

		}
	}, [id])

	useEffect(() => {
		dispatch(getProfile())
	}, [user])
	const isExists = profile?.favorites?.some(
		favorite => favorite?.movie?.movieId === movieParseId
	)

	const getRatingIcon = (rating: number) => {
		if (rating <= 5) {
			return RedRatingIcon;
		} else if (rating <= 8) {
			return YellowRatingIcon;
		} else {
			return GreenRatingIcon;
		}
	};

	const toggleFavoriteMovie =  async () => {
		await dispatch(toggleFavorite(movieParseId))
		dispatch(getProfile())
	}

	return (
		<Box>
			<Header />
			<Flex justify="center">
				<Flex paddingTop="62px" direction="column" gap="60px" paddingBottom="204px">
					<Box position="relative" overflow="hidden">
						<iframe width="1132" height="712"
										src={`${movie?.trailer}?autoplay=1`}
										allowFullScreen title="Dailymotion Video Player"
										style={{ border: '0', boxShadow: '0' }}></iframe>
					</Box>
					<Flex gap="56px" direction="column">
						<Flex gap="32px">
							<Image src={movie?.imagePath} alt="MovieImg" w="352px" h="576px" />
							<Box>
								<Flex justify="space-between" align="center">
									<Box fontSize="34px" fontWeight="600" maxWidth="480px"
											 whiteSpace="nowrap"
											 overflow="hidden"
											 textOverflow="ellipsis">{movie?.name}</Box>
									{user &&
									<Box>
									{isExists ?
										<Button leftIcon={<Image w="10px" src={minus} />} onClick={toggleFavoriteMovie} w="190px" h="56px"
														bg="#808080" color="#FFF" borderRadius="15px" _hover={{ bg: '#545454' }}>Remove to
											Favorite</Button> :
										<Button leftIcon={<Image src={plus} />} onClick={toggleFavoriteMovie} w="190px" h="56px"
														bg="#FF0000" color="#FFF" borderRadius="15px" _hover={{ bg: '#800000' }}>Add to
											Favorite</Button>}
									</Box>
									}
								</Flex>
								{movie?.duration ?
									<Flex gap="8px" align="center">
										<Flex gap="10px" p="10px 10px 10px 0px" align="center">
											<Image src={CalendarIcon} alt="CalendarIcon" />
											<Box fontSize="16px" fontWeight="600" w="45px" h="24px"
													 alignItems="center">{movie?.year}</Box>
										</Flex>
										<Flex gap="10px" p="10px" align="center">
											<Image src={DataIcon} alt="CalendarIcon" w="13.3px" h="13.3px" />
											<Box fontSize="16px" fontWeight="600">{movie?.duration} хвилин</Box>
										</Flex>
										<Flex gap="10px" p="10px" align="center">
											<Image src={getRatingIcon(movie?.rating || 0)} alt="CalendarIcon" w="17px" h="16px" />
											<Box fontSize="16px" fontWeight="600">{movie?.rating}</Box>
										</Flex>
									</Flex> :
									<Flex gap="8px" align="center">
										<Flex gap="10px" p="10px 10px 10px 0px" align="center">
											<Image src={CalendarIcon} alt="CalendarIcon" />
											<Box fontSize="16px" fontWeight="600" w="45px" h="24px"
													 alignItems="center">{movie?.year}</Box>
										</Flex>
										<Flex gap="10px" p="10px" align="center">
											<Image src={RatingIcon} alt="CalendarIcon" w="17px" h="16px" />
											<Box fontSize="16px" fontWeight="600">{movie?.rating}</Box>
										</Flex>
									</Flex>
								}
								<Box maxWidth="708px" fontSize="16px" paddingTop="24px" fontWeight="400"
										 textAlign="justify">{movie?.description}</Box>
								<Flex paddingTop="44px" direction="column" gap="12px">
									<Flex gap="10px"><Box>Країна</Box><Box>:</Box><Box>{movie?.country}</Box></Flex>
									<Flex gap="10px">
										<Box>Жанр</Box>
										<Box>:</Box>
										<Box>
											{movie?.genres?.map((g, index) => (
												<span key={g.genre.id}>
        {g.genre.name}{index < movie.genres.length - 1 && ', '}
      </span>
											))}
										</Box>
									</Flex>
									<Flex gap="10px"><Box>Дата релізу</Box><Box>:</Box><Box>{movie?.releaseDate}</Box></Flex>
									<Flex gap="10px" align="center">
										<Box>Акторський склад</Box>
										<Box>:</Box>
										<Box maxWidth="400px">
											{movie?.cast?.map((c, index) => (
												<span key={c.actor.id}>
        {c.actor.name}{index < movie.cast.length - 1 && ', '}
      </span>
											))}
										</Box>
									</Flex>
								</Flex>
							</Box>
						</Flex>
						<Flex direction="column" gap="84px">
							{similar.length > 0 && (
								<Flex direction="column" gap="40px">
									<Box fontSize="24px" fontWeight="600">Вам також може сподобатися</Box>
									<Flex justify="center">
										<Flex w="1120px" direction="column" gap="24px">
											<Flex direction="column" gap="32px">
												<Flex wrap="wrap" gap="32px">
													{similar.map((s) => <CardItem key={s.id} movies={s} />)}
												</Flex>
											</Flex>
										</Flex>
									</Flex>
								</Flex>
							)}

							<Flex direction="column" gap="48px">
								{user &&
									<MovieInputReview profile={profile} movieId={movieParseId} />
								}
								<MovieAllReviews />
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	)
}

export default MoviePage