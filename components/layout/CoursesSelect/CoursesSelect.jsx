import React, {useId} from "react";
import Select from "react-select";

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        width: "100%",
        height: "100%",
        border: "none",
        outline: "none",
        fontSize: "1.4rem",
        color: "#707070",
        caretColor: "var(--highlight-color)",
    }),
};

const MySelect = ({courses, changeEvent}) => {

    const id = useId();

    let options = [];
    if (courses) {
        options = courses.map((course) => ({
            value: course.name,
            label: course.name,
        }));
    }

    return <Select instanceId={id} styles={customStyles} options={options} onChange={(e) => {
        changeEvent(e.value);
    }}/>;
};

export default MySelect;
