import { Schema, model } from 'mongoose'

const avaliationSchema =  new Schema({
    feedbackRate: {
        type: String
    }
})

const AvaliationModel = model('avaliationSchema', avaliationSchema)

export default AvaliationModel

export type avaliationRate = {
    feedbackRate: string
}