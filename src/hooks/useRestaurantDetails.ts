import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RESTAURANT_DETAILS_URL } from "../common/constants/ApiConstants";
import type { IRestaurantMenuResponse } from "../common/types/restaurantDetails.types";

/**
 * Custom hook to fetch and manage restaurant details data
 * 
 * This hook fetches detailed restaurant information including menu items,
 * restaurant info, and categories from the Swiggy API based on restaurant ID
 * from URL parameters.
 * 
 * @returns {IRestaurantMenuResponse | null} Restaurant details object containing
 *   menu items, restaurant info, and metadata, or null while loading
 * 
 * @example
 * ```tsx
 * function RestaurantPage() {
 *   const restaurantDetails = useRestaurantDetails();
 *   
 *   if (!restaurantDetails) {
 *     return <div>Loading...</div>;
 *   }
 *   
 *   return <RestaurantMenu data={restaurantDetails} />;
 * }
 * ```
 */
export const useRestaurantDetails = () => { 
    // State to hold restaurant details data
    const [restaurantDetails, setRestaurantDetails] = useState<IRestaurantMenuResponse | null>(null);
    
    // Extract restaurant ID from URL parameters
    const {id} = useParams();
    
    useEffect(()=>{
        /**
         * Fetches restaurant details from Swiggy API
         * Includes menu items, restaurant information, and categorized data
         */
        const loadRestaurantDetails = async () => {
            try {
                // Fetch restaurant details using restaurant ID
                const response = await fetch(`${RESTAURANT_DETAILS_URL}${id}`);
                
                // Parse JSON response with proper typing
                const responseData: IRestaurantMenuResponse = await response.json();
                
                // Update state with fetched data
                setRestaurantDetails(responseData);
            } catch (error) {
                console.error('Failed to fetch restaurant details:', error);
                // Keep state as null on error to show loading/error state
                setRestaurantDetails(null);
            }
        }
        
        // Only fetch if we have a restaurant ID
        if (id) {
            loadRestaurantDetails();
        }
    },[id]) // Re-fetch when restaurant ID changes

    return restaurantDetails;
}