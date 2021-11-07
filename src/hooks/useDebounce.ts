import {useState, useEffect} from "react"

export const useDebounce = (value: any, delay: number = 300) => {
    const [debounce, setDebounce] = useState(value)
    useEffect(()=> {
        const timer = window.setTimeout(()=>{
            setDebounce(value)
        },delay)
        return () => {
            clearTimeout(timer)
        }
    },[value, delay])
    return debounce
}