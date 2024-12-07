import {Box, Flex, Image} from "@chakra-ui/react";
import CardItem from "../CardItem/CardItem.tsx";
import arrowRight from './../../assets/arrowRight.png'
import {NavLink} from "react-router-dom";
import { AppStateType, useAppDispatch } from '../../redux/store.ts'
import { useEffect } from 'react'
import { getMoviesWithType } from '../../redux/movies/movies.reducer.ts'
import { useSelector } from 'react-redux'

const Movies = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMoviesWithType(1,4,'cartoon'))
  }, [])

  const cartoons = useSelector((state: AppStateType) => state.movies.cartoons)

    return (
        <Flex w='1120px' paddingTop='72px' paddingBottom='258px' direction='column' gap='24px'>
            <Flex justify='space-between' align='center'>
                <Box fontSize='24px' fontWeight='700'>Мультфільми</Box>
                <Flex gap='8px' fontSize='24px' fontWeight='600' color='#808080' align='center'>
                    <NavLink to='/cartoons'><Box>Переглянути всі</Box></NavLink>
                    <Image src={arrowRight} w='22px' h='20px' alt='arrowRight'/>
                </Flex>

            </Flex>
          <Flex gap='32px'>
            {cartoons.map((c) => <CardItem key={c.movieId} movies={c} /> )}
          </Flex>
        </Flex>
    )
}

export default Movies