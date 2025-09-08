import {
	useContext,
	useState,
	type Dispatch,
	type SetStateAction
} from 'react';
import type { IRestaurant } from '../../common/types/restaurant.types';
import { UserContext } from '../../common/utils/UserContext';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { useRestaurantList } from '../../hooks/useRestaurantList';
import { PromotedRestaurant, Restaurant } from '../Restaurant/Restaurant';

export default function RestaurantLander() {
	const isOnline = useNetworkStatus();	
	const { setUserName } = useContext(UserContext);

	const [searchText, setSearchText] =
		useState('');
	
	type TRestaurantList = [
		IRestaurant[],
		IRestaurant[],
		Dispatch<SetStateAction<IRestaurant[]>>
	];
	
	const [
		restaurantList,
		filteredRestaurants,
		setFilteredRestaurants,
	] = useRestaurantList() as TRestaurantList;

	const RestPromoted = PromotedRestaurant(Restaurant);

	const loadRestaurantCards = () => {
		const restaurants = filteredRestaurants?.map(
			(restaurant:IRestaurant) =>
				restaurant?.info?.promoted ? (
					<RestPromoted
						key={restaurant?.info?.id}
						restaurant={restaurant}
					/>
				) :
					(
					<Restaurant
						key={restaurant?.info?.id}
						restaurant={restaurant}
					/>
				)
		);

		return restaurants;
	};

	const filterTopRestaurants = () => {
		const filteredRestaurants = 
			restaurantList?.filter(
			(restaurant: IRestaurant) =>
				(restaurant?.info?.avgRating as number) >= 4
		);

		setFilteredRestaurants(filteredRestaurants);
	};

	const handleSearch = () => {
		const filteredRestaurants =
			restaurantList.filter((restaurant) =>
				(restaurant?.info?.name as string)
					.toLowerCase()
					.includes(searchText.toLowerCase())
			);


		setFilteredRestaurants(filteredRestaurants);
	};

	const filterVegRestaurants = () => {
		const filteredRestaurants =
			restaurantList.filter(
				(restaurant) =>
					restaurant?.info?.veg === true
			);

		setFilteredRestaurants(filteredRestaurants);
	};

	const filterOfferRestaurants = () => {
		const filteredRestaurants =
			restaurantList.filter(
				(restaurant) =>
					restaurant?.info
						?.aggregatedDiscountInfoV3
			);

		setFilteredRestaurants(filteredRestaurants);
	};
	const filterFastDeliveryRestaurants = () => {
		const filteredRestaurants =
			restaurantList.filter(
				(restaurant) =>
					(restaurant?.info?.sla?.deliveryTime as number) <=
					40
			);

		setFilteredRestaurants(filteredRestaurants);
	};
	return !isOnline ? (
		<div>
			Sorry! please check your internet
			connection!!
		</div>
	) : (
		<div className=''>
			{/* <NavBar /> */}
			<div>
					<input
						className='border-black'
						type='text'
					onChange={(e) => {
						setSearchText(e.target.value);
						setUserName(e.target.value);

					}}
				/>
				<button className='cursor-pointer m-[10px] py-2.5 px-4 outline-none border-none rounded-full text-[0.8rem] bg-gray-200 transition-transform duration-75 ease-in-out hover:scale-[1.1] transition-transform duration-75 ease-in-out hover:scale-[1.1]' onClick={handleSearch}>
					search
				</button>
				<button className='cursor-pointer m-[10px] py-2.5 px-4 outline-none border-none rounded-full text-[0.8rem] bg-gray-200 transition-transform duration-75 ease-in-out hover:scale-[1.1]' onClick={filterTopRestaurants}>
					Rating 4.0+
				</button>
				<button className='cursor-pointer m-[10px] py-2.5 px-4 outline-none border-none rounded-full text-[0.8rem] bg-gray-200 transition-transform duration-75 ease-in-out hover:scale-[1.1]' onClick={filterVegRestaurants}>
					Pure Veg
				</button>
				<button className='cursor-pointer m-[10px] py-2.5 px-4 outline-none border-none rounded-full text-[0.8rem] bg-gray-200 transition-transform duration-75 ease-in-out hover:scale-[1.1]' onClick={filterOfferRestaurants}>
					Offers
				</button>
				<button className='cursor-pointer m-[10px] py-2.5 px-4 outline-none border-none rounded-full text-[0.8rem] bg-gray-200 transition-transform duration-75 ease-in-out hover:scale-[1.1]'
					onClick={filterFastDeliveryRestaurants}>
					Fast Delivery
				</button>
			</div>
			<div className='flex flex-wrap'>
				{loadRestaurantCards()}
			</div>
		</div>
	);
}
