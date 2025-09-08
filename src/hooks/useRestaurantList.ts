import { useEffect, useState } from "react";
import type { IRestaurant } from "../common/types/restaurant.types";
import { RESTAURANT_LIST_URL } from "../common/constants/ApiConstants";

/**
 * Custom hook to fetch and manage restaurant list data with filtering capabilities
 * 
 * This hook fetches the list of available restaurants from Swiggy API and provides
 * both the original list and a filtered version that can be modified based on user
 * search criteria, ratings, cuisine types, etc.
 * 
 * @returns {[IRestaurant[], IRestaurant[], React.Dispatch<React.SetStateAction<IRestaurant[]>>]} 
 *   A tuple containing:
 *   - restaurantList: Original unfiltered list of restaurants
 *   - filteredRestaurants: Filtered list based on current search/filter criteria  
 *   - setFilteredRestaurants: Function to update the filtered list
 * 
 * @example
 * ```tsx
 * function RestaurantLander() {
 *   const [restaurantList, filteredRestaurants, setFilteredRestaurants] = useRestaurantList();
 *   
 *   const handleSearch = (searchTerm) => {
 *     const filtered = restaurantList.filter(restaurant =>
 *       restaurant.info.name.toLowerCase().includes(searchTerm.toLowerCase())
 *     );
 *     setFilteredRestaurants(filtered);
 *   };
 *   
 *   return <RestaurantGrid restaurants={filteredRestaurants} />;
 * }
 * ```
 */
export const useRestaurantList = () => { 
    // Original unfiltered list of restaurants from API
    const [restaurantList, setRestaurantList] = useState<IRestaurant[]>([]);

    // Filtered list that can be modified by search/filter operations
    const [filteredRestaurants, setFilteredRestaurants] = useState<IRestaurant[]>([]);

    // Fetch restaurant data on component mount
    useEffect(() => {
        /**
         * Fetches restaurant list from Swiggy API
         * Parses the nested response structure to extract restaurant array
         */
        const loadRestaurants = async () => {
            try {
                // Fetch restaurants data from Swiggy API
                const response = await fetch(`${RESTAURANT_LIST_URL}`);
                const responseData = await response.json();

                // Extract restaurants array from nested API response structure
                // API returns data in: data.cards[1].card.card.gridElements.infoWithStyle.restaurants
                const restaurants = responseData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

                // Handle case where API structure might change or be empty
                const restaurantsArray = restaurants || [];

                // Set both original and filtered lists with the same data initially
                setRestaurantList(restaurantsArray);
                setFilteredRestaurants(restaurantsArray);
            } catch (error) {
                console.error('Failed to fetch restaurant list:', error);
                // Set empty arrays on error to prevent crashes
                setRestaurantList([]);
                setFilteredRestaurants([]);
            }
        };

        loadRestaurants();
    }, []); // Empty dependency array - only run on mount
    
    // Return tuple for array destructuring in components
    return [restaurantList, filteredRestaurants, setFilteredRestaurants];
}