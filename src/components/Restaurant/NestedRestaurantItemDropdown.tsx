import type { INestedCategory } from '../../common/types/restaurantDetails.types';


interface INestedRestaurantItemDropdown {
	category: INestedCategory;
	isOpenAccordion: Array<boolean>;
	handleAccordion: (index: number) => void;
	index: number;
}
export const NestedRestaurantItemDropdown = ({
	category,
	isOpenAccordion,
    handleAccordion,
    index
}:INestedRestaurantItemDropdown) => {
	return (
		<div
			className='flex flex-col px-2'
			onClick={() => handleAccordion(index)}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					handleAccordion(index);
				}
			}}
			tabIndex={0}
			role="button"
			aria-expanded={isOpenAccordion[index]}
			aria-label={`${isOpenAccordion[index] ? 'Collapse' : 'Expand'} ${category.title} submenu`}>
			<div className='flex justify-between cursor-pointer my-4'>
				<h4
					className={`font-semibold ${
						isOpenAccordion[index] &&
						' border-b-slate-200 border-b-2 pb-2'
					}`}>{`${category?.title} (${category?.itemCards?.length})`}</h4>
				<span>
					{!isOpenAccordion[index] ? '⬇' : '⬆'}
				</span>
			</div>
			{isOpenAccordion[index] && (
				<div
					className={`bg-slate-200 h-[2px]`}></div>
			)}
		</div>
	);
};
