import User from '../structures/user'
import ScoreTypes from '../@types/scoreTypes'
import Score from '../utils/getUserScore'

export default async function getUserDataAndScore(request: any, response: any) {
    const requestUser = await new User(request.body.userId).getPublicData() as ScoreTypes.requestUser
    
    const userScore = new Score(requestUser).getUserScore()

    const reponseUser: ScoreTypes.responseUser = {
        ...requestUser,
        score: userScore
    }

    response.send(reponseUser)
}