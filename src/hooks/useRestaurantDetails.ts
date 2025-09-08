import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RESTAURANT_DETAILS_URL } from "../common/constants/ApiConstants";
import type { IRestaurantMenuResponse } from "../common/types/restaurantDetails.types";


export const useRestaurantDetails = () => { 

    const [restaurantDetails, setRestaurantDetails] = useState<IRestaurantMenuResponse | null>(null);
    
    const {id} = useParams();
    
    useEffect(()=>{
        
        const loadRestaurantDetails = async () => {
            
            const response = await fetch(`${RESTAURANT_DETAILS_URL}${id}`);
            
            const responseData: IRestaurantMenuResponse = await response.json();
            
            setRestaurantDetails(responseData);
        }
        
        loadRestaurantDetails();
    },[id])

    return restaurantDetails;
}