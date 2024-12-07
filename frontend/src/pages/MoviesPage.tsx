import Header from '../components/Header/Header.tsx'
import { useSelector } from 'react-redux'
import { AppStateType } from '../redux/store.ts'
import { Box, Flex } from '@chakra-ui/react'
import CardItem from '../components/CardItem/CardItem.tsx'
import PaginationSearchTerm from '../components/Pagination/PaginationSearchTerm.tsx'

const MoviesPage = () => {
	const allMovies = useSelector((state: AppStateType) => state.movies.allMovies)
	const searchTerm = useSelector((state: AppStateType) => state.movies.searchTerm)

	return (
		<Flex direction='column' paddingBottom="200px" gap='60px'>
		<Flex direction="column" gap="50px">
			<Header />
			<Flex justify="center">
				<Flex w="1120px" direction="column" gap="24px">
					<Box fontSize="24px" fontWeight="700">{`Результат за пошуком '${searchTerm}': `}</Box>
					<Flex direction="column" gap="32px">
						<Flex wrap="wrap" gap='32px'>
							{allMovies.map((f) => <CardItem key={f.movieId} movies={f} /> )}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
			<PaginationSearchTerm searchTerm={searchTerm} />
		</Flex>
		)
}
export default MoviesPage