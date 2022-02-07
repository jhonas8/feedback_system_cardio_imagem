import meaningOfTheAvaliation from "../utils/meaningOfAvaliation"
import User from "../structures/user"

const handleAvaliationButton = async(request: any, response: any) => {
    
    const feedbackRate = meaningOfTheAvaliation(request.body.value)

    const isThereAnAvaliation = await User.isThereAvaliationOf(feedbackRate)

    if(isThereAnAvaliation)
        await User.updateTotalOf(feedbackRate)
    
    else 
        await User.submitNewAvaliation(feedbackRate)

    response.send('received')
}

export default handleAvaliationButton