import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.tsx'
import HomePage from './pages/HomePage.tsx'
import MoviePage from './pages/MoviePage.tsx'
import FilmsPage from './pages/FilmsPage.tsx'
import SerialsPage from './pages/SerialsPage.tsx'
import CartoonsPage from './pages/CartoonsPage.tsx'
import MoviesPage from './pages/MoviesPage.tsx'
import FavoritesPage from './pages/FavoritesPage.tsx'
import { theme } from './theme.tsx'
import AdminPage from './pages/AdminPage.tsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx'
import AdminEditPage from './pages/AdminEditPage.tsx'
import AdminCreatePage from './pages/AdminCreatePage.tsx'
function App() {
	return (
		<>
			<ChakraProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="*" element={<ErrorPage />} />
						<Route path="/films" element={<FilmsPage />} />
						<Route path='/favorites' element={<FavoritesPage />} />
						<Route path="/serials" element={<SerialsPage />} />
						<Route path="/cartoons" element={<CartoonsPage />} />
						<Route path="/movies" element={<MoviesPage />} />
						<Route path="/movies/:id" element={<MoviePage />} />
						<Route path="/admin" element={<ProtectedRoute> <AdminPage /> </ProtectedRoute>} />
						<Route path="/admin/movie" element={<ProtectedRoute> <AdminCreatePage /> </ProtectedRoute>} />
						<Route path="/admin/movies/:id" element={<ProtectedRoute> <AdminEditPage /> </ProtectedRoute>} />

					</Routes>
				</BrowserRouter>
			</ChakraProvider>
		</>
	)
}

export default App
