import React from "react";
import classes from "./Aside.module.scss";
// IMPORTS
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// Actions
import { ToggleAside } from "../../../redux/slices/LayoutSlice";
// Components
import CheckButton from "../CheckButton/CheckButton";

function Aside() {
    // Router to change the Active Link
    const router = useRouter();
    // Show and Hide the Aside
    const changeAsideState = () => {
        dispatch(ToggleAside());
    };
    // Initialize the dispatch
    const dispatch = useDispatch();
    // Get the Aside State from redux Store
    const {showOverlay, showAside} = useSelector(state => state.Layout);


    return (
        <aside className={classes.Aside}>
            {/* LOGO */}
            <Link href={"/"}>
                <a className={classes.Aside_Logo}>AMB</a>
            </Link>
            {/* ICON */}
            <div className={classes.Aside_Menu} onClick={changeAsideState}>
                <Image
                    src={"/Images/icons/menu.svg"}
                    alt="Menu"
                    width={30}
                    height={30}
                />
            </div>
            {/* ASIDE CONTENT */}
            <div
                className={[
                    classes.Aside_Content,
                    (showOverlay && showAside) && classes.Aside_Content__Active,
                ].join(" ")}
            >
                {/* User Avatar */}
                <div className={classes.Aside_Content__Image}>
                    <Image
                        src={"/Images/Avatar.jpg"}
                        width={80}
                        height={80}
                        objectFit={"cover"}
                        objectPosition={"center"}
                    />
                </div>
                {/* User Name */}
                <h3 className={classes.Aside_Content__Name}>Ahmed Mohammed</h3>
                {/* Option Buttons */}
                <div className={classes.ButtonsContainer}>
                    <CheckButton iconName={'moon.svg'} iconName2={'sun.svg'} />
                    <CheckButton iconName={'Eg.jpg'} iconName2={'Uk.jpg'} />
                </div>
                {/* List Of Links */}
                <ul className={classes.Aside_Content__List}>
                    <li><Link href={'/'}><a className={router.pathname == "/" ? classes.Active : ""}>Home</a></Link></li>
                    <li><Link href={'/about'}><a className={router.pathname == "/about" ? classes.Active : ""}>About</a></Link></li>
                    <li><Link href={'/portfolio'}><a className={router.pathname == "/portfolio" ? classes.Active : ""}>Portfolio</a></Link></li>
                    <li><Link href={'/blog'}><a className={router.pathname == "/blog" ? classes.Active : ""}>Blog</a></Link></li>
                    <li><Link href={'/contact'}><a className={router.pathname == "/contact" ? classes.Active : ""}>Contact</a></Link></li>
                    <li><Link href={'/admin/dashboard'}><a className={router.pathname == "/admin/dashboard" ? classes.Active : ""}>Dashboard</a></Link></li>
                </ul>
            </div>
        </aside>
    );
}

export default Aside;
