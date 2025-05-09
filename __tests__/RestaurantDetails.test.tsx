import { Provider } from 'react-redux';
import { RestaurantDetails } from '../src/components/Restaurant/RestaurantDetails';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/app/store';
import menuItems from '../src/api/mock/restaurantMenuItems.json';
import restaurantDetails from '../src/api/mock/restaurantDetails.json';
import {
	fireEvent,
	render,
	screen,
} from '@testing-library/react';
import NavBar from '../src/components/NavBar/NavBar';

global.fetch = jest.fn(() => {
	return Promise.resolve({
		json: jest.fn(() =>
			Promise.resolve(restaurantDetails)
		),
	} as unknown as Response);
});

let addToCartButton;

let title;

beforeEach(async () => {
	render(
		<Provider store={store}>
			<BrowserRouter>
			<NavBar/>
				<RestaurantDetails
					menuItems={menuItems}
				/>
			</BrowserRouter>
		</Provider>
	);

	 title = await screen.findByText(
		/Classic/
	);

	expect(title).toBeInTheDocument();

	fireEvent.click(title);
	
});

it('Should display restaurant menu items', async () => {


	const itemTitle = await screen.findByText(
		/Deluxe Veggie Pizza/
	);

	expect(itemTitle).toBeInTheDocument();


});

it('Should validate add to cart button', async () => {


	addToCartButton = await screen.findByRole(
		'button',
		{ name: 'Add' }
	);

	expect(addToCartButton).toBeInTheDocument();
});

const addFirstItem = async () => {
	
	addToCartButton = await screen.findByRole(
		'button',
		{ name: 'Add' }
	);

	expect(addToCartButton).toBeInTheDocument();

	fireEvent.click(addToCartButton);

	addToCartButton = screen.queryByRole('button', {
		name: 'Add',
	});

	expect(addToCartButton).not.toBeInTheDocument();

	let itemQuantity = screen.queryAllByTestId(
		'item-quantity'
	);

	expect(itemQuantity.length).toBeGreaterThan(0);

	const plusButton = await screen.findByText('+');

	expect(plusButton).toBeInTheDocument();

	itemQuantity = screen.queryAllByTestId(
		'item-quantity'
	);

	expect(itemQuantity[0]).toHaveTextContent('1');

	return { plusButton, itemQuantity };
};

it('Should validate add cart items', async () => {

	let { plusButton, itemQuantity } =
		await addFirstItem();

	fireEvent.click(plusButton);

	itemQuantity = await screen.queryAllByTestId(
		'item-quantity'
	);

	expect(itemQuantity[0]).toHaveTextContent('2');

	const cart = await screen.findByText(
		/^Cart \(1\)$/
	);

	expect(cart).toBeInTheDocument();
});

it('Should validate remove cart items', async () => {


	let itemQuantity =
		await screen.queryAllByTestId(
			'item-quantity'
		);

	const minusButton = await screen.findByText(
		'-'
	);

	expect(minusButton).toBeInTheDocument();

	fireEvent.click(minusButton);
	
	itemQuantity = await screen.queryAllByTestId(
		'item-quantity'
	);
	
	expect(itemQuantity[0]).toHaveTextContent('1');
	
	fireEvent.click(minusButton);

	itemQuantity = await screen.queryAllByTestId(
		'item-quantity'
	);

	expect(itemQuantity.length).toBe(0);

	addToCartButton = await screen.findByRole(
		'button',
		{
			name: 'Add',
		}
	);

	expect(addToCartButton).toBeInTheDocument();

	const cart = await screen.findByText(
		/^Cart \(0\)$/
	);

	expect(cart).toBeInTheDocument();
});
