import React from 'react';

import { Outlet } from 'react-router-dom';
import { Col, Row } from './FormItems';
import Nav from './Nav';

function Layout() {
    return (
        <div className='container card'>
            <div className='card-body'>
                <Row className='row'>
                    <Col size={2} addClassName='print-hide'>
                        <Nav />
                    </Col>
                    <Col>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Layout;