import type { IMenuCard, IRestaurantInfo } from '../../common/types/restaurantDetails.types';
import { useRestaurantDetails } from '../../hooks/useRestaurantDetails';
import { RestaurantItem } from './RestaurantItem';

export const RestaurantDetails = ({
	menuItems,
}: {
	menuItems?: IMenuCard[];
}) => {
	const restaurantDetails =
		useRestaurantDetails();

	const restaurantInfo: IRestaurantInfo =
		restaurantDetails?.data?.cards?.[2]?.card?.card?.info || {};
	const restaurantMenu =
		restaurantDetails?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(
			2
		) || [];

	const nestedCategories =
		restaurantMenu.filter((menu) =>
			menu?.card?.card?.['@type']?.includes(
				'.NestedItemCategory'
			)
		) || [];

	const itemCategories =
		restaurantMenu.filter((menu) =>
			menu?.card?.card?.['@type']?.includes(
				'.ItemCategory'
			)
		) || [];

	const restaurantMenuItems = [
		...itemCategories,
		...nestedCategories,
	];

	return (
		<div className='flex flex-col justify-center items-center'>
			<div className='w-[33%] flex flex-col justify-center items-center my-4'>
				<h1 className='font-bold text-2xl'>
					{restaurantInfo?.name}
				</h1>
				<div>
					<span>{restaurantInfo?.areaName}</span>
					<span>
						{restaurantInfo?.costForTwoMessage}
					</span>
				</div>
				<div>
					{restaurantInfo?.cuisines?.join(',')}
				</div>
				<div className='font-semibold'>
					{restaurantInfo?.sla?.slaString}
				</div>
			</div>

			<div className='w-[70%]'>
				{(menuItems || restaurantMenuItems)?.map((item, i) => (
					<RestaurantItem
						key={i}
						item={item}
					/>
				))}
			</div>
		</div>
	);
};
