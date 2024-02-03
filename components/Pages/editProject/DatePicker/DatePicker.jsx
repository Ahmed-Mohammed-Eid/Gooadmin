import React, {useRef} from "react";
import classes from './DatePicker.module.scss';
// Redux
import {useDispatch, useSelector} from "react-redux";
import { onProjectFieldChange } from "../../../../redux/slices/editProjectSlice";

function DatePicker() {
    // Initialize the Dispatcher
    const dispatch = useDispatch();
    // INPUTS STATE FROM THE REDUCER TO SET AS DEFAULT VALUE
    const {
        createdAtInReal,
    } = useSelector((state) => state.editProject);

    const new_date = new Date(createdAtInReal);
    const formattedDate = new_date.toISOString().slice(0, 10);

    // ref for date input
    const dateInputRef = useRef(false);
    // on change function
    const changeHandler = () => {
        // get the current value
        const dataDate = dateInputRef.current.value;

        // Set the Data in redux
        dispatch(
            onProjectFieldChange({
              inputName: "createdAtInReal",
              value: dataDate
            })
          )
    }

    // convert to date and format it
    const dataAsDate = new Date(formattedDate).toLocaleDateString('en-US', {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })


    return (
        <div className={classes.InputsContainer_InputDate}>
            <label htmlFor="dateOfCreating" className={formattedDate ? classes.Selected : ''}>{dataAsDate || "Date Of Creating"}</label>
            <input
                type={"date"}
                name="dateOfCreating"
                id="dateOfCreating"
                placeholder="Date Of Creating"
                className={classes.InputsContainer_Input}
                defaultValue={formattedDate}
                onChange={changeHandler}
                ref={dateInputRef}
            />
        </div>
    );
}

export default DatePicker;
