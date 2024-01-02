import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { LI, UL } from 'Core/Components';
import { LogOut } from 'react-feather';

const SidebarFooter = () => {

  return (
    <Fragment>
      <UL attrUL={{ className: 'nav-footer' }}>
        <LI attrLI={{ className: 'dropdown' }}>
          <Link to='/logout' className='nav-link menu-title'>
            <LogOut size={24} />
            <span>Logout</span>
          </Link>
        </LI>
      </UL>
    </Fragment>
  );
};
export default SidebarFooter;
