import { Box, Button, Flex, Image, Td, Th, Tr, useToast } from '@chakra-ui/react'
import { MoviesAllType } from '../../../types/movie.type.ts'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../../redux/store.ts'
import { deleteMovie } from '../../../redux/movies/movies.reducer.ts'

type PropsType = {
	movies: MoviesAllType
}
const AdminTableElement = ({movies}: PropsType) => {
	const dispatch = useAppDispatch()
	const toast = useToast();

	const handleClick = async () => {
		try {
		await dispatch(deleteMovie(movies.movieId)) } catch (error) {
				if (error.message === 'Доступ заборонено. Ви не маєте прав для видалення цього медіа.') {
					toast({
						title: "Помилка",
						description: "Доступ заборонено. Ви не маєте прав для видалення цього медіа.",
						status: "error",
						isClosable: true,
					});
				}
			}
	}

	return (
		<Tr>
			<Td>{movies.movieId}</Td>
			<Td><Image w='60px' h='80px' src={movies.imagePath} /></Td>
			<Td>{movies.name}</Td>
			<Td textAlign="center" alignItems="center" m="0 auto" ><Box bg="#FF0000" w="32px" h="32px" borderRadius="5px" p="4px">{movies.clarity}</Box></Td>
			<Td  textAlign="center">{movies.duration? movies.duration : '-'}</Td>
			<Th><Flex gap='15px'>
				<a href={'/movies/' + movies.movieId} target="_blank" rel="noopener noreferrer"><Button bg="#CA8A04" color="#FFF" _hover={{ bg: '#A16207' }}>Відкрити</Button></a>
				<NavLink to={'/admin/movies/' + movies.movieId}><Button bg='#1E40AF' color='#FFF' _hover={{ bg: '#1E3A8A' }}>Редагувати</Button></NavLink>
				<Button bg='#9F1239' color='#FFF'_hover={{ bg: '#881337' }} onClick={handleClick}>Видалити</Button>
			</Flex></Th>
		</Tr>
	)
}

export default AdminTableElement