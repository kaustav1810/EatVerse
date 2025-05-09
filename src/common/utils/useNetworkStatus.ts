import { useEffect, useState } from "react"

export const useNetworkStatus = () => { 

    const [isOnline, setIsOnline] = useState(true);
    
    useEffect(() => {

        
        window.addEventListener('offline', (e) => {
            setIsOnline(false);
        });


    }, [isOnline])

    return isOnline;
 }