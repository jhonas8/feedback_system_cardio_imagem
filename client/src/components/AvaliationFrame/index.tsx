import { useState } from 'react'
import './Styles/css/styles.css'
import './Styles/css/button.css'
import Types from '../../types/AvaliationFrameTypes'
import useClickOutside from '../../utils/useClickOutside'
import getFeedback from '../../utils/getFeedback'

export default function AvaliationFrame(this: any, props: Types.Props) {

    const {
        openMenu,
        setOpenMenu,
    } = props

    const [titleText, setTitleText] = useState('Iniciar o feedback')

    const FrameContainer = () => {

        let clickOutsideRef = useClickOutside(() => {
            setOpenMenu(false)
        })

        let visible_invisible_class: string = openMenu
            ? 'visibleFrameContainer'
            : ' '

        const render = {
            withChildren: (children: JSX.Element[]): JSX.Element => (
                <div
                    className={`frameContainer ${visible_invisible_class}`}
                    ref={clickOutsideRef!}
                >
                    <div className="innerPart">
                        {[...children]}
                    </div>
                </div>
            )
        }
        return {
            render,
        }
    }

    const BeginFeedbackButton = () => {

        const [buttonColor, setButtonColor] = useState<string>('primary');

        const buttonText = 'Iniciar'

        const onClickHandler = () => {

            setButtonColor('secondary')
            setTitleText('Esperando pela avaliação...')

            getFeedback()
        }

        const render = (): JSX.Element => (
            <button
                className={`beginFeedbackButton ${buttonColor}`}
                onClick={() => onClickHandler()}
                key={titleText+'button'}
            >
                {buttonText}
            </button>
        )

        return {
            render,
        }
    }

    const AvaliationFrameTitle = () => {

        const render = (): JSX.Element => (
            <h3
                className='avaliationFrameTitle'
                key={titleText}
            >
                {titleText}
            </h3>
        )

        return {
            render,
        }
    }

    const render = () => (
        FrameContainer().render.withChildren([

            AvaliationFrameTitle().render(),
            BeginFeedbackButton().render()

        ])
    )

    return {
        render
    }
}