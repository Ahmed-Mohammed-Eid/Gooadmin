import React from 'react';
import classes from './CheckBox.module.scss';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {onProjectFieldChange} from '../../../../redux/slices/editProjectSlice';

function CheckBox() {

    // Initialize Redux Dispatcher
    const dispatch = useDispatch();
    // INPUTS STATE FROM THE REDUCER TO SET AS DEFAULT VALUE
    const {
        published
    } = useSelector((state) => state.editProject);

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
        <input id='ProjectPublishInput' onChange={onCheckBoxChange} className={classes.CheckBox_Input} type="CheckBox" name='publish' defaultChecked={published}/>
        <label htmlFor='ProjectPublishInput' className={classes.CheckBox_Label}></label>
    </div>
  )
}

export default CheckBox