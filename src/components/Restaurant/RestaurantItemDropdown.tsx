import React from 'react';
import { RestaurantMenuItem } from './RestaurantMenuItem';
import type { IGenericCard, INestedCategory } from '../../common/types/restaurantDetails.types';

export const RestaurantItemDropdown = ({
	item: restItem,
}:{item: IGenericCard | INestedCategory}) => {

	return (
		<>
			{
				restItem?.itemCards?.map(item => 
				<RestaurantMenuItem menuItem={ item} />
				)
			}
		</>
	);
};
