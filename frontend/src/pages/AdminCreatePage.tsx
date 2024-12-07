import Header from '../components/Header/Header.tsx'
import { Box, Flex } from '@chakra-ui/react'
import AdminEditMovie from '../components/Admin/AdminEditMovie/AdminEditMovie.tsx'
import AdminCreateMovie from '../components/Admin/AdminCreateMovie/AdminCreateMovie.tsx'
import AdminHeader from '../components/Admin/AdminHeader/AdminHeader.tsx'

const AdminCreatePage = () => {
	return (
		<Box>
			<AdminHeader />
			<Flex justify='center' >
				<Flex direction='column' marginTop='50px'>
					<AdminCreateMovie />
				</Flex>
			</Flex>
		</Box>
	)
}

export default AdminCreatePage