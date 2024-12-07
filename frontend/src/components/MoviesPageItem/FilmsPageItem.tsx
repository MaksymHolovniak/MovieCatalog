import { Box, Flex } from '@chakra-ui/react'
import Sorted from '../SorterElements/Sorted.tsx'
import { AppStateType, useAppDispatch } from '../../redux/store.ts'
import { useEffect } from 'react'
import { getMoviesWithType } from '../../redux/movies/movies.reducer.ts'
import CardItem from '../CardItem/CardItem.tsx'
import { useSelector } from 'react-redux'
import Pagination from '../Pagination/Pagination.tsx'


const MoviesPageItem = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getMoviesWithType(1, 20, 'film', 'newest'))
	}, [])

	const films = useSelector((state: AppStateType) => state.movies.films)
	return (
		<Flex direction='column' paddingBottom="200px" gap='60px'>
			<Flex justify="center">
				<Flex w="1120px" direction="column" gap="24px">
					<Box fontSize="24px" fontWeight="700">Фільми</Box>
					<Flex gap="10px">
						<Sorted type = 'film' />
					</Flex>
					<Flex direction="column" gap="32px">
						<Flex wrap="wrap" gap="32px">
							{films.map((f) => <CardItem key={f.movieId} movies={f} />)}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Pagination type='film' />
		</Flex>
	)
}

export default MoviesPageItem