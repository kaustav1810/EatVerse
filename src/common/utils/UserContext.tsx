import {createContext} from 'react'

// Define the context type
export interface IUserContextType {
    loggedInUser: string;
    setUserName: (name: string) => void;
}

// Create context with proper typing
export const UserContext = createContext<IUserContextType>({
    loggedInUser: "Kaustav",
    setUserName: () => {}
});



