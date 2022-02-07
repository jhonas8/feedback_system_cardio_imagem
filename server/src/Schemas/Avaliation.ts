import { Schema, model } from 'mongoose'

const avaliationSchema =  new Schema({
    feedbackRate: {
        type: String,
        require: true
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
})

const AvaliationModel = model('avaliationSchema', avaliationSchema)

export default AvaliationModel
