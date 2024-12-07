import { Box, Flex, useColorMode } from '@chakra-ui/react'
import HeaderInput from "./HeaderInput.tsx";
import HeaderLinks from "./HeaderLinks.tsx";
import {NavLink} from "react-router-dom";
import HeaderSign from './HeaderSign/HeaderSign.tsx'
import s from './Header.module.css'
const Header = ()  => {
  return  (
      <Flex gap='29px' paddingTop='24px' align='center' justifyContent='center' >
        <Flex gap='24px' align='center'>
            <NavLink to='/' className={NavData => NavData.isActive? s.active : ''}><Box fontWeight='600' fontSize='16px'>Головна</Box></NavLink>
           <HeaderInput />
            <HeaderLinks />
        </Flex>
        <HeaderSign />
      </Flex>
    )
}

export default Header