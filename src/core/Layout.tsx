import React from 'react';

import { Outlet } from 'react-router-dom';
import { PageType } from './AppRoutes';
import Nav from './Nav';

function Layout(pageData: PageType) {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-3 text-left'>
                    <Nav />
                </div>
                <div className='col'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;