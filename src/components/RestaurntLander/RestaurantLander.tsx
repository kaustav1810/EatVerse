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
		<main role="main" aria-live="polite">
			<div className="text-center p-8" role="alert">
				<h1 className="text-2xl font-bold mb-4">Connection Error</h1>
				<p>Sorry! Please check your internet connection and try again.</p>
			</div>
		</main>
	) : (
		<main className='' role="main">
			<section className="search-and-filters" aria-label="Search and filter restaurants">
				<div className="mb-6 p-4">
					<label htmlFor="restaurant-search" className="sr-only">Search restaurants</label>
					<input
						id="restaurant-search"
						className='border-black border p-2 rounded'
						type='text'
						placeholder="Search restaurants..."
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value);
							setUserName(e.target.value);
						}}
						aria-label="Search restaurants by name"
					/>
					<button 
						className='cursor-pointer m-[10px] py-2.5 px-4 outline-none border-none rounded-full text-[0.8rem] bg-gray-200 transition-transform duration-75 ease-in-out hover:scale-[1.1]' 
						onClick={handleSearch}
						aria-label="Search restaurants">
						Search
					</button>
					<div role="group" aria-label="Restaurant filters" className="flex flex-wrap gap-2">
						<button 
							className='cursor-pointer m-[10px] py-2.5 px-4 outline-none border-none rounded-full text-[0.8rem] bg-gray-200 transition-transform duration-75 ease-in-out hover:scale-[1.1]' 
							onClick={filterTopRestaurants}
							aria-label="Filter restaurants with rating 4.0 and above">
							Rating 4.0+
						</button>
						<button 
							className='cursor-pointer m-[10px] py-2.5 px-4 outline-none border-none rounded-full text-[0.8rem] bg-gray-200 transition-transform duration-75 ease-in-out hover:scale-[1.1]' 
							onClick={filterVegRestaurants}
							aria-label="Filter pure vegetarian restaurants">
							Pure Veg
						</button>
						<button 
							className='cursor-pointer m-[10px] py-2.5 px-4 outline-none border-none rounded-full text-[0.8rem] bg-gray-200 transition-transform duration-75 ease-in-out hover:scale-[1.1]' 
							onClick={filterOfferRestaurants}
							aria-label="Filter restaurants with offers">
							Offers
						</button>
						<button 
							className='cursor-pointer m-[10px] py-2.5 px-4 outline-none border-none rounded-full text-[0.8rem] bg-gray-200 transition-transform duration-75 ease-in-out hover:scale-[1.1]'
							onClick={filterFastDeliveryRestaurants}
							aria-label="Filter restaurants with fast delivery (under 40 minutes)">
							Fast Delivery
						</button>
					</div>
				</div>
			</section>
			<section aria-label="Restaurant listings" className='flex flex-wrap'>
				{loadRestaurantCards()}
			</section>
		</main>
	);
}
