import React, {ReactElement, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

function lazyLoad(path: string): ReactElement {
    const LazyComponent = React.lazy(()=>import(`../${path}`));
    return (
        <Suspense fallback="Loading...">
            <LazyComponent />
        </Suspense>
    );
}

function AppRouter() {
    return (
        <Routes>
            <Route path="/kanban" element={lazyLoad('features/kanban/Kanban')}>
                <Route path="todo" element={lazyLoad('features/kanban/ToDo')} />
                <Route path="doing" element={lazyLoad('features/kanban/Doing')} />
                <Route path="done" element={lazyLoad('features/kanban/Done')} />
                <Route index element={<Navigate to='todo' />}/>
            </Route>
            <Route path="/login" element={lazyLoad('features/user/Login')} />
            <Route path="*" element={<Navigate to='/kanban' />} />
        </Routes>
    )
}

export default AppRouter;