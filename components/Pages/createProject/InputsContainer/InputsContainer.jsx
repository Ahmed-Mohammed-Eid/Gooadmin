import React from "react";
import classes from "./InputsContainer.module.scss";
// Imports
import SendIcon from "../../../layout/ImagesIcons/SendIcon";
import DatePicker from "../DatePicker/DatePicker";
import TechnologiesMultiSelect from "../TechnologiesMultiSelect/TechnologiesMultiSelect";
import CheckBox from "../CheckBox/CheckBox";
import Spinner from "../../../layout/Spinner";

// Redux
import {useDispatch} from "react-redux";
import {onProjectFieldChange} from "../../../../redux/slices/createProjectSlice";

function InputsContainer({createProject, loadingState}) {
    // Initialize the Redux dispatcher
    const dispatch = useDispatch();

    return (
        <section className={classes.InputsContainer}>
            <div>
                <input
                    type={"text"}
                    name="creatorName"
                    placeholder="Creator Name"
                    className={classes.InputsContainer_Input}
                    onChange={(e) =>
                        dispatch(
                            onProjectFieldChange({
                                inputName: "nameOfCreator",
                                value: e.target.value,
                            })
                        )
                    }
                />
                <input
                    type={"text"}
                    name="projectName"
                    placeholder="Project Name"
                    className={classes.InputsContainer_Input}
                    onChange={(e) =>
                        dispatch(
                            onProjectFieldChange({
                                inputName: "nameOfProject",
                                value: e.target.value,
                            })
                        )
                    }
                />
                <textarea
                    name="projectDescription"
                    placeholder="Project Description"
                    className={classes.InputsContainer_Textarea}
                    onChange={(e) =>
                        dispatch(
                            onProjectFieldChange({
                                inputName: "projectDescription",
                                value: e.target.value,
                            })
                        )
                    }
                ></textarea>
                <DatePicker/>
                <TechnologiesMultiSelect/>
                <input
                    type={"text"}
                    name="livePreviewLink"
                    placeholder="Live Preview Link"
                    className={classes.InputsContainer_Input}
                    onChange={(e) =>
                        dispatch(
                            onProjectFieldChange({
                                inputName: "livePreviewLink",
                                value: e.target.value,
                            })
                        )
                    }
                />
                <input
                    type={"text"}
                    name="githubLink"
                    placeholder="Github Link"
                    className={classes.InputsContainer_Input}
                    onChange={(e) =>
                        dispatch(
                            onProjectFieldChange({
                                inputName: "githubLink",
                                value: e.target.value,
                            })
                        )
                    }
                />
                <CheckBox />
            </div>
            {/*Run the Create Function in Parent Component*/}
            <button onClick={createProject}>
                <span>
                  <SendIcon/>
                </span>
                <span>{loadingState ? <Spinner size={2} color={'#f50'} /> : 'Create'}</span>
            </button>
        </section>
    );
}

export default InputsContainer;
