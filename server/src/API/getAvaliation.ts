import User from "../structures/user"

export default async function(request: any, response: any){
    const user = new User({name:'user', password:'123'})

    const allAvaliations = await user.allAvaliations()
    const Total = await user.totalOfAvaliations()

    return response.json([...allAvaliations, Total]) 
}
