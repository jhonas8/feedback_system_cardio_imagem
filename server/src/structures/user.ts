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

    public static async allAvaliations() {
        return await AvaliationModel.find()
    }

    public static async totalOfAvaliations() {
        const allAvaliations = await this.allAvaliations()

        let Total: number = 0

        allAvaliations
            .forEach(
                avaliation => {
                    Total = Total + avaliation.total
                }
            )

        return Total
    }
}