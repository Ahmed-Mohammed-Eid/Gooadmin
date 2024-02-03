import React, {useEffect, useState} from "react";
import classes from "./TechnologiesMultiSelect.module.scss";
import Image from "next/image";

// Imports
import {
    OpenProjectTechnologies,
    CloseProjectTechnologies,
} from "../../../../redux/slices/LayoutSlice";
import {technologies} from "../../../../helpers/ListsForMultiSelectsData";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {onProjectFieldChange} from "../../../../redux/slices/editProjectSlice";

function TechnologiesMultiSelect() {
    // Initialize Redux and get the Data from the Store
    const dispatch = useDispatch();
    const {showOverlay, showProjectTechnologies} = useSelector(
        (state) => state.Layout
    );

    // INPUTS STATE FROM THE REDUCER TO SET AS DEFAULT VALUE
    const {
        technologies: technologiesFromReducer
    } = useSelector((state) => state.editProject);

    // Event When Technology Clicked
    const technologyHasClicked = (event, technologyName) => {
        // Check iF the Clicked Technology is in the State to remove it
        if (technologiesFromReducer.includes(technologyName)) {
            // Instance of the State
            const OldDataInState = [...technologiesFromReducer];
            // The Index Of the Clicked Technology in the state array
            const indexOfTechnology = OldDataInState.indexOf(technologyName);
            // Remove the technology
            OldDataInState.splice(indexOfTechnology, 1);
            // Set in Redux
            dispatch(
                onProjectFieldChange({
                    inputName: "technologies",
                    value: OldDataInState,
                })
            );
        } else {
            // If it's new
            // Add the new technology to the array of technologies
            const updatedState = [...technologiesFromReducer, technologyName];
            // Set in Redux
            dispatch(
                onProjectFieldChange({
                    inputName: "technologies",
                    value: updatedState,
                })
            );
        }
    };

    return (
        <div
            className={classes.UsedTechnologies}
            style={{zIndex: showProjectTechnologies ? "503" : "400"}}>
            <div
                className={classes.UsedTechnologies_Arrow}
                onClick={() => dispatch(CloseProjectTechnologies())}>
                <Image
                    src={"/Images/icons/TechnologiesArrow.svg"}
                    width={20}
                    height={20}
                    alt="Arrow Down"/>
            </div>
            <input
                type={"text"}
                name={"usedTechnologies"}
                style={{}}
                className={classes.UsedTechnologies_Input}
                placeholder={"Choose the Used Technologies"}
                onClick={() => dispatch(OpenProjectTechnologies())}
                readOnly
            />
            {technologiesFromReducer && technologiesFromReducer.length > 0 && (
                <div className={classes.Result_Container}>
                    {technologiesFromReducer.map((cur, index) => {
                        return <span key={index + cur}>{cur}</span>;
                    })}
                </div>
            )}
            {showProjectTechnologies && showOverlay && (
                <div className={classes.UsedTechnologies_Dropdown}>
                    {technologies.map((item, index) => {
                        return (
                            <p
                                className={
                                    technologiesFromReducer.includes(item)
                                        ? classes.UsedTechnologies_Dropdown__Selected
                                        : ""
                                }
                                onClick={(event) => {
                                    technologyHasClicked(event, item);
                                }}
                                key={item + index}
                            >
                                {item}
                            </p>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default TechnologiesMultiSelect;
