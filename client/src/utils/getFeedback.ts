import avaliations from '../assets/Json/avaliations.json'

export default function getFeedback() {
    const { avaliationPossibilities } = avaliations

    let keyBeingPressed: string = ''

    const addListener = (event:KeyboardEvent)=> {
        keyBeingPressed += event.key

        avaliationPossibilities.forEach(
            possiblity =>{
                if(keyBeingPressed.includes(possiblity)){
                    handlerFeedback(possiblity)
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

const handlerFeedback = (key: string) =>{
    console.log(key)
}
