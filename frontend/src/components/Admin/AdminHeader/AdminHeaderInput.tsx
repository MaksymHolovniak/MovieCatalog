import { Image, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import SearchIcon from "./../../../assets/SearchIcon.png";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from '../../../redux/store.ts'
import { searchMovies, searchMoviesWithType } from '../../../redux/movies/movies.reducer.ts'
import { useNavigate } from 'react-router-dom'

const AdminHeaderInput = ()  => {
	const searchTerm = useSelector((state: AppStateType) => state.movies.searchTerm)
	const [searchText, setSearchText] = useState('')
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const type = useSelector((state: AppStateType) => state.movies.typeMovie)
	const sort = useSelector((state: AppStateType) => state.movies.sort)
	useEffect(() => {
		setSearchText(searchTerm);
	}, [searchTerm]);

	const handleKeyDown = (e) => {
		if(e.key === 'Enter') {
			dispatch(searchMoviesWithType(1, 20, searchText, type, sort))
			navigate('/admin')
		}
	}

	const handleOnClick = () => {
		dispatch(searchMoviesWithType(1, 20, searchText, type, sort))
		navigate('/admin')
	}

	const handleChange = (e) => {
		setSearchText(e.target.value)
	}

	return (
		<InputGroup w='416px' h='48px' alignItems='center' onKeyDown={handleKeyDown} >
			<Input value={searchText} onChange={handleChange} variant='unstyled' h='48px'  p='12px 25px 12px 24px' color='#000' bg='#FFF' borderRadius='25px'
						 placeholder='Пошук...' alignItems='center' />
			<InputRightElement alignItems='center' top='unset' w='50px'>
				<Image onClick={handleOnClick} src={SearchIcon} alt='SearchIcon'/>
			</InputRightElement>
		</InputGroup>
	)
}

export default AdminHeaderInput