import { Router } from 'express'
import { user } from '../@types/mongoRequestType'
import getAvaliation from '../API/getAvaliation'
import User from '../structures/user'

const route = Router()

route.get('/', getAvaliation)

route.post('/search', async(request, response)=>{
    type usersAndAvaliationsType = {
        segment: string,
        name: string,
        id: string,
        avaliations: Array<{rate: string, total:number}>
    } 

    const { username } = request.body

    const users = await User.usersWithNameOf(username)

    const usersAndAvaliations: usersAndAvaliationsType[] = await 
        Promise.all(
            users.map(
                async(user: user): Promise<usersAndAvaliationsType> => {
                    
                    const userInstance = new User(user['_id']!)
                    
                    let avaliation = await userInstance.allAvaliations()

                    return {
                        segment: user.segment,
                        name: user.employeeName!,
                        avaliations: avaliation,
                        id: user._id!
                    }
                }
            )
        )

    return response.send(usersAndAvaliations)
})

module.exports = route