import React from "react";
import classes from "./navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { ToggleNavbarOptions } from "../../../redux/slices/LayoutSlice";
// IMPORTS
import Image from "next/image";

// Imports
import CheckButton from "../CheckButton/CheckButton";

function Navbar() {

    // Initialize router
    const router = useRouter();

    // Initialize Redux Action Sender
    const dispatch = useDispatch();
    // get the state of overlay and options menu from redux store
    const { showOverlay, showNavbarOptions } = useSelector(
        (state) => state.Layout
    );

    return (
        <nav className={classes.Navbar}>
            <div className={classes.Navbar__left}>
             <Link href={'/'}><a className={classes.Navbar__Logo}>AMB</a></Link>
            </div>
            <div className={classes.Navbar__right}>
                <ul className={classes.Navbar__List}>
                    <li>
                        <Link href={"/"}>
                            <a
                                title="Home"
                                className={
                                    router.pathname == "/"
                                        ? classes.Link__Active
                                        : ""
                                }
                            >
                                Home
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/about"}>
                            <a
                                title="About"
                                className={
                                    router.pathname == "/about"
                                        ? classes.Link__Active
                                        : ""
                                }
                            >
                                About
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/portfolio"}>
                            <a
                                className={
                                    router.pathname == "/portfolio"
                                        ? classes.Link__Active
                                        : ""
                                }
                                title="Portfolio"
                            >
                                Portfolio
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/blog"}>
                            <a
                                title="Blog"
                                className={
                                    router.pathname == "/blog"
                                        ? classes.Link__Active
                                        : ""
                                }
                            >
                                Blog
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/contact"}>
                            <a
                                title="Contact"
                                className={
                                    router.pathname == "/contact"
                                        ? classes.Link__Active
                                        : ""
                                }
                            >
                                Contact
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/admin/dashboard"}>
                            <a
                                title="Dashboard"
                                className={
                                    router.pathname == "/admin/dashboard"
                                        ? classes.Link__Active
                                        : ""
                                }
                            >
                                Dashboard
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div
                onClick={() => dispatch(ToggleNavbarOptions())}
                className={classes.Navbar__Avatar}
            >
                <Image
                    width={36}
                    height={36}
                    src={"/Images/Avatar.jpg"}
                    alt="User Avatar"
                />
            </div>
            <div className={classes.Navbar__Login}>
                <button>
                    <span>Login</span>
                </button>
            </div>
            <div
                className={[
                    classes.Navbar__Options,
                    (showOverlay &&
                        showNavbarOptions) &&
                        classes.Navbar__Options__Active,
                ].join(" ")}
            >
                <h3>OPTIONS</h3>
                {/* Option Buttons */}
                <div className={classes.ButtonsContainer}>
                    <CheckButton iconName={"moon.svg"} iconName2={"sun.svg"} />
                    <CheckButton iconName={"Eg.jpg"} iconName2={"Uk.jpg"} />
                </div>
                <span className={classes.Beauty_Span}></span>
                <span className={classes.Beauty_Span}></span>
                <span className={classes.Beauty_Span}></span>
                <span className={classes.Beauty_Span}></span>
            </div>
        </nav>
    );
}

export default Navbar;
