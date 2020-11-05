import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import {
    Button as _Button,
    ButtonSize,
    ButtonState,
} from "../../../clarity-react/dist/forms/button/Button"

export function Button(props) {
    const { onClick, ...rest } = props

    return (
        <_Button
            state={props.state}
            primary={props.primary}
            link={props.link}
            disabled={props.disabled}
            size={props.buttonSize}
            onClick={onClick}
        >
            {props.text}
        </_Button>
    )
}

Button.defaultProps = {
    text: "button",
    primary: true,
    link: false,
    disabled: false,
    state: ButtonState.INFO,
    smallButton: false,
}
addPropertyControls(Button, {
    text: {
        type: ControlType.String,
        defaultValue: "Hello World",
    },
    primary: {
        type: ControlType.Boolean,
        title: "Primary",
        defaultValue: true,
        enabledTitle: "Primary",
        disabledTitle: "Outline",
    },
    link: {
        type: ControlType.Boolean,
        title: "Link",
        defaultValue: false,
        enabledTitle: "True",
        disabledTitle: "False",
    },
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
        defaultValue: false,
        enabledTitle: "True",
        disabledTitle: "False",
    },
    buttonSize: {
        type: ControlType.Enum,
        title: "Size",
        defaultValue: undefined,
        options: [ButtonSize.SMALL, undefined],
        optionTitles: ["Small", "Normal"],
    },
    state: {
        type: ControlType.Enum,
        defaultValue: ButtonState.INFO,
        options: [ButtonState.INFO, ButtonState.SUCCESS, ButtonState.WARNING],
        optionTitles: ["Info", "Success", "Error"],
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})
