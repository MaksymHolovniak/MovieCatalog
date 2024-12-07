import { Box, Flex, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { UserType } from '../../../types/user.type.ts'
import { useState } from 'react'
import { useAppDispatch } from '../../../redux/store.ts'
import { logoutThunk } from '../../../redux/auth/auth.reducer.ts'
import { NavLink, useNavigate } from 'react-router-dom'


type PropsType = {
	user: UserType
}

const HeaderUser = (props: PropsType) => {
	const [isOpen, changeOpen] = useState(false);
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logout = () => {
		dispatch(logoutThunk())
		navigate('/')
	}
	const handleOpen = () => {
		changeOpen(true);
	};

	const handleClose = () => {
		changeOpen(false);
	};

	return (
		<Menu isOpen={isOpen} alignText='center'>
		<MenuButton onMouseEnter={handleOpen} onMouseLeave={handleClose}><Flex gap='10px' alignItems='center' >
			<Image src={props.user.avatarPath} w='30px' h='30px' borderRadius='90px' />
			<Box fontWeight="600" fontSize="16px">{props.user.name}</Box>
		</Flex>
		</MenuButton>
			<MenuList  bg='#121212' border='none' marginTop='-5px' onMouseLeave={handleClose} onMouseEnter={handleOpen}>
				{props.user.role==='admin' && <NavLink to='/admin'><MenuItem alignText='center' bg='#121212' border='none' color='FFF' _hover={{fontWeight: 600}}>Адмін-панель</MenuItem></NavLink>}
				<NavLink to='/favorites'><MenuItem   alignText='center' bg='#121212' border='none' color='FFF' _hover={{fontWeight: 600}}>Улюблені медіа</MenuItem></NavLink>
				<MenuItem  alignText='center' bg='#121212' border='none' color='#FFF' _hover={{fontWeight: 600}} onClick={logout}>Вийти з акаунту</MenuItem>
			</MenuList>
		</Menu>
	)
}

export default HeaderUser