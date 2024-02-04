import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IUser from './models/user';
import { StorageUserKey } from '../../utils/constants';

interface AuthState {
  user: IUser | null;
  token: string;
}

interface AuthAction {
  type: 'SIGN_IN' | 'SIGN_OUT';
  payload?: { user?: IUser; token?: string };
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialState: AuthState = {
  user: null,
  token: "",
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      // Update state
      const newState = { ...state, user: action.payload?.user || null, token: action.payload?.token || "" };
      // Save to AsyncStorage
      AsyncStorage.setItem(StorageUserKey, JSON.stringify(newState));
      return newState;

    case 'SIGN_OUT':
      // Clear AsyncStorage
      AsyncStorage.removeItem(StorageUserKey);
      return initialState;

    default:
      return state;
  }
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load data from AsyncStorage on component mount
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const savedAuthData = await AsyncStorage.getItem(StorageUserKey);
        if (savedAuthData) {
          const parsedAuthData = JSON.parse(savedAuthData);
          dispatch({ type: 'SIGN_IN', payload: parsedAuthData });
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
      }
    };

    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
