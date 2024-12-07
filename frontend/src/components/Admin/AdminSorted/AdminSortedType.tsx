import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from '../../../redux/store.ts'
import { searchMoviesWithType } from '../../../redux/movies/movies.reducer.ts'


const AdminSortedType = () => {
	const dispatch = useAppDispatch()
	const [isOpenSort, changeOpenSort] = useState(false);
	const [selectedOptionSort, setSelectedOptionSort] = useState<string>('');
	const searchTerm = useSelector((state:AppStateType) => state.movies.searchTerm)
	const sort = useSelector((state: AppStateType) => state.movies.sort)
	const handleSelectedOptionSort = (value: string) => {
		dispatch(searchMoviesWithType(1, 20, searchTerm, value, sort))
		changeOpenSort(!isOpenSort)
		setSelectedOptionSort(value)
	}

	const getButtonText = () => {
		switch (selectedOptionSort) {
			case 'film':
				return 'Фільми';
			case 'serial':
				return 'Серіали';
			case 'cartoon':
				return 'Мультфільми';
			default:
				return 'Всі';
		}
	};

	return (
		<Menu isOpen={isOpenSort}>
			<MenuButton as={Button} w='240px' h='37px' border='1px solid #515151' borderRadius='8px' bg='#000'
									fontWeight='400' _hover={{bg: '#000'}} _focus={{bg: '#000'}} _active={{bg: '#000'}}
									color='#FFF' fontSize='16px' transition='none'
									p='8px 18px 8px 21px' gap='40px' textAlign='left'
									onClick={() => changeOpenSort(!isOpenSort)}
			>
				{getButtonText()}
			</MenuButton>
			<MenuList transition='none' marginTop='-8px' minW='unset' w='240px' h='100%' p='0' border='unset'
								borderRadius='8px' color="#FFF" bg='#000'
								shadow='unset' boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.15)'>
				<MenuItem w='240px' bg='#000' p='8px 18px 8px 21px' borderRadius='8px' _hover={{bg: "#808080", color: "#FFF"}}
									onClick={() => {
										handleSelectedOptionSort('')
									}}
									style={{
										color: selectedOptionSort === "" ? "#FF0000" : "#FFF", fontWeight: selectedOptionSort === "" ? "700" : "400"}}>Всі</MenuItem>
				<MenuItem w='240px' bg='#000' p='8px 18px 8px 21px' borderRadius='8px' _hover={{bg: "#808080", color: "#FFF"}}
									onClick={() => {
										handleSelectedOptionSort('film')
									}}
									style={{
										color: selectedOptionSort === "film" ? "#FF0000" : "#FFF", fontWeight: selectedOptionSort === "film" ? "700" : "400"}}>Фільми</MenuItem>

				<MenuItem w='240px' bg='#000' p='8px 18px 8px 21px' borderRadius='8px' _hover={{bg: "#808080", color: "#FFF"}}
									onClick={() => {
										handleSelectedOptionSort('serial')
									}}
									style={{
										color: selectedOptionSort === "serial" ? "#FF0000" : "#FFF", fontWeight: selectedOptionSort === "serial" ? "700" : "400"}}>Серіали</MenuItem>

				<MenuItem w='240px' bg='#000' p='8px 18px 8px 21px' borderRadius='8px' _hover={{bg: "#808080", color: "#FFF"}}
									onClick={() => {
										handleSelectedOptionSort('cartoon')
									}}
									style={{
										color: selectedOptionSort === "cartoon" ? "#FF0000" : "#FFF", fontWeight: selectedOptionSort === "cartoon" ? "700" : "400"}}>Мультфільми</MenuItem>
			</MenuList>
		</Menu>
	)
}

export default AdminSortedType