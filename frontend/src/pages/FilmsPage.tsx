import FilmsPageItem from '../components/MoviesPageItem/FilmsPageItem.tsx'
import Header from '../components/Header/Header.tsx'
import { Box, Flex } from '@chakra-ui/react'
import { Pagination } from 'antd'



const FilmsPage = () => {
    return (
      <Flex direction="column" gap="50px">
          <Header />
      <FilmsPageItem />
      </Flex>
)
}

export default FilmsPage