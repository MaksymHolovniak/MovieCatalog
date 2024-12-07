import { Box, Flex, useColorMode } from '@chakra-ui/react'
import {NavLink} from "react-router-dom";
import s from './../../Header/Header.module.css'
import AdminHeaderInput from './AdminHeaderInput.tsx'
import HeaderLinks from '../../Header/HeaderLinks.tsx'
import HeaderSign from '../../Header/HeaderSign/HeaderSign.tsx'
const AdminHeader = ()  => {
	return  (
		<Flex gap='29px' paddingTop='24px' align='center' justifyContent='center' >
			<Flex gap='24px' align='center'>
				<NavLink to='/' className={NavData => NavData.isActive? s.active : ''}><Box fontWeight='600' fontSize='16px'>Головна</Box></NavLink>
				<AdminHeaderInput />
				<HeaderLinks />
			</Flex>
			<HeaderSign />
		</Flex>
	)
}

export default AdminHeader