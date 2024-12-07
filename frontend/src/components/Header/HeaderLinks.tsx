import {Flex} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import s from './Header.module.css'

const HeaderLinks = () => {
    return (
        <Flex gap='16px' align='center' fontWeight='600'>
            <NavLink to='/films' className={NavData => NavData.isActive? s.active : ''}>Фільми</NavLink>
            <NavLink to='/serials' className={NavData => NavData.isActive? s.active : ''}>Серіали</NavLink>
            <NavLink to='/cartoons' className={NavData => NavData.isActive? s.active : ''}>Мультфільми</NavLink>
        </Flex>
    )
}

export default HeaderLinks