import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, selectedItemInfo } from '../../app/slice/CartSlice';
import { RESTAURANT_IMAGE_URL } from '../../common/constants/ApiConstants';
import type { IDishCard } from '../../common/types/restaurantDetails.types';

export const RestaurantMenuItem = ({
	menuItem,
	isAddToCart = true,
}: {
	menuItem: IDishCard;
	isAddToCart?:boolean;
}) => {
	const dispatch = useDispatch();

	const selectedItem = useSelector(selectedItemInfo(menuItem?.card?.info?.id as string));

	return (
		<div className='flex flex-col px-2 py-4'>
			<div className=' flex justify-between items-center'>
				<div className='w-[600px] self-start'>
					<div className='flex'>
						<h4>{menuItem?.card?.info?.name}</h4>
						{menuItem?.card?.info?.quantity && (
							<span className='text-red-600 ml-4'>
								{`x ${menuItem?.card?.info?.quantity}`}
							</span>
						)}
					</div>
					<span>
						₹
						{(menuItem?.card?.info?.finalPrice ??
							menuItem?.card?.info
								?.defaultPrice ??
							menuItem?.card?.info?.price ??
							0) / 100}
					</span>
					<div className='text-gray-500 font-thin text-sm cursor-pointer'>
						{menuItem?.card?.info?.description}
					</div>
				</div>

				<div>
					<img
						src={`${RESTAURANT_IMAGE_URL}${menuItem?.card?.info?.imageId}`}
						className='cursor-pointer w-[200px] h-[150px] object-cover overflow-clip'
						alt=''
					/>
					{isAddToCart &&
						(!selectedItem ? (
							<button
								onClick={() =>
									dispatch(addItem(menuItem))
								}
								className='cursor-pointer rounded-md w-40 py-2 bg-green-500 uppercase relative text-white px-2 -top-6  flex justify-evenly left-5 hover:bg-green-600'>
								Add
							</button>
						) : (
							<div className='rounded-md w-40 py-2 text-green-600 uppercase relative bg-white px-2 -top-6 border-gray-200 border-[1px] flex justify-evenly left-5' role="group" aria-label="Quantity controls">
								<button
									className='text-green-600 font-bold cursor-pointer bg-transparent border-none text-lg w-8 h-8 flex items-center justify-center hover:bg-green-50 rounded'
									onClick={() =>
										dispatch(removeItem(menuItem))
									}
									aria-label={`Remove ${menuItem?.card?.info?.name} from cart`}
									type="button">
									-
								</button>
								<span data-testid='item-quantity' aria-label={`Quantity: ${selectedItem?.card?.info?.quantity}`} className="flex items-center">
									{
										selectedItem?.card?.info
											?.quantity
									}
								</span>
								<button
									className='text-green-600 font-bold cursor-pointer bg-transparent border-none text-lg w-8 h-8 flex items-center justify-center hover:bg-green-50 rounded'
									onClick={() =>
										dispatch(addItem(menuItem))
									}
									aria-label={`Add ${menuItem?.card?.info?.name} to cart`}
									type="button">
									+
								</button>
							</div>
						))}
				</div>
			</div>
			<div className='bg-slate-200 h-[2px]'></div>
		</div>
	);
};
