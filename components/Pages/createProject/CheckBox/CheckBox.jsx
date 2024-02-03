import React from 'react';
import classes from './CheckBox.module.scss';
// Redux
import {useDispatch} from 'react-redux';
import {onProjectFieldChange} from '../../../../redux/slices/createProjectSlice';

function CheckBox() {

    // Initialize Redux Dispatcher
    const dispatch = useDispatch();

    // Send the Status of input when it is checked or not
    const onCheckBoxChange = (e) => {
        dispatch(
            onProjectFieldChange({
                inputName: "published",
                value: e.target.checked,
            })
        );
    }

  return (
    <div className={classes.CheckBox}>
        <p>Publish: </p>
        <input id='ProjectPublishInput' onChange={onCheckBoxChange} className={classes.CheckBox_Input} type="CheckBox" name='publish' defaultChecked/>
        <label htmlFor='ProjectPublishInput' className={classes.CheckBox_Label}></label>
    </div>
  )
}

export default CheckBox