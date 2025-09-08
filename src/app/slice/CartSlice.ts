import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { IDishCard } from "../../common/types/restaurantDetails.types";

const CartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [] as IDishCard[]
	},
	reducers: {
		addItem: (state, action: {payload:IDishCard}) => {
			
			const selectedItem = state.items.find(
				(item) =>
					item?.card?.info?.id ===
					action?.payload?.card?.info?.id
			);

			if (selectedItem?.card?.info?.quantity) {
				selectedItem.card.info.quantity =
					(selectedItem?.card?.info?.quantity ||
						0) + 1;
			} else {
				state.items.push({
					card: {
						...action?.payload?.card,
						info: {
							...action?.payload?.card?.info,
							quantity: 1,
						},
					},
				});
			}

		},

		removeItem: (state, action:{payload:IDishCard}) => {
		
			const selectedItem = state.items.find(item => item?.card?.info?.id === action?.payload?.card?.info?.id)!
			

			if (selectedItem?.card?.info)
				selectedItem.card.info.quantity =
					(selectedItem?.card?.info?.quantity ||
						1) - 1;
			
			if (selectedItem?.card?.info?.quantity == 0)
				state.items = state.items.filter( item => item?.card?.info?.id!==action?.payload?.card?.info?.id) 
			
			
		},
		clearCart: (state) => {
			state.items.length = 0;
		},
	},
});

export const selectedItemInfo = (id:string) => (state:RootState) => state.cart.items.find(
	(item:IDishCard) =>
		item?.card?.info?.id === id
) as IDishCard;

export const { addItem, clearCart, removeItem } =
	CartSlice.actions;
export default CartSlice.reducer;

/*
CartSlice = {

actions:{
addItem,clearCart
},
reducer
}
*/