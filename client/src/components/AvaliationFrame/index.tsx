import './Styles/css/styles.css'
import Types from '../../types/AvaliationFrameTypes'

export default function AvaliationFrame(props: Types.Props) {
    
    const { 
        openMenu
    } = props

    const frameContainer = () =>{
        let visible_invisible_class: string = openMenu 
            ? 'visibleFrameContainer'
            : ' ' 
        
        const render = {
            withChildren: (children: JSX.Element[]): JSX.Element => (
                <div className={`frameContainer ${visible_invisible_class}`}>
                    {[...children]}
                </div>
            )
        }

        return {
            render
        }
    }

    const render = () =>(
      frameContainer().render.withChildren([
        
      ])
    )

    return {
      render
    }
}