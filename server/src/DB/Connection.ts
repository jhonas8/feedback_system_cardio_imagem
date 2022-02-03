import { connect, ConnectOptions } from "mongoose"

const username: string = 'CardioSystem'
const password: string = 'KGZeGfwL92AfqFhT'

const URI: string = `mongodb+srv://${username}:${password}@cluster0.e7bn8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connectDB = async() => {

    try {
        await connect(URI)
        console.log('DB connected')
    }
    catch(error){
        console.log(`Error on connect to DB. ${error}`)
    }
}

export default connectDB