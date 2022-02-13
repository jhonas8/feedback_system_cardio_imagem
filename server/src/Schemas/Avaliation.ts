import { Schema, model } from 'mongoose'

const avaliationSchema =  new Schema({
    feedbackRate: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        requried: true
    },
    date: {
        type: String,
        default: Date.now
    }
})

const AvaliationModel = model('avaliationSchema', avaliationSchema)

export default AvaliationModel
