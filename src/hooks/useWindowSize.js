  
  import {useState,useEffect} from "react";

    const useWindowSize = () => {
  
    const [windowSize,setWindowSize] =useState({
           width:undefined,
           height:undefined
    })

    useEffect(()=>{
        const handleResize =()=>{
            setWindowSize({
                width:window.innerWidth,
                height:window.innerHeight
            });
        }
        handleResize();
        
        //How we will get the values to continue to adjust when the window is resized.We will do that with an event listener like we would in regular old javascript.

        window.addEventListener('resize',handleResize);

        //to prevent memory leak in our applications hence we need remove event listener. Fortunately useEffect has cleanup function that will only run when dependency changes in useEffect.So we know the dependency won't change here

        /* const cleanUp =()=>{
            console.log("runs if useEffect dependency changes");
            window.removeEventListener('resize',handleResize)
        }

        return cleanUp; */

        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
        
    },[])

    return windowSize;
  }
  
  export default useWindowSize