import React, { useEffect, useRef, useState } from 'react'
import { AboutChild } from './AboutChild';



export const AboutFunc = () => {
  
    const [count,setCount] = useState(0);

    const buttonRef:any = useRef(null);

    let intervalId;

    useEffect(()=>{
        console.log('useEffect called!!');

        intervalId = setInterval(()=>{
            console.log("parent interval!!");
            
          },3000);
        
        return ()=>{
            console.log("cleanup called!!");
            clearInterval(intervalId);
            buttonRef?.current?.removeEventListener('click',()=>{})
        }
    },[count])

    const updateCount = () => { 

        setCount(count+1);
     }

  return(
      <div>
        About Parent
        <button ref={buttonRef} onClick={updateCount}>Click me</button>
        <AboutChild/>
      </div>
    )
}
