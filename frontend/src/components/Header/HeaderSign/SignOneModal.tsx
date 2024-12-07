import { Box, Button, Flex, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { ValuesLoginType } from '../../../types/user.type.ts'


type PropsType = {
	activateTwoModal: () => void
	onSubmit: (values: ValuesLoginType) => void

}

const validationSchema = yup.object({
	email: yup.string().email('Невірний формат електронної пошти').required("Обов'язкове поле"),
	password: yup.string().min(6, 'Пароль має бути не менше 6 символів').required("Обов'язкове поле")
})
const SignOneModal = (props: PropsType) => {
	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={validationSchema}
			onSubmit={(values, actions) => {
				props.onSubmit(values)
				actions.setSubmitting(false)
			}}
		>
			{formik => (
				<Form>
					<Flex direction="column" gap="30px">
						<Flex direction="column" gap="55px">
							<Flex direction="column" gap="77px">
								<Box alignItems="center" textAlign="center" fontWeight="600" fontSize="20px">Вхід</Box>
								<Flex direction="column" gap="23px">
									<Field name="email">
										{({ field, form }) => (
											<FormControl isInvalid={form.errors.email && form.touched.email}>
												<Input _invalid={{border: '2px solid red'}} _focus={{border: 'none'}} {...field} id="email" placeholder="E-mail" borderRadius="18px" border="4px solid #30303D"
															 color="FFF" h="50px" w='300px' />
												<FormErrorMessage paddingLeft='6px'>{form.errors.email}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="password">
										{({ field, form }) => (
											<FormControl  isInvalid={form.errors.password && form.touched.password}>
												<Input _invalid={{border: '2px solid red'}} _focus={{border: 'none'}} {...field} id="password" placeholder="Password" type="password" borderRadius="18px"
															 border="4px solid #30303D" color="FFF" h="50px" w='300px' />
												<FormErrorMessage paddingLeft='6px'>{form.errors.password}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
								</Flex>
							</Flex>
							<Button
								bg="#B72EB2"
								_hover="#B72EB2"
								w='300px'
								color="#FFF"
								type="submit"
								borderRadius='13px'
								isLoading={formik.isSubmitting}
							>
								Увійти
							</Button>
						</Flex>
						<Box textAlign="center" _hover={{ fontWeight: 600 }} onClick={props.activateTwoModal}>Створити акаунт</Box>
					</Flex>
				</Form>
			)}
		</Formik>
	)
}

export default SignOneModal