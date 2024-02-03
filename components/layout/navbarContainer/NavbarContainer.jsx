import React, { useEffect, useState } from "react";
// Imports
import Navbar from "../navbar/navbar";
import Aside from "../Aside/Aside";

function NavbarContainer() {
    // Toggle between Navbar and Aside
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        // Check if the page width less than 920 to show Aside
        if (window.innerWidth < 920) {
            setShowNavbar(false);
        }
        // Add resize Event
        const WindowResizeListener = window.addEventListener("resize", () => {
            window.innerWidth < 920
                ? setShowNavbar(false)
                : setShowNavbar(true);
        });

        // Remove the Event when component Did Mount
        return () => {
            window.removeEventListener("resize", WindowResizeListener);
        };
    }, []);

    return showNavbar ? <Navbar /> : <Aside />;
}

export default NavbarContainer;
