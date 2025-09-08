import React from 'react';
import { Link } from 'react-router-dom';
import { RESTAURANT_IMAGE_URL } from '../../common/constants/ApiConstants';
import type { IRestaurant } from '../../common/types/restaurant.types';

/**
 * Props interface for the Restaurant component
 * 
 * @interface RestaurantProps
 * @property {IRestaurant} restaurant - Restaurant data object containing info, analytics, and CTA data
 */
interface RestaurantProps {
	restaurant: IRestaurant;
}

/**
 * Restaurant Card Component
 * 
 * Displays a single restaurant as a clickable card with image, name, rating,
 * cuisine types, and location. Includes accessibility features and responsive design.
 * 
 * Features:
 * - Hover animations with CSS transforms
 * - Lazy loading for images
 * - Semantic HTML with proper ARIA labels
 * - Discount information display
 * - Promoted restaurant indicator
 * 
 * @param {RestaurantProps} props - Component props
 * @returns {JSX.Element} Restaurant card component
 */
const Restaurant = ({
	restaurant,
}: RestaurantProps) => {
	return (
		<article className='m-3 p-1 w-52 break-words transform transition-transform duration-200 hover:scale-90'>
			{restaurant?.info?.promoted && <span className="sr-only">Promoted restaurant</span>}
			<Link
				className='no-underline font-black block'
				to={`/restaurant/${restaurant?.info?.id}`}
				aria-label={`View details for ${restaurant?.info?.name}`}>
				<div className='mb-1 font-light'>
					<img
						className='w-full h-36 rounded-2xl object-cover filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-[linear-gradient(to_bottom,_rgba(0,0,0,0)_20%,_rgba(0,0,0,1))]'
						src={`${RESTAURANT_IMAGE_URL}${restaurant?.info?.cloudinaryImageId}`}
						alt={`${restaurant?.info?.name} restaurant`}
						loading="lazy"
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
		</article>
	);
}

const PromotedRestaurant = (WrappedComponent: React.ComponentType<RestaurantProps>) => {
	return function PromotedComponent(props: RestaurantProps) {
		return (
			<>
				<span className='sr-only' aria-label="Promoted restaurant">promoted</span>
				<WrappedComponent {...props} />
			</>
		);
	};
};

export { PromotedRestaurant, Restaurant };
