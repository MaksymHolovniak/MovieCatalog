import {Box, Flex, Image} from "@chakra-ui/react";
import CardItem from "../CardItem/CardItem.tsx";
import arrowRight from './../../assets/arrowRight.png'
import {NavLink} from "react-router-dom";
import { AppStateType, useAppDispatch } from '../../redux/store.ts'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getMoviesWithType } from '../../redux/movies/movies.reducer.ts'

const Movies = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMoviesWithType(1,4,'serial'))
  }, [])

  const serials = useSelector((state: AppStateType) => state.movies.serials)

    return (
        <Flex w='1120px' paddingTop='72px' direction='column' gap='24px'>
            <Flex justify='space-between' align='center'>
                <Box fontSize='24px' fontWeight='700'>Серіали</Box>
                <Flex gap='8px' fontSize='24px' fontWeight='600' color='#808080' align='center'>
                    <NavLink  to='/serials'><Box>Переглянути всі</Box></NavLink>
                    <Image src={arrowRight} w='22px' h='20px' alt='arrowRight'/>
                </Flex>

            </Flex>
          <Flex gap='32px'>
            {serials.map((s) => <CardItem key={s.movieId} movies={s} /> )}
          </Flex>
        </Flex>
    )
}

export default Movies