import { Box, Flex } from '@chakra-ui/react'
import Sorted from '../SorterElements/Sorted.tsx'
import { AppStateType, useAppDispatch } from '../../redux/store.ts'
import { useEffect } from 'react'
import { getMovies, getMoviesWithType } from '../../redux/movies/movies.reducer.ts'
import CardItem from '../CardItem/CardItem.tsx'
import { useSelector } from 'react-redux'
import Pagination from '../Pagination/Pagination.tsx'

const MoviesPageItem = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getMoviesWithType(1,20,'serial', 'newest'))
	}, [])

	const serials = useSelector((state: AppStateType) => state.movies.serials)
	return (
		<Flex direction='column' paddingBottom="200px" gap='60px'>
		<Flex justify="center">
			<Flex w="1120px" direction="column" gap="24px">
				<Box fontSize="24px" fontWeight="700">Серіали</Box>
				<Flex gap="10px">
					<Sorted type='serial' />
				</Flex>
				<Flex direction="column" gap="32px">
					<Flex wrap="wrap" gap='32px'>
						{serials.map((s) => <CardItem key={s.movieId} movies={s} /> )}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	<Pagination type='cartoon' />
</Flex>
	)
}

export default MoviesPageItem