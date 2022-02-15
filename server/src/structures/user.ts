import AvaliationModel from "../Schemas/Avaliation"
import UserModel from "../Schemas/UserSchema"
import { avaliationRate, user } from "../@types/mongoRequestType"

export default class User {
    private ID: string | null

    constructor(userId: string) {
        this.ID = userId
    }

    public static async exists({name , password}: {name: string, password: string}): Promise<any> {
        const user = await UserModel    
            .findOne({name, password})
            .exec()
        
        return user

    }

    public static async returnAll() {
        const users = await UserModel
            .find()
            .exec()

        return users.filter(user => user.segment!=='admin')
    }

    public static async registration(user: user): Promise<any> {
        const existingUser = await UserModel
            .findOne(user)
            .exec()

        if(existingUser) return 'Usuário já existe!'

        const userModel = new UserModel(user)
        await userModel.save()
    }

    public static async usersWithNameOf(username: string): Promise<any> {
        const users = await UserModel
            .find()
            .exec()

        const usernameWithNoWhiteSpaces = username.toLowerCase().replace(/\s+/g, '')

        return users.filter(user =>(
                user.employeeName.toLowerCase().replace(/\s+/g, '').includes(usernameWithNoWhiteSpaces)
                && user.segment === 'Recepção'
            ))
    }

    public async changePassword(newPassword: string) {
        const user = await UserModel
            .findById(this.ID)
            .exec()
        
        if (user) await user
            .updateOne({password: newPassword})

        return user
    }

    public async removeUser() {
        const user = await UserModel
            .deleteOne({_id: this.ID})

        return user
    }

    public async isThereAvaliationOf(feebackRate: string): Promise<Boolean> {
        const existentAvaliation = await AvaliationModel
            .findOne({
                feedbackRate: feebackRate,
                userId: this.ID
            })
            .exec()

        return existentAvaliation 
            ? true
            : false
    }

    public async updateTotalOf(feedbackRate: string): Promise<void> {
        const existentAvaliation = await AvaliationModel
        .findOne({
            feedbackRate: feedbackRate,
            userId: this.ID
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
            userId: this.ID!,
            total: 1
        }
        const avaliationModel = new AvaliationModel(avaliationRate)
        await avaliationModel.save()
    }

    public async allAvaliations() {
        const avaliations = await AvaliationModel
            .find({userId: this.ID})
            .exec()

        return avaliations.map(
            avaliation => ({rate: avaliation.feedbackRate, total: avaliation.total})
        )
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