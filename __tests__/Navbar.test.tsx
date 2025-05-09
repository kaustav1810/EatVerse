
import { render, screen } from '@testing-library/react'
import NavBar from '../src/components/NavBar/NavBar';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
    render(
			<Provider store={store}>
				<BrowserRouter>
					<NavBar />
				</BrowserRouter>
			</Provider>
		);
})

it('Should render brand', async() => {
    
    const brand = await screen.findByText(/Swiggy/);

    expect(brand).toBeInTheDocument()
});

it('Should render cart', async() => {
    
    const cart = await screen.findByText(/^Cart \(([0-9]+)\)$/)

    expect(cart).toBeInTheDocument()
})