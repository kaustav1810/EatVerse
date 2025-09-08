import type { IGenericCard, INestedCategory } from '../../common/types/restaurantDetails.types';
import { RestaurantMenuItem } from './RestaurantMenuItem';

export const RestaurantItemDropdown = ({
	item: restItem,
}:{item: IGenericCard | INestedCategory}) => {

	return (
		<>
			{
				restItem?.itemCards?.map(item => 
				<RestaurantMenuItem key={item?.card?.info?.id} menuItem={ item} />
				)
			}
		</>
	);
};
