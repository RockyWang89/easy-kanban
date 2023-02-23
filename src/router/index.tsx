import React, {ReactElement, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/user/usersSlice";

function lazyLoad(path: string): ReactElement {
    const LazyComponent = React.lazy(()=>import(`../${path}`));
    return (
        <Suspense fallback="Loading...">
            <LazyComponent />
        </Suspense>
    );
}

function AppRouter() {
    const currentUser = useSelector(getCurrentUser);

    function routeGuard(path: string): ReactElement {
        return currentUser?lazyLoad(path):<Navigate to="/login" />
    }

    return (
        <Routes>
            <Route path="/kanban" element={routeGuard('features/Home')}>
                <Route path="create-task" element={routeGuard('features/kanban/CreateTask')} />
                <Route path="edit-task/:taskId" element={routeGuard('features/kanban/EditTask')} />
                <Route path="" element={routeGuard('features/kanban/Kanban')}>
                    <Route path="todo" element={routeGuard('features/kanban/ToDo')} />
                    <Route path="doing" element={routeGuard('features/kanban/Doing')} />
                    <Route path="done" element={routeGuard('features/kanban/Done')} />
                    <Route path="archived" element={routeGuard('features/kanban/Archived')} />
                    <Route index element={<Navigate to='todo' />}/>
                </Route>
            </Route>
            <Route path="/login" element={lazyLoad('features/user/Login')} />
            <Route path="*" element={<Navigate to='/kanban' />} />
        </Routes>
    )
}

export default AppRouter;