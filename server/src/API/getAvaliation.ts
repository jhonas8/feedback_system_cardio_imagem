import User from "../structures/user"

export default async function(request: any, response: any){
    const allAvaliations = await User.allAvaliations()
    const Total = await User.totalOfAvaliations()

    return response.json([...allAvaliations, Total]) 
}
