import Taptop from './TapTop';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Loader } from 'Core/Components';
import React, { useEffect, Fragment } from 'react';
import { useContext } from 'react';
import CustomizerContext from 'Core/Helper/Customizer';
import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AnimationThemeContext from 'Core/Helper/AnimationTheme';
import ConfigDB from 'Utils/Config/ThemeConfig';

const AppLayout = ({ children, classNames, ...rest }) => {
  const location = useLocation();
  const { setMixLayout, sidebar_types } = useContext(CustomizerContext);
  const queryData = location?.search?.split('=')[1]?.toString();
  const settings1 = localStorage.getItem('sidebar_Settings') || ConfigDB.data.settings.sidebar_setting || queryData;
  const sidebar_types1 = localStorage.getItem('sidebar_types') || ConfigDB.data.settings.sidebar.type || sidebar_types;
  const { animation } = useContext(AnimationThemeContext);
  const animationTheme = localStorage.getItem('animation') || animation || ConfigDB.data.router_animation;
  const mixLayout = localStorage.getItem('mix_background_layout') || ConfigDB.data.color.mix_background_layout;

  useEffect(() => {
    if (mixLayout !== 'light-only') {
      setMixLayout(false);
    } else {
      setMixLayout(true);
    }
    ConfigDB.data.color.mix_background_layout = mixLayout;
    document.body.classList.add(mixLayout);
  }, [mixLayout, setMixLayout]);

  return (
    <Fragment>
      <Loader />
      <Taptop />
      <div className={`page-wrapper ${sidebar_types1} ${settings1}`} id='pageWrapper'>
        <Header />
        <div className='page-body-wrapper horizontal-menu'>
          <Sidebar />
          <TransitionGroup {...rest}>
            <CSSTransition key={location.key} timeout={100} classNames={animationTheme} unmountOnExit>
              <div className='page-body'>
                <Outlet />
              </div>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};
export default AppLayout;
