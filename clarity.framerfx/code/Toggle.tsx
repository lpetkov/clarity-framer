import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { Toggle as Toggle_ } from "../../../clarity-react/src/forms/toggle/Toggle"
import { useManagedState } from "./utils/useManagedState"

export function Toggle(props) {
    const { onChange, onToggleOn, onToggleOff, toggled, ...rest } = props
    const [currentValue, setCurrentValue] = useManagedState(toggled, onChange)
    const onToggle = React.useCallback(
        (value: boolean) => {
            console.log("New value ", value)
            if (value && onToggleOn) {
                onToggleOn()
            } else if (!value && onToggleOff) {
                onToggleOff()
            }

            setCurrentValue(value)
        },
        [onToggleOn, onToggleOff]
    )

    return (
        <Toggle_
            disabled={props.disabled}
            label={props.showLabel ? props.label : false}
            checked={currentValue}
            onChange={onToggle}
        />
    )
}

Toggle.defaultProps = {
    disabled: false,
    showLabel: false,
    label: "Toggle label",
}

addPropertyControls(Toggle, {
    toggled: {
        type: ControlType.Boolean,
        title: "State",
        defaultValue: false,
        enabledTitle: "Checked",
        disabledTitle: "Unchecked",
    },
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    showLabel: {
        type: ControlType.Boolean,
        title: "Label",
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    label: {
        type: ControlType.String,
        title: "Text",
        hidden(props) {
            return props.showLabel === false
        },
    },
    onToggleOn: {
        type: ControlType.EventHandler,
    },
    onToggleOff: {
        type: ControlType.EventHandler,
    },
})
