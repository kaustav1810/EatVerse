import React, {
	useCallback,
	useState,
} from 'react';
import { RestaurantItemDropdown } from './RestaurantItemDropdown';
import { NestedRestaurantItemDropdown } from './NestedRestaurantItemDropdown';
import type { IGenericCard, IMenuCard } from '../../common/types/restaurantDetails.types';

export const RestaurantItem = ({
	item,
}: {
	item: IMenuCard;
}) => {
	const [
		isOpenMainAccordion,
		setIsOpenMainAccordion,
	] = useState(false);

	const [isOpenAccordion, setIsOpenAccordion] =
		useState<boolean[]>([]);

	const handleAccordion = useCallback(
		(index: number) => {
			setIsOpenAccordion(
				(previsOpenAccordion) => {
					const newIsOpenAccordion = [
						...previsOpenAccordion,
					];
					newIsOpenAccordion[index] =
						!previsOpenAccordion[index];
					return newIsOpenAccordion;
				}
			);
		},
		[setIsOpenAccordion]
	);

	const handleMainAccordion = useCallback(() => {
		setIsOpenMainAccordion((prev) => !prev);
	}, []);

	const isNestedCategory = item?.card?.card?.[
		'@type'
	]?.includes('.NestedItemCategory');

	return (
		<div className='my-4 bg-gray-50 p-6'>
			<div
				className={`flex justify-between ${
					!isNestedCategory && 'cursor-pointer'
				}`}
				onClick={handleMainAccordion}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						handleMainAccordion();
					}
				}}
				tabIndex={!isNestedCategory ? 0 : -1}
				role="button"
				aria-expanded={isOpenMainAccordion}
				aria-label={`${isOpenMainAccordion ? 'Collapse' : 'Expand'} ${item?.card?.card?.title} menu section`}>
				<h3 className='font-bold'>{`${
					item?.card?.card?.title
				} ${
					!isNestedCategory
						? `(${item?.card?.card?.itemCards?.length})`
						: ''
				}`}</h3>
				{!isNestedCategory && (
					<span>
						{!isOpenMainAccordion ? '⬇' : '⬆'}
					</span>
				)}
			</div>

			{isNestedCategory
				? item?.card?.card?.categories?.map(
						(category, i) => {
							return (
								<div key={i}>
									<NestedRestaurantItemDropdown
										category={category}
										isOpenAccordion={
											isOpenAccordion
										}
										handleAccordion={
											handleAccordion
										}
										index={i}
									/>
									{isOpenAccordion[i] && (
										<RestaurantItemDropdown
											item={category}
										/>
									)}
								</div>
							);
						}
				  )
				: isOpenMainAccordion && (
						<RestaurantItemDropdown
							item={item?.card?.card as IGenericCard}
						/>
				  )}
		</div>
	);
};


