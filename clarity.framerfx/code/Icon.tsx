import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
//@ts-ignore
import { Icon as Icon_ } from "../../../clarity-react/dist/icon/Icon"

// Open Preview: Command + P
// Learn more: https://framer.com/api

export function Icon(props) {
    let styleProp = props.style ? "" : "is-solid"
    let classes = `${styleProp} ${props.status}`
    return <Icon_ shape={props.shape} className={classes} size={props.size} />
}

Icon.defaultProps = {
    shape: "home",
    size: "36",
}

addPropertyControls(Icon, {
    shape: {
        type: ControlType.String,
        title: "Icon name",
    },
    style: {
        type: ControlType.Boolean,
        enabledTitle: "Outline",
        disabledTitle: "Solid",
        defaultValue: true,
    },

    size: {
        type: ControlType.SegmentedEnum,
        title: "Size",
        defaultValue: "36",
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
