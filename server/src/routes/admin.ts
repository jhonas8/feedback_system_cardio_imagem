import { Router } from 'express'
import { user } from '../@types/mongoRequestType'
import getAvaliation from '../API/getAvaliation'
import getUserDataAndScore from '../API/getUserDataAndScore'
import Score from '../structures/score'
import User from '../structures/user'
import AvaliationModel from "../Schemas/Avaliation"
import HistoryModel from "../Schemas/AvaliationHistory"
import UserModel from "../Schemas/UserSchema"

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

route.post('/userpage', getUserDataAndScore)

route.post('/ranking', async(request, response)=>{
    const users = await UserModel.find().exec()

        const rankingMap = await Promise.all(users
            .filter(user => user.segment === 'Recepção')
            .map(async(user)=> {

                const history = await HistoryModel
                     .find({userId: user._id})
                     .exec()
 
                 const avaliations = await AvaliationModel
                     .find({userId: user._id})
                     .exec()
 
                 const instance = new Score({user, history, avaliations})
                 
                 const points = instance.getUserScore().currentMonth.points.actualPoints
 
                 return { points, name: user.employeeName, userId: user._id}
             })
            )

        response.send(
            rankingMap.sort((a,b) => a.points < b.points ? 1 : -1)
        )
})

module.exports = route