import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { CheckBox as CheckBox_ } from "../../../clarity-react/dist/forms/checkbox/CheckBox"
import {
    FormControl,
    SubTextWrapper,
} from "../../../clarity-react/dist/forms/common"
import { useManagedState } from "./utils/useManagedState"

export function Checkbox(props) {
    const { checked, onValueChange, onCheck, onUncheck } = props
    const [isChecked, setIsChecked] = useManagedState(checked, onValueChange)

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.currentTarget.checked)

        if (onValueChange) {
            onValueChange(e.currentTarget.checked)
        }

        if (e.currentTarget.checked && onCheck) {
            onCheck()
        } else if (!e.currentTarget.checked && onUncheck) {
            onUncheck()
        }
    }

    return (
        <FormControl
            error={props.error}
            disabled={props.disabled}
            label={props.showFormLabel ? props.formLabel : undefined}
            // helperText={props.helperText}
        >
            <CheckBox_
                label={props.label}
                checked={isChecked}
                onChange={handleToggle}
            />
            <SubTextWrapper
                shape="exclamation-circle"
                text={props.showHelperText ? props.helperText : undefined}
            />
        </FormControl>
    )
}

Checkbox.defaultProps = {
    itemsArray: ["Checkbox label"],
    isChecked: true,
}

addPropertyControls(Checkbox, {
    checked: {
        type: ControlType.Boolean,
        defaultValue: true,
    },
    showFormLabel: {
        title: "Form Label",
        type: ControlType.Boolean,
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    formLabel: {
        type: ControlType.String,
        defaultValue: `Checkbox Form Label`,
        hidden: (props) => !props.showFormLabel,
    },
    label: {
        type: ControlType.String,
        defaultValue: `Checkbox label`,
    },
    showHelperText: {
        title: "Helper",
        type: ControlType.Boolean,
        defaultValue: false,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    helperText: {
        type: ControlType.String,
        defaultValue: `Helper Text`,
        hidden: (props) => !props.showHelperText,
    },
    disabled: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Disabled",
    },
    error: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Error",
    },
    onCheck: {
        type: ControlType.EventHandler,
    },
    onUncheck: {
        type: ControlType.EventHandler,
    },
})
