import express from 'express'
import cors from 'cors'
import connectDB from './DB/Connection'

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cors())

connectDB()

const homeRoutes = require('./routes/home')

server.get('/', (request, response)=>{
    return response.send('Server is running well.')
})

server.use('/', homeRoutes)

export default server
