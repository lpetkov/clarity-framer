import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { Icon as Icon_ } from "../../../clarity-react/dist/icon/Icon"
import { AllShapes } from "../../../clarity-react/node_modules/@clr/icons/shapes/all-shapes"

export function Icon(props) {
    return (
        <Icon_
            shape={props.shape}
            className={`${props.style ? "" : "is-solid"} ${props.status}`}
            size={props.size}
        />
    )
}

Icon.defaultProps = {
    shape: "home",
    size: "36",
    width: 36,
    height: 36,
}

addPropertyControls(Icon, {
    shape: {
        type: ControlType.Enum,
        options: Object.keys(AllShapes).sort(),
        title: "Name",
        defaultValue: "home",
    },
    style: {
        type: ControlType.Boolean,
        enabledTitle: "Outline",
        disabledTitle: "Solid",
        defaultValue: true,
    },
    size: {
        type: ControlType.Enum,
        displaySegmentedControl: true,
        title: "Size",
        defaultValue: Icon.defaultProps.size,
        options: ["12", "16", "36", "48", "64", "72"],
        optionTitles: ["12", "16", "36", "48", "64", "72"],
    },
    status: {
        type: ControlType.Enum,
        defaultValue: "",
        options: [
            "",
            "is-inverse",
            "is-success",
            "is-danger",
            "is-warning",
            "is-info",
        ],
        optionTitles: [
            "Normal",
            "White",
            "Success",
            "Danger",
            "Warning",
            "Info",
        ],
    },
})
