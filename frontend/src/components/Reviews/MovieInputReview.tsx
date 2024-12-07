import { Box, Flex, Image, Textarea } from '@chakra-ui/react'
import { UserWithFavoritesType } from '../../types/user.type.ts'
import { useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from '../../redux/store.ts'
import { actions, leaveReview } from '../../redux/movies/movies.reducer.ts'
import { useEffect } from 'react'

type PropsType = {
	profile: UserWithFavoritesType
	movieId: number
}
const MovieInputReview = (props: PropsType) => {

	const reviewText = useSelector((state: AppStateType) => state.movies.reviewText)
	const dispatch = useAppDispatch()

	useEffect(() => {
		return () => {
			dispatch(actions.setReviewText('')) // Очищення тексту
		}
	}, [dispatch])

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			dispatch(leaveReview(props.movieId, reviewText))
		}
	}

		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			dispatch(actions.setReviewText(e.target.value))
		}

	return (
		<Flex direction='column' gap='40px'>
		<Box fontSize='24px' fontWeight='600'>Коментарі</Box>
			<Flex gap='32px'>
				<Image w='128px' h='128px' borderRadius='90px' src={props.profile?.avatarPath} alt='Avatar' />
				<Flex direction='column' gap='6px'>
					<Box fontSize='16px' fontWeight='500'>{props.profile?.name}</Box>
					<Textarea color='#000' _focus={{border: 'none'}} _focusVisible={{border: 'none'}} onKeyDown={handleKeyDown} onChange={handleChange} value={reviewText} w='816px' h='72px' bg='#FFF' borderRadius='10px' placeholder='Пишіть свої коментарі тут...' />
				</Flex>
			</Flex>
		</Flex>
	)
}

export default MovieInputReview