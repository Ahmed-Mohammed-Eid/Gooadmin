import Image from "next/image";
import React from "react";
import styles from "./SearchIcon.module.scss";
// Redux
import { useDispatch } from "react-redux";
import { showSearchInput } from "../../../../redux/slices/LayoutSlice";

const SearchIcon = () => {
    const dispatch = useDispatch();

    return (
        <div
            className={styles.searchIcon}
            onClick={() => dispatch(showSearchInput())}
        >
            <div className={styles.icon}>
                <Image
                    src={"/search.svg"}
                    width={20}
                    height={20}
                    alt={"search icon"}
                />
            </div>
            <span className={styles.tooltip}>Search</span>
        </div>
    );
};

export default SearchIcon;
