import { Box, Flex } from '@chakra-ui/react'
import Header from '../components/Header/Header.tsx'
import Films from '../components/Movies/Films.tsx'
import Serials from '../components/Movies/Serials.tsx'
import Cartoons from '../components/Movies/Cartoons.tsx'
import AdminTable from '../components/Admin/AdminTable/AdminTable.tsx'
import AdminEditMovie from '../components/Admin/AdminEditMovie/AdminEditMovie.tsx'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getMovieById, getSimilarMovies } from '../redux/movies/movies.reducer.ts'
import { AppStateType, useAppDispatch } from '../redux/store.ts'
import { useSelector } from 'react-redux'
import AdminHeader from '../components/Admin/AdminHeader/AdminHeader.tsx'

const AdminEditPage = () => {

	return (
		<Box>
			<AdminHeader />
			<Flex justify='center' >
				<Flex direction='column' marginTop='50px'>
					<AdminEditMovie />
				</Flex>
			</Flex>
		</Box>
	)
}

export default AdminEditPage