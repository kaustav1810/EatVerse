import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png';
import { useSelector } from 'react-redux';
import type { ICartInitialState } from '../../common/types/common.types';

export default function NavBar() {


	const cart = useSelector((store:ICartInitialState) => store.cart.items)
	
  return (
		<nav className='flex justify-between items-center bg-slate-300' role="navigation" aria-label="Main navigation">
			<Link to='/home' className='flex justify-between items-center' aria-label="Go to home page">
				<img
					className='h-16 w-16 m-2.5'
					src={logo}
					alt='Swiggy logo'
					/>
				<span>Swiggy</span>
			</Link>
			<div>
				<ul className='flex justify-evenly list-none items-center' role="menubar">
					<li role="none">
						<Link to='/home' className='cursor-pointer p-4 block' role="menuitem">Home</Link>
					</li>
					<li role="none">
					  <Link to='/cart' className='cursor-pointer p-4 block' role="menuitem" aria-label={`Cart with ${cart.length} items`}>
						  Cart ({cart.length})
					  </Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
