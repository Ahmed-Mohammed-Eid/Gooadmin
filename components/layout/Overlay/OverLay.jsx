import React from "react";
import classes from "./Overlay.module.scss";
import { useDispatch } from "react-redux";
// Actions
import { CloseAll } from "../../../redux/slices/LayoutSlice";

function OverLay() {
    const dispatch = useDispatch();

    return (
        <div
            onClick={() => dispatch(CloseAll())}
            className={classes.Overlay}
        ></div>
    );
}

export default OverLay;
