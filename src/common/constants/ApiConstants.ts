/**
 * API Constants for Swiggy Clone Application
 * 
 * This file contains all the API endpoints and CDN URLs used throughout the application.
 * These constants should be moved to environment variables in production.
 */

/**
 * Base URL for fetching detailed restaurant information including menu items
 * 
 * Query Parameters:
 * - page-type: REGULAR_MENU for complete menu data
 * - complete-menu: true to get full menu with categories
 * - lat/lng: Latitude and longitude for location-based results (Kolkata coordinates)
 * - restaurantId: To be appended when making the API call
 * 
 * @example
 * ```typescript
 * const restaurantData = await fetch(`${RESTAURANT_DETAILS_URL}123456`);
 * ```
 */
const RESTAURANT_DETAILS_URL = 'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.51800&lng=88.38320&restaurantId=';

/**
 * Base URL for fetching list of available restaurants
 * 
 * Query Parameters:
 * - lat/lng: Latitude and longitude for location-based results (Kolkata coordinates)
 * - is-seo-homepage-enabled: true for optimized homepage data
 * - page_type: DESKTOP_WEB_LISTING for web-optimized response format
 * 
 * Returns: Array of restaurants with basic info, ratings, cuisine types, etc.
 */
const RESTAURANT_LIST_URL = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.51800&lng=88.38320&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

/**
 * CDN URL for restaurant and menu item images
 * 
 * Image Transformations:
 * - fl_lossy: Lossy compression for smaller file sizes
 * - f_auto: Automatic format selection (WebP, JPEG, etc.)
 * - q_auto: Automatic quality optimization
 * - w_660: Fixed width of 660px for consistent sizing
 * 
 * @example
 * ```typescript
 * const imageUrl = `${RESTAURANT_IMAGE_URL}${cloudinaryImageId}`;
 * ```
 */
const RESTAURANT_IMAGE_URL = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/';

// Export all constants for use in components and hooks
export {
    RESTAURANT_DETAILS_URL,
    RESTAURANT_IMAGE_URL,
    RESTAURANT_LIST_URL
};