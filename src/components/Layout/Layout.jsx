import { Suspense } from "react";
import { Outlet } from 'react-router-dom';

import { LoaderRoute } from "../Loader/Loader";
import { AppBar } from "../AppBar/AppBar";

export const Layout = () => {
    return <div style={{ padding: "0 25px"}}>
        <AppBar />
        <Suspense fallback={<LoaderRoute />}>
            <Outlet />
        </Suspense>
    </div>
}