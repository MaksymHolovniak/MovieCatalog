import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store.ts'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

type ProtectedRouteProps = {
	children: JSX.Element
}

const ProtectedRoute = ({children} : ProtectedRouteProps) => {
	const user = useSelector((state: AppStateType) => state.auth.user)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user || user.role !== 'admin') {
			navigate('/')
		}
	}, [user, navigate])

	if(!user || user.role !== 'admin') {
		return null
	}

	return children
}

export default ProtectedRoute