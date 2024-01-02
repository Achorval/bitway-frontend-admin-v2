import {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext
} from 'react';
import authHelper from './AuthHelpers';
import { getAdminByToken } from './AssetHelpers';
import LayoutSplashScreen from 'Core/Components/Loader';

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentAdmin: undefined,
  setCurrentAdmin: () => {},
  logout: () => {},
}

const AuthContext = createContext(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(authHelper.getToken());
  const [currentAdmin, setCurrentAdmin] = useState(undefined);
  const saveAuth = (auth) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.clearAppStorage();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentAdmin(undefined);
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentAdmin, setCurrentAdmin, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit = ({children}) => {
  const didRequest = useRef(false);
  const { auth, logout, setCurrentAdmin } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestAdmin = async (accessToken) => {
      try {
        if (!didRequest.current) {
          const adminData = await getAdminByToken(accessToken);
          if (adminData) {
            setCurrentAdmin(adminData.details);
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true)
    }

    if (auth) {
      requestAdmin(auth)
    } else {
      logout();
      setShowSplashScreen(false);
    }
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthProvider, AuthInit, useAuth }