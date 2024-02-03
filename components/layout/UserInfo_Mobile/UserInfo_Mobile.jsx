import React, { useState, useEffect } from "react";
import classes from "./UserInfo_Mobile.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// Get the Session Data
import LoginIcon from "../NavbarV2/Icons/LoginIcon";
import SignupIcon from "../NavbarV2/Icons/SignupIcon";

function UserInfo_Mobile({ isAuthenticated, user }) {
    // router
    const router = useRouter();

    // State
    const [showOptions, setShowOptions] = useState(false);

    // ########### change the state of options
    function showAndHideOptionsHandler() {
        setShowOptions((prevState) => {
            return !prevState;
        });
    }

    // ########### change the state of options
    function hideOptionsHandler() {
        setShowOptions(false);
    }

    // handle logout
    const handleLogout = (e) => {
        e.preventDefault();
        // Hide the options
        hideOptionsHandler();
        // clear the cookies and localstorage token
        // Remove token from local storage
        localStorage.removeItem("token");

        // Remove token from cookies
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        // reload the page
        router.push("/").then(() => router.reload());
    };

    useEffect(() => {
        // Hide the options when the user clicks outside the options
        document.addEventListener("click", (e) => {
            // get the class UserInfo_Mobile and its children and if the target is not one of them close the options
            if (!e.target.closest(`.${classes.UserInfo_Mobile}`)) {
                hideOptionsHandler();
            }
        });
        return () => {
            document.removeEventListener("click", hideOptionsHandler);
        };
    }, []);

    return (
        <div
            className={classes.UserInfo_Mobile}
            onClick={showAndHideOptionsHandler}
        >
            <div className={classes.User_Image}>
                <Image
                    src={isAuthenticated ?  user?.userImage?.url || "/Images/Auth/User.png" : '/Images/Auth/user.svg'}
                    alt='User Image'
                    width={100}
                    height={100}
                />
                <div className={classes.User_Image_Overlay}></div>
            </div>
            {showOptions && (
                <div className={classes.User_Menu}>
                    <ul>
                        {isAuthenticated ? (
                            <>
                                <li onClick={hideOptionsHandler}>
                                    <Link
                                        href={
                                            "/authentication/userInformations"
                                        }
                                    >
                                        <a>
                                            <div
                                                className={
                                                    classes.User_Menu_Item
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.User_Menu_Item_Image
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            user.userImage
                                                                .url ||
                                                            "/Images/Auth/User.png"
                                                        }
                                                        alt='User Image'
                                                        width={100}
                                                        height={100}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        classes.User_Menu_Item_Info
                                                    }
                                                >
                                                    <h3>
                                                        {user.firstName}{" "}
                                                        {user.lastName}
                                                    </h3>
                                                    <p>@{user.username}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </li>
                                <li onClick={handleLogout}>
                                    <Link href={"/api/auth/signOut"} passHref>
                                        <a
                                            className={classes.SignOut}
                                            href={"/api/auth/signOut"}
                                            onClick={handleLogout}
                                        >
                                            SignOut
                                        </a>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li onClick={hideOptionsHandler}>
                                    <Link href={"/authentication/login"}>
                                        <a aria-label={"Go to Login Page"}>
                                            <div>
                                                <LoginIcon />
                                            </div>
                                            Login
                                        </a>
                                    </Link>
                                </li>
                                <li onClick={hideOptionsHandler}>
                                    <Link href={"/authentication/signup"}>
                                        <a aria-label={"Go to Signup Page"}>
                                            <div>
                                                <SignupIcon />
                                            </div>
                                            SignUp
                                        </a>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserInfo_Mobile;
