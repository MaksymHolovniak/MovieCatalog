import { Box, Flex, Image } from '@chakra-ui/react';
import ChevronLeftIcon from './../../assets/chevronLeft.png';
import ChevronRightIcon from './../../assets/chevronRight.png';
import { AppStateType, useAppDispatch } from '../../redux/store.ts';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { searchMoviesWithType } from '../../redux/movies/movies.reducer.ts'


const PaginationAdmin: React.FC = () => {
	const dispatch = useAppDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const perPage = 20;
	const lengthMovies = useSelector((state: AppStateType) => state.movies.lengthMovies);
	const totalPages = Math.ceil(lengthMovies / perPage);
	const searchTerm = useSelector((state: AppStateType) => state.movies.searchTerm);
	const type = useSelector((state: AppStateType) => state.movies.typeMovie)
	const sort = useSelector((state: AppStateType) => state.movies.sort)

	const handlePageClick = (pageNumber: number) => {
		dispatch(searchMoviesWithType(pageNumber, perPage, searchTerm, type, sort));
		setCurrentPage(pageNumber);
		window.scrollTo(0, 0);
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			handlePageClick(currentPage - 1);
		}
	};

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			handlePageClick(currentPage + 1);
		}
	};

	return (
		<>
			{totalPages > 1 ? (
				<Flex
					mt={'35px'}
					alignSelf={'center'}
					justifyContent={'space-between'}
					borderRadius={'8px'}
					color='#FFF'
					bg='#000'
				>
					<Flex w={'118px'} gap={'6px'} p={'12px'} alignItems={'center'} fontSize={'14px'} as={'button'}>
						<Image src={ChevronLeftIcon} w='20px' h='20px' />
						<Flex
							color={currentPage === 1 ? '#FFF' : '#FFF'}
							onClick={goToPreviousPage}
						>
							Попередня
						</Flex>
					</Flex>
					<Flex>
						<Flex alignItems={'center'}>
							{Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
								<Flex
									fontSize={'14px'}
									as={'button'}
									p={'12px 15px'}
									w={'48px'}
									h={'48px'}
									justifyContent={'center'}
									color='#FFF'
									fontWeight='500'
									alignItems={'center'}
									key={pageNumber}
									onClick={() => handlePageClick(pageNumber)}
									border={currentPage === pageNumber ? '1px solid #1D1D1D' : 'none'}
								>
									{pageNumber}
								</Flex>
							))}
						</Flex>
						<Flex
							fontSize={'14px'}
							as={'button'}
							p={'12px 15px'}
							w={'48px'}
							h={'48px'}
							justifyContent={'center'}
							alignItems={'center'}
							color={'#919191'}
						>
							...
						</Flex>
						<Flex
							fontSize={'14px'}
							as={'button'}
							p={'12px 15px'}
							w={'48px'}
							h={'48px'}
							justifyContent={'center'}
							alignItems={'center'}
							color={'#919191'}
						>
							8
						</Flex>
					</Flex>
					<Flex justifyContent={'flex-end'} gap={'6px'} p={'12px'} alignItems={'center'} fontSize={'14px'} as={'button'}>
						<Flex onClick={goToNextPage}>Наступна</Flex>
						<Image src={ChevronRightIcon} w='20px' h='20px' />
					</Flex>
				</Flex>
			) : (
				<Box></Box>
			)}
		</>
	);
};

export default PaginationAdmin;