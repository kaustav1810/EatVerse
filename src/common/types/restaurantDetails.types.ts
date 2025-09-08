export interface IRestaurantMenuResponse {
	statusCode?: number;
	data?: IRestaurantMenuData;
	tid?: string;
	sid?: string;
	deviceId?: string;
	csrfToken?: string;
}

export interface IRestaurantMenuData {
	statusMessage?: string;
	cards?: IMenuCard[];
	firstOffsetRequest?: boolean;
	isQCLink?: boolean;
}

export interface IMenuCard {
	card?: {
		card?: IGenericCard;
	};
	groupedCard?: {
		cardGroupMap?: {
			REGULAR?: {
				cards?: IMenuCard[];
			};
		};
	};
}

export interface IGenericCard {
	'@type'?: string;
	text?: string;
	headerStyling?: IHeaderStyling;
	title?: string;
	subtitleSuffix?: Record<string, unknown>;
	image?: string;
	categoryId?: string;
	type?: string;
	itemCards?: IDishCard[];
	categories?: INestedCategory[];
	name?: string;
	area?: string;
	completeAddress?: string;
	badges?: Record<string, unknown>;
	vegOnlyDetails?: IVegOnlyDetails;
	offersFilter?: IFilterAttribute;
	topRatedFilter?: IFilterAttribute;
	kidsCategoryFilter?: IFilterAttributeWithTooltip;
	vegFilter?: IFilterAttribute;
	nonvegFilter?: IFilterAttribute;
	// Restaurant info properties
	info?: IRestaurantInfo;
}

// Restaurant info interface for the restaurant details card
export interface IRestaurantInfo {
	name?: string;
	areaName?: string;
	costForTwoMessage?: string;
	cuisines?: string[];
	sla?: {
		slaString?: string;
		deliveryTime?: number;
	};
}

export interface IHeaderStyling {
	textColor?: string;
	textVariant?: string;
}

export interface IVegOnlyDetails {
	imageId?: string;
	title?: string;
	description?: string;
}

export interface IFilterAttribute {
	attributes?: {
		displayText?: string;
	};
}

export interface IFilterAttributeWithTooltip
	extends IFilterAttribute {
	attributes?: {
		displayText?: string;
		tooltip?: {
			enabled?: boolean;
			displayText?: string;
		};
	};
}

export interface IDishCard {
	card?: {
		'@type'?: string;
		info?: IDishInfo;
		analytics?: Record<string, unknown>;
		hideRestaurantDetails?: boolean;
	};
}

export interface IDishInfo {
	id?: string;
	name?: string;
	category?: string;
	description?: string;
	quantity?: number;
	finalPrice?: number;
	imageId?: string;
	inStock?: number;
	isVeg?: number;
	price?: number;
	defaultPrice?: number;
	showImage?: boolean;
	type?: string;
	ribbon?: Record<string, unknown>;
	itemBadge?: Record<string, unknown>;
	badgesV2?: Record<string, unknown>;
	itemPriceStrikeOff?: boolean;
	itemAttribute?: {
		vegClassifier?: string;
		portionSize?: string;
	};
	variants?: Record<string, unknown>;
	variantsV2?: IVariantsV2;
	addons?: IAddonGroup[];
	ratings?: {
		aggregatedRating?: {
			rating?: string;
			ratingCount?: string;
			ratingCountV2?: string;
		};
	};
}

export interface IVariantsV2 {
	variantGroups?: IVariantGroup[];
	pricingModels?: IPricingModel[];
}

export interface IVariantGroup {
	groupId?: string;
	name?: string;
	variations?: IVariation[];
}

export interface IVariation {
	id?: string;
	name?: string;
	price?: number;
	default?: number;
	inStock?: number;
	isVeg?: number;
	isEnabled?: number;
}

export interface IPricingModel {
	variations?: {
		groupId?: string;
		variationId?: string;
	}[];
	price?: number;
	addonCombinations?: {
		groupId?: string;
		addonId?: string;
	}[];
}

export interface IAddonGroup {
	groupId?: string;
	groupName?: string;
	maxAddons?: number;
	maxFreeAddons?: number;
	choices?: IAddonChoice[];
}

export interface IAddonChoice {
	id?: string;
	name?: string;
	price?: number;
	inStock?: number;
	isVeg?: number;
	isEnabled?: number;
}

export interface INestedCategory {
	title?: string;
	itemCards?: IDishCard[];
	subtitleSuffix?: Record<string, unknown>;
	categoryId?: string;
}