import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from '../../../redux/store.ts'
import { searchMovies, searchMoviesWithType } from '../../../redux/movies/movies.reducer.ts'


const AdminSortedCategory = () => {
	const dispatch = useAppDispatch()
	const [isOpenSort, changeOpenSort] = useState(false);
	const [selectedOptionSort, setSelectedOptionSort] = useState<string>('');
	const searchTerm = useSelector((state:AppStateType) => state.movies.searchTerm)
	const type = useSelector((state: AppStateType) => state.movies.typeMovie)
	const handleSelectedOptionSort = (value: string) => {
			dispatch(searchMoviesWithType(1, 20, searchTerm, type, value))
		changeOpenSort(!isOpenSort)
		setSelectedOptionSort(value)
	}

	const getButtonText = () => {
		switch (selectedOptionSort) {
			case 'newest': return 'Новіші медіа';
			case 'oldest': return 'Старіші медіа';
			case 'longer': return 'Довші медіа';
			case 'shorter': return 'Коротші медіа';
			default: return 'ID';
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
										color: selectedOptionSort === "" ? "#FF0000" : "#FFF",  fontWeight: selectedOptionSort === "" ? "700" : "400"}}>ID</MenuItem>
				<MenuItem w='240px' bg='#000' p='8px 18px 8px 21px' borderRadius='8px' _hover={{bg: "#808080", color: "#FFF"}}
									onClick={() => {
										handleSelectedOptionSort('newest')
									}}
									style={{
										color: selectedOptionSort === "newest" ? "#FF0000" : "#FFF",  fontWeight: selectedOptionSort === "newest" ? "700" : "400"}}>Новіші медіа</MenuItem>

				<MenuItem w='240px' bg='#000' p='8px 18px 8px 21px' borderRadius='8px' _hover={{bg: "#808080", color: "#FFF"}}
									onClick={() => {
										handleSelectedOptionSort('oldest')
									}}
									style={{
										color: selectedOptionSort === "oldest" ? "#FF0000" : "#FFF", fontWeight: selectedOptionSort === "oldest" ? "700" : "400"}}>Старіші медіа</MenuItem>

				<MenuItem w='240px' bg='#000' p='8px 18px 8px 21px' borderRadius='8px' _hover={{bg: "#808080", color: "#FFF"}}
									onClick={() => {
										handleSelectedOptionSort('longer')
									}}
									style={{
										color: selectedOptionSort === "longer" ? "#FF0000" : "#FFF", fontWeight: selectedOptionSort === "longer" ? "700" : "400"}}>Довші медіа</MenuItem>

				<MenuItem w='240px' bg='#000' p='8px 18px 8px 21px' borderRadius='8px' _hover={{bg: "#808080", color: "#FFF"}}
									onClick={() => {
										handleSelectedOptionSort('shorter')
									}}
									style={{
										color: selectedOptionSort === "shorter" ? "#FF0000" : "#FFF", fontWeight: selectedOptionSort === "shorter" ? "700" : "400"}}>Коротші медіа</MenuItem>
			</MenuList>
		</Menu>
	)
}

export default AdminSortedCategory