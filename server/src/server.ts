import express from 'express'
import cors from 'cors'

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cors())

server.get('/', (request, response)=>{
    return response.send('Server is running well.')
})


server.post('/', (request, response) => {
    const index = parseInt(request.body.value) as valuePossibilities
    const feedbackRate = avaliationMeanings[index]


    response.send('received')
})

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

export default server
