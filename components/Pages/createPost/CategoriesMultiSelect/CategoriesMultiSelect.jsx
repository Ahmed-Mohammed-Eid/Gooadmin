import {useState} from "react";
//Style
import classes from "./CategoriesMultiSelect.module.scss";
//Components
import Image from "next/image";
// Imports
import {
    OpenBlogCategories,
    CloseBlogCategories,
} from "../../../../redux/slices/LayoutSlice";
import {categories} from "../../../../helpers/ListsForMultiSelectsData";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {onPostElementChange} from "../../../../redux/slices/createPostSlice";


function CategoriesMultiSelect() {
    // Initialize Redux and get the Data from the Store
    const dispatch = useDispatch();
    const {showOverlay, showBlogCategories} = useSelector(
        (state) => state.Layout
    );

    // The State Of Selected Technologies
    const [categoriesList, setCategoriesList] = useState([]);

    // Event When Technology Clicked
    const categoryHasClicked = (event, categoryName) => {
        // Check iF the Clicked Technology is in the State to remove it
        if (categoriesList.includes(categoryName)) {
            // Instance of the State
            const OldDataInState = [...categoriesList];
            // The Index Of the Clicked Technology in the state array
            const indexOfTechnology = OldDataInState.indexOf(categoryName);
            // Remove the technology
            OldDataInState.splice(indexOfTechnology, 1);
            // Update the State
            setCategoriesList(OldDataInState);
            // Add Categories in redux
            dispatch(onPostElementChange({
                title: 'categories',
                value: OldDataInState
            }))
        } else {
            // If it's new
            // Add the new technology to the array of technologies
            const updatedState = [...categoriesList, categoryName];
            // Update the state
            setCategoriesList(updatedState);
            // Add Categories in redux
            dispatch(onPostElementChange({
                title: 'categories',
                value: updatedState
            }))
        }
    };

    return (
        <div
            className={classes.Categories}
            style={{zIndex: showBlogCategories ? "503" : "400"}}>
            <div
                className={classes.Categories_Arrow}
                onClick={() => dispatch(CloseBlogCategories())}>
                <Image
                    src={"/Images/icons/TechnologiesArrow.svg"}
                    width={20}
                    height={20}
                    alt="Arrow Down"/>
            </div>
            <input
                type={"text"}
                name={"Categories"}
                style={{}}
                className={classes.Categories_Input}
                placeholder={"Choose the Used Technologies"}
                onClick={() => dispatch(OpenBlogCategories())}
                readOnly
            />
            {categoriesList.length > 0 && (
                <div className={classes.Result_Container}>
                    {categoriesList.map((cur, index) => {
                        return <span key={index + cur}>{cur}</span>;
                    })}
                </div>
            )}
            {showBlogCategories && showOverlay && (
                <div className={classes.Categories_Dropdown}>
                    {categories.map((item, index) => {
                        return (
                            <p
                                className={
                                    categoriesList.includes(item)
                                        ? classes.Categories_Dropdown__Selected
                                        : ""
                                }
                                onClick={(event) => {
                                    categoryHasClicked(event, item);
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

export default CategoriesMultiSelect;
