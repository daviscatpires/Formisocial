// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

interface User {
  _id: string;
  fullName: string;
  // ... outros campos
}

interface UserContextProps {
    userId: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
    token: string | null;
  }

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [tokenChecked, setTokenChecked] = useState(false);
  
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken) as { userId: string };
          setUserId(decodedToken.userId);
          setToken(storedToken);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
      // Indicate that the token has been checked
      setTokenChecked(true);
    }, []);

    return (
        <UserContext.Provider value={{ userId, setUserId, token }}>
          {children}
        </UserContext.Provider>
      );
    };

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
