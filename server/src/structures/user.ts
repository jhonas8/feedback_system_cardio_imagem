import AvaliationModel from "../Schemas/Avaliation"
import UserModel from "../Schemas/UserSchema"
import { avaliationRate, user } from "../@types/mongoRequestType"

export default class User {
    private credentials: {name: string, password:string}
    private ID: string | null

    constructor({name, password}: {name: string, password: string}) {
        this.credentials = { name, password }
        this.ID = ''

        AvaliationModel
            .findOne({ name, password })
            .then(user => {
                this.ID = user.id
            })
    }

    public static async exists({name , password}: {name: string, password: string}): Promise<any> {
        const user = await UserModel    
            .findOne({name, password})
            .exec()
        
        return user

    }

    public static async registration(user: user): Promise<any> {
        const userModel = new UserModel(user)
        await userModel.save()
    }

    public async isThereAvaliationOf(feebackRate: string): Promise<Boolean> {
        const existentAvaliation = await AvaliationModel
            .findOne({
                feedbackRate: feebackRate
            })
            .exec()

        return existentAvaliation 
            ? true
            : false
    }

    public async updateTotalOf(feedbackRate: string): Promise<void> {
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

    public async submitNewAvaliation(feedbackRate: string): Promise<void> {
        let avaliationRate: avaliationRate = {
            feedbackRate: feedbackRate,
            total: 1
        }
        const avaliationModel = new AvaliationModel(avaliationRate)
        await avaliationModel.save()
    }

    public async allAvaliations() {
        return await AvaliationModel.find()
    }

    public async totalOfAvaliations() {
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