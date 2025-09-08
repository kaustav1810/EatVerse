import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { IDishCard } from "../../common/types/restaurantDetails.types";

/**
 * Redux slice for managing shopping cart state
 * 
 * This slice handles all cart-related operations including adding items,
 * removing items, quantity management, and clearing the entire cart.
 * Uses Redux Toolkit's createSlice for simplified state management.
 */
const CartSlice = createSlice({
	name: 'cart',
	// Initial state with empty cart
	initialState: {
		items: [] as IDishCard[] // Array of menu items with quantity information
	},
	reducers: {
		/**
		 * Adds an item to the cart or increments quantity if item already exists
		 * 
		 * @param state - Current cart state
		 * @param action - Action containing the menu item to add
		 */
		addItem: (state, action: {payload: IDishCard}) => {
			// Check if item already exists in cart by comparing IDs
			const selectedItem = state.items.find(
				(item) => item?.card?.info?.id === action?.payload?.card?.info?.id
			);

			if (selectedItem?.card?.info?.quantity) {
				// Item exists - increment quantity by 1
				selectedItem.card.info.quantity = (selectedItem?.card?.info?.quantity || 0) + 1;
			} else {
				// Item doesn't exist - add new item with quantity 1
				state.items.push({
					card: {
						...action?.payload?.card,
						info: {
							...action?.payload?.card?.info,
							quantity: 1, // Set initial quantity
						},
					},
				});
			}
		},

		/**
		 * Removes one quantity of an item from cart or removes item entirely if quantity becomes 0
		 * 
		 * @param state - Current cart state  
		 * @param action - Action containing the menu item to remove
		 */
		removeItem: (state, action: {payload: IDishCard}) => {
			// Find the item in cart using ID
			const selectedItem = state.items.find(
				item => item?.card?.info?.id === action?.payload?.card?.info?.id
			);
			
			if (selectedItem?.card?.info) {
				// Decrement quantity by 1 (minimum 0)
				selectedItem.card.info.quantity = (selectedItem?.card?.info?.quantity || 1) - 1;
			}
			
			// If quantity reaches 0, remove item from cart entirely
			if (selectedItem?.card?.info?.quantity === 0) {
				state.items = state.items.filter(
					item => item?.card?.info?.id !== action?.payload?.card?.info?.id
				);
			}
		},

		/**
		 * Clears all items from the cart
		 * 
		 * @param state - Current cart state
		 */
		clearCart: (state) => {
			// Reset items array to empty
			state.items.length = 0;
		},
	},
});

/**
 * Selector function to get specific item information from cart by ID
 * 
 * @param id - Menu item ID to search for
 * @returns Selector function that returns the cart item or undefined
 * 
 * @example
 * ```tsx
 * const itemInCart = useSelector(selectedItemInfo('item-123'));
 * const quantity = itemInCart?.card?.info?.quantity || 0;
 * ```
 */
export const selectedItemInfo = (id: string) => (state: RootState) => 
	state.cart.items.find((item: IDishCard) => item?.card?.info?.id === id) as IDishCard;

// Export action creators for use in components
export const { addItem, clearCart, removeItem } = CartSlice.actions;

// Export reducer for store configuration
export default CartSlice.reducer;