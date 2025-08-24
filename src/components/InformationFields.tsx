import React, { useEffect, useState } from "react";

const InformationFields = (props: { info: any }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        // Sets the data to the value inparameter if it is a string, or a comma separated string 
        // of the value inparameter if it is an object. This is then returned in a div along with
        // the label
        const setData = (label: string, value: any) => {
            let result = "";
            if (value && typeof (value) === "object") {
                if (value.length) {
                    value.forEach((value: { name: string; }) => {
                        result += value.name + ", ";
                    });
                    result = result.slice(0, result.length - 2);
                }
            } else {
                result = value !== 0 ? value : "";
            }
        
            return (
                <div key={label+value}>
                    { result && <div><span className="bold">{label}</span>{result}</div> }
                </div>
            )
        }

        let footer = [] as any;
        props.info && props.info.forEach((info: { label: string; value: any; }) => {
            footer.push(
                setData(info.label, info.value)
            )
        });

        setValue(footer);
    }, [props.info])

    return (
        <>
            {value}
        </>
    )
}

export default InformationFields;