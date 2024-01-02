import React from 'react';
import Routers from './Routes/AuthRoutes';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, AuthInit } from 'Utils/Helper/UseAuth';
import AnimationThemeProvider from 'Core/Helper/AnimationTheme/AnimationThemeProvider';
import CustomizerProvider from 'Core/Helper/Customizer/CustomizerProvider';
import CustomerProvider from 'Core/Helper/Customer/CustomerProvider';
import UserProvider from 'Core/Helper/User/UserProvider';

const App = () => (
  <CustomizerProvider>
      <AnimationThemeProvider>
        <AuthProvider>
          <AuthInit>
            <CustomerProvider> 
              <UserProvider>
                <Routers />
                <ToastContainer />
              </UserProvider>
            </CustomerProvider>
          </AuthInit>
        </AuthProvider>
      </AnimationThemeProvider>
  </CustomizerProvider>
);

export default App;
