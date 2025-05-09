import { useState, useEffect } from "react";
import { RESTAURANT_LIST_URL } from "../constants/ApiConstants";
import type { IRestaurant } from "../types/restaurant.types";

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

				console.log(responseData);
				
				const restaurants =
					responseData?.data?.cards[1]?.card?.card
						?.gridElements?.infoWithStyle
						?.restaurants;

				console.log(restaurants);

				setRestaurantList(restaurants);

				setFilteredRestaurants(restaurants);
			};

			loadRestaurants();
        }, []);
    
    return [restaurantList, filteredRestaurants,setFilteredRestaurants];
 }