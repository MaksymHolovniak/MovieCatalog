import { Box, Flex } from '@chakra-ui/react'
import Header from '../components/Header/Header.tsx'
import Films from '../components/Movies/Films.tsx'
import Serials from '../components/Movies/Serials.tsx'
import Cartoons from '../components/Movies/Cartoons.tsx'
import AdminTable from '../components/Admin/AdminTable/AdminTable.tsx'
import AdminHeader from '../components/Admin/AdminHeader/AdminHeader.tsx'
import PaginationAdmin from '../components/Pagination/PaginationAdmin.tsx'

const AdminPage = () => {
	return (
			<Box>
				<AdminHeader />
				<Flex justify='center' >
					<Flex direction='column'marginTop='50px' marginBottom='100px'>
						<AdminTable />
						<PaginationAdmin />
					</Flex>
				</Flex>
			</Box>
	)
}

export default AdminPage