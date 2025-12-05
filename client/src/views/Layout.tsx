import { FC } from "react";
import { MyNavbar } from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout: FC = () => {
    const { pathname } = useLocation();

    const hideNavbar = pathname === "/" || pathname === "/signUp";

    return (
        <>
            {!hideNavbar && <MyNavbar />}
            <Outlet />
        </>
    );
};

export default Layout;

