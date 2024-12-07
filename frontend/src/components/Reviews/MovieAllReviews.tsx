import { Box, Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store.ts'
import CardItem from '../CardItem/CardItem.tsx'
import MovieReview from './MovieReview.tsx'

const MovieAllReviews = () => {

	const reviews = useSelector((state: AppStateType) => state.movies.currentMovie?.reviews)

	return (
		<Flex direction='column' gap='48px'>
			{reviews?.map((r) => <MovieReview key={r.reviewId} review={r} /> )}
		</Flex>
	)
}

export default MovieAllReviews