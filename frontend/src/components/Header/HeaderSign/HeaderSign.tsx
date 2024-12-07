import {
	Box,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,

	ModalOverlay, useDisclosure, useToast
} from '@chakra-ui/react'
import { useState, useEffect  } from 'react'
import SignOneModal from './SignOneModal.tsx'
import SignTwoModal from './SignTwoModal.tsx'
import { AppStateType, useAppDispatch } from '../../../redux/store.ts'
import { login, registration } from '../../../redux/auth/auth.reducer.ts'
import { useSelector } from 'react-redux'
import { ValuesLoginType, ValuesRegistrationType } from '../../../types/user.type.ts'
import HeaderUser from './HeaderUser.tsx'
import { NavLink, useNavigate } from 'react-router-dom'

const HeaderSign = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [oneModal, changeModal] = useState<boolean>(true)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const user = useSelector((state: AppStateType) => state.auth.user)
	const toast = useToast();

	const onSubmitRegistration =  async (values: ValuesRegistrationType) => {
		try {
			await dispatch(registration(values.email, values.password, values.name))
		} catch (error) {
			if (error.message === 'Ця електронна пошта вже використовується. Спробуйте іншу або увійдіть.') {
				toast({
					title: "Помилка",
					description: "Ця електронна пошта вже використовується. Спробуйте іншу або увійдіть.",
					status: "error",
					isClosable: true,
				});
			}
			if (error.message === 'Цей нікнейм вже зайнятий. Спробуйте інший.') {
				toast({
					title: "Помилка",
					description: "Цей нікнейм вже зайнятий. Спробуйте інший.",
					status: "error",
					isClosable: true,
				});
			}
		}
	}

	const onSubmitLogin = async (values: ValuesLoginType) => {
		try {
			await dispatch(login(values.email, values.password))
		} catch (error) {
			if (error.message === 'Неправильні дані для входу. Спробуйте ще раз.') {
				toast({
					title: "Помилка",
					description: "Неправильні дані для входу. Спробуйте ще раз.",
					status: "error",
					isClosable: true,
				});
			}
		}
	}

	useEffect(() => {
		if (user) {
			onClose()
		}
	}, [user, onClose])
	const activateTwoModal = () => {
		changeModal(false)
	}

	const activateOneModal = () => {
		changeModal(true)
	}

	return (
		<>
		{user?
			<HeaderUser user={user} />
			:
			<Box>
			<Box onClick={onOpen} fontWeight="600" fontSize="16px">Вхід/Реєстрація</Box>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent  bg="#17181E" >
					<ModalCloseButton />
					<ModalBody p="80px 72px 80px 72px">
						{oneModal?
								<SignOneModal activateTwoModal={activateTwoModal} onSubmit={onSubmitLogin}  />
							:
							<SignTwoModal  activateOneModal={activateOneModal} onSubmit={onSubmitRegistration} />
						}
					</ModalBody>
				</ModalContent>
			</Modal>
			</Box>
				}
		</>

	)
}

export default HeaderSign