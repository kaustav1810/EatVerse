import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RESTAURANT_DETAILS_URL } from "../constants/ApiConstants";


export const useRestaurantDetails = () => { 

    const [restaurantDetails, setRestaurantDetails] = useState<any>();
    
    const {id} = useParams();
    
    useEffect(()=>{
        
        const loadRestaurantDetails = async () => {
            
            const loadRestaurantDetails = await fetch(`${RESTAURANT_DETAILS_URL}${id}`);
            
            const responseData = await loadRestaurantDetails.json();
            
            console.log(responseData?.data?.cards[1]?.groupedCard?.cardGroupMap);
            
            setRestaurantDetails(responseData);
        }
        
        loadRestaurantDetails();
    },[])

    return restaurantDetails;
}