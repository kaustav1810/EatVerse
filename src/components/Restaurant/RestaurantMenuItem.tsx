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
							<div className='cursor-pointer rounded-md w-40 py-2 text-green-600 uppercase relative bg-white px-2 -top-6 border-gray-200 border-[1px] flex justify-evenly left-5'>
								<span
									className=' text-green-600 font-bold'
									onClick={() =>
										dispatch(removeItem(menuItem))
									}>
									-
								</span>
								<span data-testid='item-quantity'>
									{
										selectedItem?.card?.info
											?.quantity
									}
								</span>
								<span
									className=' text-green-600 font-bold'
									onClick={() =>
										dispatch(addItem(menuItem))
									}>
									+
								</span>
							</div>
						))}
				</div>
			</div>
			<div className='bg-slate-200 h-[2px]'></div>
		</div>
	);
};
