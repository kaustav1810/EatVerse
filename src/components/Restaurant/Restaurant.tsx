import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { RESTAURANT_IMAGE_URL } from '../../common/constants/ApiConstants';
import type { IRestaurant } from '../../common/types/restaurant.types';

interface RestaurantProps {
	restaurant: IRestaurant;
}

 const Restaurant  = ({
	restaurant,
}: RestaurantProps) => {
	return (
		<div className='m-3 p-1 cursor-pointer w-52 break-words transform transition-transform duration-200 hover:scale-90'>
			{restaurant?.info?.promoted && <div>Kaustav</div>}
			<Link
				className='no-underline font-black'
				to={`/restaurant/${restaurant?.info?.id}`}>
				<div className='mb-1 font-light'>
					<img
						className='w-full h-36 rounded-2xl object-cover filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-[linear-gradient(to_bottom,_rgba(0,0,0,0)_20%,_rgba(0,0,0,1))]'
						src={`${RESTAURANT_IMAGE_URL}${restaurant?.info?.cloudinaryImageId}`}
						alt=''
					/>
					{restaurant?.info
						?.aggregatedDiscountInfoV3 && (
						<span className='relative z-[100] font-bold text-white -top-[25px] left-[10px]'>
							{`${restaurant?.info?.aggregatedDiscountInfoV3?.header} ${restaurant?.info?.aggregatedDiscountInfoV3?.subHeader}`}
						</span>
					)}
				</div>
				<div className='font-[800]'>
					{restaurant?.info?.name}
				</div>
				<div className='font-[400]'>{`★${restaurant?.info?.avgRatingString}.${restaurant?.info?.sla?.slaString}`}</div>
				<div className='font-[200] text-gray-500'>
					{restaurant?.info?.cuisines?.join(',')}
				</div>
				<div className='font-[300]'>{`${restaurant?.info?.locality},${restaurant?.info?.areaName}`}</div>
			</Link>
		</div>
	);
}

const PromotedRestaurant = (WrappedComponent: React.ComponentType<any>) => {
	return (props: any) => {
		return (
			<>
				<label>promoted</label>
				<WrappedComponent {...props} />
			</>
		);
	}
};

export { PromotedRestaurant, Restaurant };