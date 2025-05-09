import { useContext, useEffect, useRef, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantItem } from './RestaurantItem';
import { UserContext } from '../../common/utils/UserContext';
import { useRestaurantDetails } from '../../common/utils/useRestaurantDetails';
import type { IMenuCard } from '../../common/types/restaurantDetails.types';

export const RestaurantDetails = ({
	menuItems,
}: {
	menuItems?: IMenuCard[];
}) => {
	const restaurantDetails =
		useRestaurantDetails();

	const restaurantInfo =
		restaurantDetails?.data?.cards[2]?.card?.card
			?.info || {};
	const restaurantMenu =
		restaurantDetails?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(
			2
		) || [];

	const nestedCategories =
		restaurantMenu.filter((menu: any) =>
			menu?.card?.card?.['@type']?.includes(
				'.NestedItemCategory'
			)
		) || [];

	const itemCategories =
		restaurantMenu.filter((menu: any) =>
			menu?.card?.card?.['@type']?.includes(
				'.ItemCategory'
			)
		) || [];

	console.log('itemCategories', itemCategories);
	console.log(
		'nestedCategories',
		nestedCategories
	);

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
