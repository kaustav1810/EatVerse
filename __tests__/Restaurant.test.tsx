import { render, screen } from "@testing-library/react";
import { PromotedRestaurant, Restaurant } from "../src/components/Restaurant/Restaurant";
import data from '../src/api/mock/restaurantlist.json';
import type { IRestaurant } from "../src/common/types/restaurant.types";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { NestedRestaurantItemDropdown } from "../src/components/Restaurant/NestedRestaurantItemDropdown";
import { RestaurantItem } from "../src/components/Restaurant/RestaurantItem";
import { RestaurantDetails } from "../src/components/Restaurant/RestaurantDetails";
import menuItems from '../src/api/mock/restaurantMenuItems.json';
import { RestaurantItemDropdown } from "../src/components/Restaurant/RestaurantItemDropdown";

let restaurantInfo;

beforeAll(() => {
      restaurantInfo = data?.data
				?.cards?.[1]?.card?.card?.gridElements
				?.infoWithStyle
				?.restaurants?.[0] as IRestaurant;
})

it('Should show restaurant rating and delivery time', async () => {
    
   
    render(
        <Provider store={store}>
                    <BrowserRouter>
			<Restaurant restaurant={restaurantInfo} />
            </BrowserRouter>
        </Provider>
    );
    
    const ratingSlaString = await screen.findByText(/^.(\d+(?:\.\d+)?)\.(\d+)-(\d+)\smins$/)

    expect(ratingSlaString).toBeInTheDocument();
});

it('Should validate promoted restaurant label', async () => {
    
    const RestPromoted = PromotedRestaurant(
			Restaurant
		);

    
    render(
			<Provider store={store}>
				<BrowserRouter>
					<RestPromoted
					restaurant={restaurantInfo}
				/>
				</BrowserRouter>
			</Provider>
    );
    

    const promotedLabel = await screen.findByText('promoted');
    const testLabel = await screen.findByText('Kaustav');

    expect(promotedLabel).toBeInTheDocument();
    expect(testLabel).toBeInTheDocument();
})