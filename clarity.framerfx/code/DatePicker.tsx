import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { DatePicker as DatePicker_ } from "../../../clarity-react/dist/forms/datepicker/DatePicker"

export function DatePicker(props) {
    // let date = props.hasCustomDate ? props.date : new Date()
    return <DatePicker_ />
}

//Todo: update the state on canvas
//Todo: add different date formats

addPropertyControls(DatePicker, {
    hasCustomDate: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    date: {
        type: ControlType.String,
        defaultValue: "MM/DD/YYYY",
        title: "Custom date",
    },
})
