import {
    useContext
} from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'

import {
    LoginPage,
    HomePage,
    AdminPage,
} from './'

import {
    AuthProvider,
    AuthContext
} from '../contexts/auth/auth'

export default function AppRoutes(){

    const Private = ({children}: {children: JSX.Element | JSX.Element[]}) => {
        const { authenticated, loading } = useContext(AuthContext)!

        return loading
        ? <h1>Loading...</h1>
        : authenticated
            ? (
                <>
                    { children }
                </>
            )
            : <Navigate to='/login' />
    }

    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={
                        <Private>
                            <HomePage/>
                        </Private>
                    }/>
                    <Route path='/admin' element={
                        <Private>
                            <AdminPage/>
                        </Private>
                    }/>
                    <Route path='/login' element={<LoginPage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
}