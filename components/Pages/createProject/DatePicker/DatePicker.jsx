import React, {useState, useRef} from "react";
import classes from './DatePicker.module.scss';
// Redux
import { useDispatch } from "react-redux";
import { onProjectFieldChange } from "../../../../redux/slices/createProjectSlice";

function DatePicker() {
    // Initialize the Dispatcher
    const dispatch = useDispatch();


    // the state of the picked date
    const [date, setDate] = useState(false);
    // ref for date input
    const dateInputRef = useRef(false);
    // on change function
    const changeHandler = () => {
        // get the current value
        const dataDate = dateInputRef.current.value;
        // convert to date and format it
        const dataAsDate = new Date(dataDate).toLocaleDateString('en-US', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
        // set the formatted date in the state
        setDate(dataAsDate);
        // Set the Data in redux
        dispatch(
            onProjectFieldChange({
              inputName: "createdAtInReal",
              value: dataAsDate
            })
          )
    }


    return (
        <div className={classes.InputsContainer_InputDate}>
            <label htmlFor="dateOfCreating" className={date ? classes.Selected : ''}>{date || "Date Of Creating"}</label>
            <input
                type={"date"}
                name="dateOfCreating"
                id="dateOfCreating"
                placeholder="Date Of Creating"
                className={classes.InputsContainer_Input}
                onChange={changeHandler}
                ref={dateInputRef}
            />
        </div>
    );
}

export default DatePicker;
