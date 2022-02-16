import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import userType from '../../@types/UserType'
import { HomeButton } from '../../components'
import { api } from '../../utils/getFeedback'

import './Styles/css/styles.css'

export default function UserPage() {

    const { userId } = useParams()
    const [user, setUser] = useState<{user:userType.user, avaliations: any[] }| null>(null)

    useEffect(()=>{
        (async()=>{
            const { data } = await api.post('/admin/userpage', { userId })

            setUser(data)
        })()
    },[userId])

    console.log(user)

    const ProfileCard = () => {

        const Card = ({children}: {children:JSX.Element[] | JSX.Element}) => (
            <div className="cardUserProfile">
                { children }
            </div>
        )

        const UserNameAndSegment = () => (
            <div className="userProfileDesc">
                <p className='userNameProfile'>{user?.user.employeeName}</p>
                <p className='userSegmentProfile'>{user?.user.segment}</p>
            </div>
        )

        const UserImage = () => (
            <div className="userImage">
                <img alt='profile' src='/Images/userdefault.png'/>
            </div>
        )

        const render = () => (
            <Card>
                <UserImage/>
                <UserNameAndSegment/>
            </Card>
        )

        return { render }
    }

    return(
        <>
            { HomeButton('/admin/search').render() }
            { ProfileCard().render() }
        </>
    )
}