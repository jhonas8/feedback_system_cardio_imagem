import { user } from '../@types/mongoRequestType'
import User from '../structures/user'

export default async function handleRegistration(request: any, response: any): Promise<void>{
    const { name , password, segment }: user = request.body

    await User.registration({name, password, segment})

    response.send('Usuário registrado')
}