import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, } from "react-router-dom";
import HomePage from '../pages/HomePage';
import PrintTaskPage from '../pages/PrintTaskPage';
import TaskPage, { TASK_STORE_DEFAULT, TaskStoreType } from '../pages/TaskPage';
import Layout from './Layout';

export type StoreType = {
    task: TaskStoreType
}

export type PageType = {
    store: StoreType,
    setStore: (st: StoreType) => void
}

function AppRoutes() {
    let [store, setStore] = useState({
        task: TASK_STORE_DEFAULT
    })
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout store={store} setStore={setStore} />} >
                    <Route index element={<HomePage store={store} setStore={setStore} />} />
                    <Route path='tasks' element={<TaskPage store={store} setStore={setStore} />} />
                    <Route path='tasksprint' element={<PrintTaskPage store={store} setStore={setStore} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
