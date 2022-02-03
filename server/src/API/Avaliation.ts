import AvaliationModel , { avaliationRate } from "../Schemas/Avaliation"
import { Router } from "express"

const route = Router()

const handlePost = async(request: any, response: any) => {
    const index = parseInt(request.body.value) as valuePossibilities
    const avaliation = avaliationMeanings[index]

    let avaliationRate: avaliationRate = {
        feedbackRate: avaliation
    }

    let avaliationModel = new AvaliationModel(avaliationRate)
    await avaliationModel.save()

    response.send('received')
}

route.post('/', handlePost)

const avaliationMeanings = {
    142: "great",
    183: "good",
    182: "regular",
    143: "bad"
}

export type valuePossibilities = 
    | 142
    | 183
    | 182
    | 143

module.exports = route