import { Box, Flex, Image } from '@chakra-ui/react'
import { ReviewType } from '../../types/review.type.ts'
import { format } from 'date-fns'

type PropsType = {
	review: ReviewType
}
const MovieReview = (props: PropsType) => {
	const formattedDate = format(new Date(props.review.createdAt), 'yyyy-MM-dd')

	return (
		<Flex gap='32px' align='center'>
			<Image src={props.review.user.avatarPath} alt='Avatar' w='128px' h='128px' borderRadius='90px' />
			<Flex direction='column' gap='8px'>
				<Box>{props.review.user.name}</Box>
				<Box>{formattedDate}</Box>
				<Box maxWidth='820px' textAlign='justify'>{props.review.text}</Box>
			</Flex>
		</Flex>
	)
}

export default MovieReview



