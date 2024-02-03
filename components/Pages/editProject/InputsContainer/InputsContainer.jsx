import React, {useEffect} from "react";
import classes from "./InputsContainer.module.scss";
// Imports
import SendIcon from "../../../layout/ImagesIcons/SendIcon";
import DatePicker from "../DatePicker/DatePicker";
import TechnologiesMultiSelect from "../TechnologiesMultiSelect/TechnologiesMultiSelect";
import CheckBox from "../CheckBox/CheckBox";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {onProjectFieldChange, setTheDefaultData} from "../../../../redux/slices/editProjectSlice";
import Spinner from "../../../layout/Spinner";

function InputsContainer({createProject, project, projectId, loadingState}) {
    const parsedProject = JSON.parse(project);
    // Initialize the Redux dispatcher
    const dispatch = useDispatch();
    // INPUTS STATE FROM THE REDUCER TO SET AS DEFAULT VALUE
    const {
        nameOfCreator,
        nameOfProject,
        githubLink,
        livePreviewLink,
        projectDescription,
    } = useSelector((state) => state.editProject);

    useEffect(() => {

        dispatch(setTheDefaultData({
            nameOfCreatorKey: 'nameOfCreator',
            nameOfCreatorValue: parsedProject.nameOfCreator,
            nameOfProjectKey: 'nameOfProject',
            nameOfProjectValue: parsedProject.nameOfProject,
            createdAtInRealKey: 'createdAtInReal',
            createdAtInRealValue: parsedProject.createdAtInReal,
            githubLinkKey: 'githubLink',
            githubLinkValue: parsedProject.githubLink,
            livePreviewLinkKey: 'livePreviewLink',
            livePreviewLinkValue: parsedProject.livePreviewLink,
            projectDescriptionKey: 'projectDescription',
            projectDescriptionValue: parsedProject.projectDescription,
            technologiesKey: 'technologies',
            technologiesValue: parsedProject.technologies,
            publishedKey: 'published',
            publishedValue: parsedProject.published,
        }))

    }, [])

    return (
        <section className={classes.InputsContainer}>
            <div>
                <input
                    type={"text"}
                    name="creatorName"
                    placeholder="Creator Name"
                    className={classes.InputsContainer_Input}
                    defaultValue={nameOfCreator}
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
                    defaultValue={nameOfProject}
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
                    defaultValue={projectDescription}
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
                    defaultValue={livePreviewLink}
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
                    defaultValue={githubLink}
                    onChange={(e) =>
                        dispatch(
                            onProjectFieldChange({
                                inputName: "githubLink",
                                value: e.target.value,
                            })
                        )
                    }
                />
                <CheckBox/>
            </div>
            {/*Run the Create Function in Parent Component*/}
            <button onClick={createProject}>
                <span>
                  <SendIcon/>
                </span>
                <span>{loadingState ? <Spinner size={2} color={'#f50'} /> : 'Edit'}</span>
            </button>
        </section>
    );
}

export default InputsContainer;
