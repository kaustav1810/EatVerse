interface Dish {
	'@type': string;
	info: DishInfo;
	hideRestaurantDetails: boolean;
}

interface DishInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  imageId: string;
  inStock: number;
  isVeg: number;
  price: number;
  variants: Record<string, unknown>;
  variantsV2: Record<string, unknown>;
  addons: AddonGroup[];
  itemAttribute: ItemAttribute;
  defaultPrice: number;
  ribbon: Record<string, unknown>;
  showImage: boolean;
  offerTags: OfferTag[];
  itemBadge: Record<string, unknown>;
  badgesV2: Record<string, unknown>;
  ratings: Ratings;
  itemPriceStrikeOff: boolean;
  offerIds: string[];
  finalPrice: number;
  quantity?: number;
}

interface AddonGroup {
	groupId: string;
	groupName: string;
	choices: Choice[];
	maxAddons: number;
	maxFreeAddons: number;
}

interface Choice {
	id: string;
	name: string;
	price: number;
	inStock: number;
	isVeg?: number;
	isEnabled: number;
}

interface ItemAttribute {
	vegClassifier: string;
}

interface OfferTag {
	title: string;
	subTitle: string;
	textColor: string;
	backgroundColor: string;
	matchText: string;
}

interface Ratings {
	aggregatedRating: AggregatedRating;
}

interface AggregatedRating {
	rating: string;
	ratingCount: string;
	ratingCountV2: string;
}

interface MenuItem {
	card: Dish;
}

interface ICartInitialState{
        cart: {
            
            items: MenuItem[]
        }
}

export type {
	Dish,
	DishInfo,
	AddonGroup,
	Choice,
	ItemAttribute,
	OfferTag,
	Ratings,
	AggregatedRating,
	MenuItem,
	ICartInitialState
};