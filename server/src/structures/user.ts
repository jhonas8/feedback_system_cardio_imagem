import AvaliationModel from "../Schemas/Avaliation"
import { avaliationRate } from "../@types/mongoRequestType"

export default class User {

    public static async isThereAvaliationOf(feebackRate: string): Promise<Boolean>{
        const existentAvaliation = await AvaliationModel
            .findOne({
                feedbackRate: feebackRate
            })
            .exec()

        return existentAvaliation 
            ? true
            : false
    }

    public static async updateTotalOf(feedbackRate: string): Promise<void> {
        const existentAvaliation = await AvaliationModel
        .findOne({
            feedbackRate: feedbackRate
        })
        .exec()

        await existentAvaliation
            .updateOne({
                total: existentAvaliation.total + 1
            })    
    }

    public static async submitNewAvaliation(feedbackRate: string): Promise<void> {
        let avaliationRate: avaliationRate = {
            feedbackRate: feedbackRate,
            total: 1
        }
        const avaliationModel = new AvaliationModel(avaliationRate)
        await avaliationModel.save()
    }
}