import { Box, Flex } from '@chakra-ui/react'
import Header from "../components/Header/Header.tsx";
import Films from "../components/Movies/Films.tsx";
import Series from "../components/Movies/Serials.tsx";
import Cartoons from '../components/Movies/Cartoons.tsx'

const HomePage: React.FC = () => {
    return (

        <Box>
            <Header/>
            <Flex justify='center' >
                <Flex direction='column'>
                    <Films/>
                    <Series />
                    <Cartoons />
                </Flex>
            </Flex>
        </Box>
    )
}

export default HomePage