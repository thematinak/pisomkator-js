import React from 'react';
import { Routes, Route, BrowserRouter, } from "react-router-dom";
import HomePage from '../pages/HomePage';
import PrintTaskPage from '../pages/PrintTaskPage';
import TaskPage from '../pages/TaskPage';
import Layout from './Layout';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<HomePage />} />
                    <Route path='tasks' element={<TaskPage />} />
                    <Route path='tasksprint' element={<PrintTaskPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
