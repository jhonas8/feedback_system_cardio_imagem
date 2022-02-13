import { Link } from 'react-router-dom'
import './styles.css'

const HomeButton = (to: string) => {

    const render = () => (
        <Link to={to}>
            <button className="homeButtonTI" key='homeButtonTI'>
                Home
            </button>
        </Link>
    )

    return {
        render,
    }
}

export default HomeButton