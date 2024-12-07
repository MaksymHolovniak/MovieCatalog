import { Box, Flex, Image } from '@chakra-ui/react'
import DataIcon from './../../assets/DataIcon.png'
import { MoviesAllType } from '../../types/movie.type.ts'
import { NavLink } from 'react-router-dom'

type PropsType = {
	movies: MoviesAllType
}

const CardItem = (props: PropsType) => {


	return (
		<NavLink to={'/movies/'+ props.movies.movieId} >
		<Flex direction="column" gap="16px" w="256px" h="392px">
			<Image src={props.movies.imagePath} borderRadius="10px" w="256px" h="344px" alt="Movie Img" />

				{props.movies.duration?
					<Flex justify="space-between" align="center">
						<Box maxWidth="140px"
								 whiteSpace="nowrap"
								 overflow="hidden"
								 textOverflow="ellipsis">{props.movies.name}</Box>
				<Flex gap="8px" align="center">
					<Box bg="#FF0000" h="32px" borderRadius="5px" p="4px">{props.movies.clarity}</Box>
					<Flex align="center" gap='5px' border="1px solid #FF0000" borderRadius="5px" padding="4px">
						<Image src={DataIcon} alt="DataIcon" w="13.3px" h="13.3px" />
						<Box>{props.movies.duration} хв</Box>
					</Flex>
				</Flex>
					</Flex>
					:
					<Flex justify="space-between" align="center">
						<Box maxWidth="200px"
								 whiteSpace="nowrap"
								 overflow="hidden"
								 textOverflow="ellipsis">{props.movies.name}</Box>
					<Box bg="#FF0000" w="31px" h="32px" borderRadius="5px" p="4px">{props.movies.clarity}</Box>
					</Flex>
				}
		</Flex>
		</NavLink>
	)
}

export default CardItem