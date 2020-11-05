//@ts-ignoreimport * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import {
    RadioButton as RadioButton_,
    RadioButtonGroup as RadioButtonGroup_,
} from "../../../clarity-react/dist/forms/radio"

export function RadioButtonGroup(props) {
    let label = props.groupHasLabel ? props.groupLabel : null
    let helperText = props.groupHasHelper ? props.helperText : null
    return (
        <RadioButtonGroup_
            inline={props.inline}
            helperText={helperText}
            label={label}
            name="DefaultGroup"
            disabled={props.disabled}
            defaultValue={props.buttonsArray[props.defaultSelected]}
        >
            {/* default selected doesn't get updated properly on Framer's canvas */}
            {props.buttonsArray.map((value, index) => {
                return (
                    <RadioButton_
                        value={props.buttonsArray[index]}
                        label={props.buttonsArray[index]}
                        key={props.buttonsArray[index]}
                    ></RadioButton_>
                )
            })}
        </RadioButtonGroup_>
    )
}

RadioButtonGroup.defaultProps = {
    checked: false,
    buttonsArray: ["Radio Button 1", "Radio Button 2"],
}

addPropertyControls(RadioButtonGroup, {
    disabled: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    buttonsArray: {
        title: "Add and Remove Radio Buttons",
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
            defaultValue: `Radio button`,
        },
    },
    groupHasLabel: {
        title: "Label",
        type: ControlType.Boolean,
        defaultValue: false,
    },
    groupLabel: {
        type: ControlType.String,
        defaultValue: `Radio button group label`,
        hidden(props) {
            return props.groupHasLabel === false
        },
    },
    groupHasHelper: {
        title: "Helper",
        type: ControlType.Boolean,
        defaultValue: false,
    },
    helperText: {
        type: ControlType.String,
        defaultValue: `Radio button group helper`,
        hidden(props) {
            return props.groupHasHelper === false
        },
    },
    defaultSelected: {
        type: ControlType.Number,
        defaultValue: 0,
        displayStepper: true,
    },
    inline: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
})
