import React, { useMemo } from 'react';
import {
	useDispatch,
	useSelector,
} from 'react-redux';
import {
	clearCart,
} from '../app/slice/CartSlice';
import { RestaurantMenuItem } from './Restaurant/RestaurantMenuItem';
import type { ICartInitialState, MenuItem } from '../common/types/common.types';

export const Cart = () => {
	const cart = useSelector(
		(store: ICartInitialState) => store.cart.items
	);

	const dispatch = useDispatch();

	const getCartTotal = useMemo(() => {
	
		return cart?.reduce((cartTotal:number,cartItem:MenuItem) => {
			
			const cartItemInfo = cartItem?.card?.info;

			cartTotal +=
				((cartItemInfo?.finalPrice ??
					cartItemInfo?.defaultPrice ??
					cartItemInfo?.price) /
					100) *
				(cartItemInfo?.quantity || 0)

			return cartTotal
		},0)
	}, [cart]);

	return (
		<div className='flex flex-col justify-center items-center'>
			<div className='font-bold text-purple-800 text-3xl'>
				Cart
			</div>

			{cart?.length == 0 ? (
				<div>
					No items in cart. Start adding some!!
				</div>
			) : (
				<>
					<button
						onClick={() =>
							dispatch(clearCart())
						}
						className='p-4 w-40 bg-purple-200 mt-4 rounded-md hover:bg-purple-300 border-purple-950 cursor-pointer'>
						Clear Cart
					</button>

						<div>

					<div>
						{cart?.map((item) => (
							<RestaurantMenuItem
							key={item?.card?.info?.id}
							isAddToCart={false}
							menuItem={item}
							/>
						))}
						</div>
						
						<div className='flex font-bold font-sans justify-end border-t-gray-800 px-2 text-[2rem]'>

								Total: {getCartTotal}
							</div>
							
						</div>
				</>
			)}
		</div>
	);
};

/*

1. configure store & add Provider
2. create slice
3. add dispatch function
4. subscribe to store to read data

*/
