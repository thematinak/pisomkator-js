import React from 'react';
import { Routes, Route, BrowserRouter, } from "react-router-dom";
import HomePage from '../pages/HomePage';
import PrintExamePage from '../pages/PrintExamPage';
import ExercisesPage from '../pages/ExercisesPage';
import Layout from './Layout';

export const EXERCISES_PAGE_PATH  = '/exercises';
export const EXAM_PRINT_PAGE_PATH = '/exame_print';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<HomePage />} />
                    <Route path='exercises' element={<ExercisesPage />} />
                    <Route path='exame_print' element={<PrintExamePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
