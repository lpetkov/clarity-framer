import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
//@ts-ignore
import { Input as Input_ } from "../../../clarity-react/dist/forms/input/Input"
//@ts-ignore
import { Icon } from "../../../clarity-react/dist/icon"
//@ts-ignore
import { Password } from "../../../clarity-react/dist/forms/password"

// Open Preview: Command + P
// Learn more: https://framer.com/api

export function Input(props) {
    let helperText = props.hasHelperText ? props.helperText : null
    let label = props.hasLabel ? props.labelText : null
    let errorHelperText = props.isError ? props.errorHelperText : null
    let typeNumber = props.isNumber ? "number" : null

    if (props.isPassword) {
        return (
            <Password
                placeholder={props.placeholder}
                unmask={true}
                helperText={helperText}
                minPasswordLength={8}
                style={{ width: "100%" }}
                error={props.isError}
                errorHelperText={errorHelperText}
                disabled={props.isDisabled}
            />
        )
    }
    return (
        <Input_
            {...props}
            helperText={helperText}
            errorHelperText={errorHelperText}
            style={{ width: "100%" }}
            type={typeNumber}
            placeholder={props.placeholder}
            label={label}
            disabled={props.isDisabled}
            error={props.isError}
        >
            {props.hasIcon ? (
                <Icon
                    shape={props.icon}
                    style={{
                        marginLeft: "-20px",
                        width: "16px",
                        height: "16px",
                    }}
                />
            ) : null}
        </Input_>
    )
}

Input.defaultProps = {
    placeholder: "Placeholder text",
}

addPropertyControls(Input, {
    isPassword: {
        type: ControlType.Boolean,
        defaultValue: false,
    },

    isNumber: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    placeholder: {
        type: ControlType.String,
        defaultValue: "Placeholder text",
        title: "Placeholder",
    },
    hasIcon: {
        type: ControlType.Boolean,
        defaultValue: false,
        hidden(props) {
            return props.isPassword === true || props.isNumber === true
        },
    },
    icon: {
        type: ControlType.String,
        defaultValue: "search",
        hidden(props) {
            return props.hasIcon === false
        },
    },
    isDisabled: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    hasHelperText: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    helperText: {
        type: ControlType.String,
        defaultValue: "Helper text",
        hidden(props) {
            return props.hasHelperText === false
        },
    },
    hasLabel: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    labelText: {
        type: ControlType.String,
        defaultValue: "Label text",
        hidden(props) {
            return props.hasLabel === false
        },
    },
    isError: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    errorHelperText: {
        type: ControlType.String,
        defaultValue: "Error helper text",
        hidden(props) {
            return props.isError === false
        },
    },
})
