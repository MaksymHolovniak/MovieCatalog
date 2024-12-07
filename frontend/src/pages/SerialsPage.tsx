import FilmsPageItem from '../components/MoviesPageItem/FilmsPageItem.tsx'
import Header from '../components/Header/Header.tsx'
import SeriesPageItem from '../components/MoviesPageItem/SerialsPageItem.tsx'
import { Flex } from '@chakra-ui/react'



const SerialsPage = () => {
	return (
		<Flex direction="column" gap="50px">
			<Header />
			<SeriesPageItem />
		</Flex>
	)
}

export default SerialsPage