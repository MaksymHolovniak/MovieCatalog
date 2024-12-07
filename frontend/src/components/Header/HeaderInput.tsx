import { Image, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import SearchIcon from "../../assets/SearchIcon.png";
import { useNavigate } from 'react-router-dom'
import { AppStateType, useAppDispatch } from '../../redux/store.ts'
import { searchMovies } from '../../redux/movies/movies.reducer.ts'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const HeaderInput = ()  => {
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useSelector((state: AppStateType) => state.auth.user)
  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      dispatch(searchMovies(1,20,searchText, ''))
      navigate('/movies')
    }
  }

  const handleOnClick = () => {
    dispatch(searchMovies(1,30,searchText, ''))
    navigate('/movies')
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

export default HeaderInput