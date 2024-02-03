import React from "react";
import NavbarContainer from "./navbarContainer/NavbarContainer";
// import Footer from "./footer/Footer";
import OverLay from "./Overlay/OverLay";
import { useSelector } from "react-redux";

// Under Update
import NavbarV2 from "./NavbarV2/NavbarV2";
import UserInfo_Mobile from "./UserInfo_Mobile/UserInfo_Mobile";
import FooterV2 from "./FooterV2/FooterV2";

function Layout({ children, user, isAuthenticated }) {
    const { showOverlay } = useSelector((state) => state.Layout);

    return (
        <>
            {/* <NavbarContainer /> */}
            <NavbarV2 isAuthenticated={isAuthenticated} user={user} />
            <UserInfo_Mobile isAuthenticated={isAuthenticated} user={user} />
            {children}
            <FooterV2 />
            {/*<Footer/>*/}
            {showOverlay && <OverLay />}
        </>
    );
}

export default Layout;
