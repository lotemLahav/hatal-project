import { FC } from "react";
import { MyNavbar } from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
    return (
        <>
            <MyNavbar />
            <Outlet />
        </>
    );
};

export default Layout;

