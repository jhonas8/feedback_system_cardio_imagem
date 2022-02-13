import avaliations from '../assets/Json/avaliations.json'
import axios from 'axios'

export default function getFeedback() {
    const { avaliationPossibilities } = avaliations

    let keyBeingPressed: string = ''

    const addListener = (event:KeyboardEvent)=> {
        keyBeingPressed += event.key

        avaliationPossibilities.forEach(
            possiblity =>{
                if(keyBeingPressed.includes(possiblity)){
                    HandlerFeedback(possiblity)
                }
            }
        )
    }

    const removeListener = () => {
        keyBeingPressed = ''
    }

        document.addEventListener('keydown',(event)=>addListener(event))
        document.addEventListener('keyup',()=> removeListener())
 
        return  ()=>{
            document.removeEventListener('keydown',(event)=>addListener(event))
            document.removeEventListener('keyup',()=> removeListener())
        }
}

const HandlerFeedback = async(key: string) => {
    try {
        const { data } = await postValue( key )

        if(data === 'received') 
            return window.location.reload()

    } catch(error){
        console.log(error)
    }
}


export const api = axios.create({
    baseURL:'http://localhost:8001'
})

export const postValue = async(value: string) =>{
    return api.post('/feedback', { value: value })
}