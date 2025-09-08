import { useEffect, useState } from "react";
import type { IRestaurant } from "../common/types/restaurant.types";
import { RESTAURANT_LIST_URL } from "../common/constants/ApiConstants";

export const useRestaurantList = () => { 

    const [restaurantList, setRestaurantList] =
			useState<IRestaurant[]>([]);

		const [
			filteredRestaurants,
			setFilteredRestaurants,
		] = useState<IRestaurant[]>([]);

		useEffect(() => {
			const loadRestaurants = async () => {
				const response = await fetch(
					`${RESTAURANT_LIST_URL}`
				);

				const responseData =
					await response.json();

				
				const restaurants =
					responseData?.data?.cards[1]?.card?.card
						?.gridElements?.infoWithStyle
						?.restaurants;

	
				setRestaurantList(restaurants);

				setFilteredRestaurants(restaurants);
			};

			loadRestaurants();
        }, []);
    
    return [restaurantList, filteredRestaurants,setFilteredRestaurants];
 }