import Header from '../components/Header/Header.tsx'
import CartoonsPageItem from '../components/MoviesPageItem/CartoonsPageItem.tsx'
import { Flex } from '@chakra-ui/react'



const CartoonsPage = () => {
	return (
		<Flex direction="column" gap="50px">
			<Header />
			<CartoonsPageItem />
		</Flex>
	)
}

export default CartoonsPage