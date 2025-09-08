import {createContext} from 'react'

/**
 * Type definition for User Context
 * 
 * Defines the shape of user-related data and functions available
 * throughout the application via React Context.
 * 
 * @interface IUserContextType
 * @property {string} loggedInUser - Current user's display name
 * @property {function} setUserName - Function to update the user's name
 */
export interface IUserContextType {
    loggedInUser: string;
    setUserName: (name: string) => void;
}

/**
 * React Context for User Authentication and Profile Management
 * 
 * Provides user authentication state and profile information throughout
 * the application. Used for displaying user name, managing login state,
 * and handling user preference updates.
 * 
 * Default Values:
 * - loggedInUser: "Kaustav" (demo user name)
 * - setUserName: No-op function (will be overridden by Provider)
 * 
 * @example
 * ```tsx
 * // In a component
 * const { loggedInUser, setUserName } = useContext(UserContext);
 * 
 * // Update user name
 * setUserName("New User Name");
 * ```
 */
export const UserContext = createContext<IUserContextType>({
    loggedInUser: "Kaustav", // Default demo user
    setUserName: () => {} // No-op function placeholder
});



