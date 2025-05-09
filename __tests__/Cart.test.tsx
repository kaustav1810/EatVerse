import { fireEvent, render, screen } from "@testing-library/react";
import  { Provider } from "react-redux";
import  { BrowserRouter } from "react-router-dom";
import { store } from "../src/app/store";
import NavBar from "../src/components/NavBar/NavBar";
import { Cart } from "../src/components/Cart";

it('Should show empty cart', async () => {
    
      render(
				<Provider store={store}>
					<BrowserRouter>
						<NavBar />
					</BrowserRouter>
				</Provider>
      );
    
    const cart = await screen.findByText(/^Cart \(([0-9]+)\)$/)
    
    expect(cart).toBeInTheDocument()
    
  // await fireEvent.click(cart);
  
  render(
				<Provider store={store}>
      <Cart />
      </Provider>
  )
    
    const emptyCartMsg = await screen.findByText(
			/^No items in cart. Start adding some!!$/
		);

  expect(emptyCartMsg).toBeInTheDocument();
})