import './Styles/css/styles.css'
import Types from '../../types/AvaliationFrameTypes'
import useClickOutside from '../../utils/setClickOutside'

export default function AvaliationFrame(this:any, props: Types.Props) {
    
    const { 
        openMenu,
        setOpenMenu,
    } = props   

    const FrameContainer = () =>{

        let clickOutsideRef = useClickOutside(()=>{
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
                    {[...children]}
                </div>
            )
        }
        return {
            render
        }
    }

    const render = () =>(
      FrameContainer().render.withChildren([
        
      ])
    )

    return {
      render
    }
}