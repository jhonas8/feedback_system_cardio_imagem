import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userType from '../../@types/UserType'

interface AuthContextInterface {
    user?: userType.user | null
    authenticated?: boolean
    login?: (user: string, password: string) => void
    logout?: () => void
    loading?: boolean
}

export const AuthContext = createContext<AuthContextInterface | null>(null)

export const AuthProvider = ({children}: {children: JSX.Element[] | JSX.Element}) => {
    const [ user, setUser ] = useState<userType.user | null>(null)
    const [ loading, setLoading ] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(()=>{
        const recoveredUser= localStorage.getItem('user')

        if(recoveredUser) {
            setUser(JSON.parse(recoveredUser))
        }
        setLoading(false)
    },[])

    const login = (username: string, password: string) => {
        

        if(password === 'certa'){
            const loggedUser = {
                id: '123', 
                user: username
            }

            localStorage.setItem('user', JSON.stringify(loggedUser))

            navigate('/')
        }
    }

    const logout = () =>{
        setUser(null)
        navigate('/login')
    }

    return(
        <AuthContext.Provider
            value ={{authenticated: !!user, user, login, logout, loading}}
        >
            {children}
        </AuthContext.Provider>
    )

}