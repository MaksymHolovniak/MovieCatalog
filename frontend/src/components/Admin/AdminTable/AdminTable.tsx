import {
	Box,
	Button,
	Flex,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td, Text,
	Tfoot,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from '../../../redux/store.ts'
import { searchMovies, searchMoviesWithType } from '../../../redux/movies/movies.reducer.ts'
import AdminTableElement from './AdminTableElement.tsx'
import { NavLink } from 'react-router-dom'
import Sorted from '../../SorterElements/Sorted.tsx'
import AdminSortedType from '../AdminSorted/AdminSortedType.tsx'
import AdminSortedCategory from '../AdminSorted/AdminSortedCategory.tsx'

const AdminTable = () => {
	const dispatch = useAppDispatch()
	const movies = useSelector((state: AppStateType) => state.movies.allMovies)
	const searchTerm = useSelector((state: AppStateType) => state.movies.searchTerm);
	const type = useSelector((state: AppStateType) => state.movies.typeMovie)
	const sort = useSelector((state: AppStateType) => state.movies.sort)

	useEffect(() => {
		if (movies.length === 0) {
			dispatch(searchMoviesWithType(1, 20, searchTerm, type, sort));
		}
	}, [dispatch, movies.length, searchTerm, type, sort]);

	return (
		<Box display='flex' flexDirection='column' rowGap='30px'>
			<Flex alignItems='center' justify='space-between'>
			<Text fontSize='20px' fontWeight='600'>Список медіа</Text>
				<AdminSortedCategory />
				<AdminSortedType />
				<NavLink to='/admin/movie'><Button marginLeft='auto' w='122px' h='40px' bg='#166534' color='#FFF' _hover={{ bg: '#14532D' }}>Створити</Button></NavLink>
			</Flex>
		<TableContainer>
			<Table variant='simple'>
				<TableCaption>Медіа веб-додатку MovieCatalog</TableCaption>
				<Thead>
					<Tr>
						<Th>ID</Th>
						<Th textAlign="center">Image</Th>
						<Th>Name</Th>
						<Th>Clarity</Th>
						<Th isNumeric>Duration</Th>
						<Th textAlign="center">Functions</Th>
					</Tr>
				</Thead>
				<Tbody>
					{movies.map((m) => <AdminTableElement key={m.movieId} movies={m} />)}
				</Tbody>
			</Table>
		</TableContainer>
		</Box>
	)
}

export default AdminTable