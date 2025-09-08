import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png';
import { useSelector } from 'react-redux';
import type { ICartInitialState } from '../../common/types/common.types';

export default function NavBar() {


	const cart = useSelector((store:ICartInitialState) => store.cart.items)
	
  return (
		<div className='flex justify-between items-center bg-slate-300 cursor-pointer'>
			<Link to='/home' className='flex justify-between items-center'>
				<img
					className='h-16 w-16 m-2.5'
					src={logo}
					alt=''
					/>
				<span>Swiggy</span>
			</Link>
			<div>
				<ul className='flex justify-evenly list-none items-center'>
					<li className='cursor-pointer p-4'>
						<Link to='/home'>Home</Link>
					</li>
					<li className='cursor-pointer p-4'>
						<Link to='/about'>About</Link>
					</li>
					<li className='cursor-pointer p-4'>
						<Link to='/contact'>Contact Us</Link>
					</li>
					<li className='cursor-pointer p-4'>
					  <Link to='/cart'>Cart { `(${cart.length})`}</Link>
					</li>
					<li className='cursor-pointer p-4'>
						<Link to='/grocery'>Grocery</Link>
				  </li>
				</ul>
			</div>
		</div>
	);
}
