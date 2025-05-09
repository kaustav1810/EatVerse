export interface IRestaurantResponse {
	restaurants?: IRestaurant[];
}

export interface IRestaurant {
	info?: IRestaurantInfo;
	analytics?: IAnalytics;
	cta?: ICta;
}

export interface IRestaurantInfo {
	id?: string;
	promoted?: boolean;
	name?: string;
	cloudinaryImageId?: string;
	locality?: string;
	areaName?: string;
	costForTwo?: string;
	cuisines?: string[];
	avgRating?: number;
	parentId?: string;
	avgRatingString?: string;
	totalRatingsString?: string;
	sla?: ISla;
	availability?: IAvailability;
	badges?: IBadges;
	isOpen?: boolean;
	type?: string;
	badgesV2?: IBadgesV2;
	aggregatedDiscountInfoV3?: IDiscountInfo;
	differentiatedUi?: IDifferentiatedUi;
	reviewsSummary?: Record<string, unknown>;
	displayType?: string;
	restaurantOfferPresentationInfo?: Record<
		string,
		unknown
	>;
	externalRatings?: IExternalRatings;
	ratingsDisplayPreference?: string;
	veg?: boolean;
	aggregatedDiscountInfoV2?: Record<
		string,
		unknown
	>;
}

export interface ISla {
	deliveryTime?: number;
	lastMileTravel?: number;
	serviceability?: string;
	slaString?: string;
	lastMileTravelString?: string;
	iconType?: string;
}

export interface IAvailability {
	nextCloseTime?: string;
	opened?: boolean;
}

export interface IBadges {
	imageBadges?: IBadgeImage[];
	textExtendedBadges?: ITextBadge[];
}

export interface IBadgeImage {
	imageId?: string;
	description?: string;
}

export interface ITextBadge {
	iconId?: string;
	shortDescription?: string;
	fontColor?: string;
}

export interface IBadgesV2 {
	entityBadges?: {
		imageBased?: {
			badgeObject?: IBadgeObject[];
		};
		textBased?: Record<string, unknown>;
		textExtendedBadges?: {
			badgeObject?: IBadgeExtendedObject[];
		};
	};
}

export interface IBadgeObject {
	attributes?: {
		description?: string;
		imageId?: string;
	};
}

export interface IBadgeExtendedObject {
	attributes?: {
		description?: string;
		fontColor?: string;
		iconId?: string;
		shortDescription?: string;
	};
}

export interface IDiscountInfo {
	header?: string;
	subHeader?: string;
	discountTag?: string;
}

export interface IDifferentiatedUi {
	displayType?: string;
	differentiatedUiMediaDetails?: {
		lottie?: Record<string, unknown>;
		video?: Record<string, unknown>;
	};
}

export interface IExternalRatings {
	aggregatedRating?: {
		rating?: string;
		ratingCount?: string;
	};
	source?: string;
	sourceIconImageId?: string;
}

export interface IAnalytics {
	context?: string;
}

export interface ICta {
	link?: string;
	type?: string;
}
