import { Box, Button, Flex, Image } from '@chakra-ui/react'
import Header from '../../Header/Header.tsx'
import minus from '../../../assets/minus.png'
import plus from '../../../assets/plus.png'
import CalendarIcon from '../../../assets/CalendarIcon.png'
import DataIcon from '../../../assets/DataIcon.png'
import RatingIcon from '../../../assets/RatingIcom.png'
import CardItem from '../../CardItem/CardItem.tsx'
import MovieInputReview from '../../Reviews/MovieInputReview.tsx'
import MovieAllReviews from '../../Reviews/MovieAllReviews.tsx'
import { MovieType } from '../../../types/movie.type.ts'
type PropsType = {
	movie: MovieType | null
}
const AdminCreateMovieInf = ({movie} : PropsType) => {
	return (
		<Box>
			<Flex paddingTop="62px" direction="column" gap="60px">
				<Flex gap="56px" direction="column">
					<Flex gap="32px">
						{movie?.imagePath && <Image src={movie?.imagePath} alt="MovieImg" w="352px" h="576px" /> }
						<Box>
							{movie?.name &&
							<Flex justify="space-between" align="center">
								<Box fontSize="34px" fontWeight="600" maxWidth="480px"
										 whiteSpace="nowrap"
										 overflow="hidden"
										 textOverflow="ellipsis">{movie?.name}</Box>
							</Flex>
							}
								<Flex gap="8px" align="center">
									{movie?.year &&
									<Flex gap="10px" p="10px 10px 10px 0px" align="center">
										<Image src={CalendarIcon} alt="CalendarIcon" />
										<Box fontSize="16px" fontWeight="600" w="45px" h="24px"
												 alignItems="center">{movie?.year}</Box>
									</Flex>
									}
									{movie?.duration &&
									<Flex gap="10px" p="10px" align="center">
										<Image src={DataIcon} alt="CalendarIcon" w="13.3px" h="13.3px" />
										<Box fontSize="16px" fontWeight="600">{movie?.duration} хвилин</Box>
									</Flex>
									}
									{movie?.rating &&
									<Flex gap="10px" p="10px" align="center">
										<Image src={RatingIcon} alt="CalendarIcon" w="17px" h="16px" />
										<Box fontSize="16px" fontWeight="600">{movie?.rating}</Box>
									</Flex>
									}
								</Flex>
							{movie?.description &&	<Box maxWidth="708px" fontSize="16px" paddingTop="24px" fontWeight="400"
									 textAlign="justify">{movie?.description}</Box> }
							<Flex paddingTop="44px" direction="column" gap="12px">
								{movie?.country && <Flex gap="10px"><Box>Країна</Box><Box>:</Box><Box>{movie?.country}</Box></Flex> }
								{movie?.genres && <Flex gap="10px">
									<Box>Жанр</Box>
									<Box>:</Box>
									<Box>
										{movie?.genres}
									</Box>
								</Flex>}
								{movie?.releaseDate && <Flex gap="10px"><Box>Дата релізу</Box><Box>:</Box><Box>{movie?.releaseDate}</Box></Flex> }
								{movie?.cast &&	<Flex gap="10px" align="center">
									<Box>Акторський склад</Box>
									<Box>:</Box>
									<Box maxWidth="400px">
										{movie?.cast}
									</Box>
								</Flex> }
							</Flex>
						</Box>
					</Flex>
				</Flex>
				{movie?.trailer && <Box position="relative" overflow="hidden">
					<iframe width="1132" height="712"
									src={`${movie?.trailer}?autoplay=1`}
									allowFullScreen title="Dailymotion Video Player"
									style={{ border: '0', boxShadow: '0' }}></iframe>
				</Box> }
			</Flex>
		</Box>
	)
}

export default AdminCreateMovieInf