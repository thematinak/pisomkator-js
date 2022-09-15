import React from 'react';
import { Routes, Route, BrowserRouter, } from "react-router-dom";
import App from '../App';
import Layout from './Layout';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<App />} />
                    <Route path="a" element={<App />} />
                    <Route path="b" element={<App />} />
                    <Route path="c" element={<App />} />
                    <Route path="d" element={<App />} />
                    <Route path="*" element={<App />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
