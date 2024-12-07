import Header from '../components/Header/Header.tsx'
import { useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from '../redux/store.ts'
import { Box, Center, Flex, Skeleton, Spinner } from '@chakra-ui/react'
import CardItem from '../components/CardItem/CardItem.tsx'
import { useEffect } from 'react'
import { getProfile } from '../redux/user/user.reducer.ts'

const FavoritesPage = () => {
	const dispatch = useAppDispatch()
	const favorites = useSelector((state: AppStateType) => state.user.profile?.favorites)
	const isFetching = useSelector((state: AppStateType) => state.user.isFetching)
	useEffect(() => {
		dispatch(getProfile())
	}, [dispatch])

	return (
		<Flex direction="column" gap="50px">
			<Header />
			<Flex justify="center">
				<Flex w="1120px" paddingBottom="200px" direction="column" gap="24px">
					<Box fontSize="24px" fontWeight="700">Улюблені медіа:</Box>
					<Flex direction="column" gap="32px">
						{isFetching ? (
							<Center height="200px">
								<Spinner size="lg" />
							</Center>
						) : (
							<Flex wrap="wrap" gap="32px">
								{favorites && favorites.length > 0 ? (
									favorites.map((f) => (
										f.movie && <CardItem key={f.movie.movieId} movies={f.movie} />
									))
								) : (
									<Box fontSize="18px" color="#FFF">У вас ще немає улюблених фільмів &#128532;...</Box>
								)}
							</Flex>
						)}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default FavoritesPage