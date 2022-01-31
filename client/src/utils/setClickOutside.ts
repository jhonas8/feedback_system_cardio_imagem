import React, { useEffect, useRef } from 'react'

export default function useClickOutside(handler: any): React.RefObject<HTMLDivElement> {

    let domNode = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        const maybeHandler = (event: MouseEvent) =>{
            if(domNode.current && !domNode.current.contains(event.target as Element)) {
                handler()
            }   
        }

        document.addEventListener('mousedown', maybeHandler)
            
        return ()=>{
            document.addEventListener('mousedown', maybeHandler)
        }
    })
    
    return domNode
}