import axios from "axios"
import { useEffect, useState } from "react"
import './Styles/css/styles.css'

export default function AdminPage(){

    const [feedbackData, setFeedbackData] = useState([])

    useEffect(()=>{
        (async()=>{
            const { data } = await axios.create({
                baseURL: 'http://localhost:8001/'
            }).get('/admin')
            setFeedbackData(data)
        })()

    })

    const Title = () =>{

        const render = () => (
            <ul key='list'>
                {
                    feedbackData
                    .slice(0,feedbackData.length-1)
                    .map(
                        (feedback: any) =>
                        (
                            <li
                                key={feedback.date}
                            >
                                {`${feedback.feedbackRate} : ${feedback.total}`}
                            </li>
                        )
                    )
                }
                <li key='total'>
                   Total: {
                        feedbackData[feedbackData.length-1]
                    }
                </li>
            </ul>
        )
        
        return {
            render,
        }
    }

    

    const Main = () => {
        const render = () =>(
            <main className="adminMain" key='adminMain'>
                { EmployeName().render() }
                { Title().render() }
            </main>
        )
        
        return {
            render,
        }
    }

    const EmployeName = () => {
        const render= () => (
            <h2 key='Funcionario'>Nome do funcionário</h2>
        )

        return {
            render,
        }
    }

    const Loading = () =>{
        const render = () => (
            <h2 key='LoadingText'>Loading...</h2>
        )

        return {
            render,
        }
    }
    
    return feedbackData.length
        ? Main().render()
        : Loading().render()
}