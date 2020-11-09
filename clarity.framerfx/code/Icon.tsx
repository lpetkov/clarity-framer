import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { Icon as Icon_ } from "../../../clarity-react/dist/icon/Icon"

export function Icon(props) {
    let styleProp = props.style ? "" : "is-solid"
    let classes = `${styleProp} ${props.status}`
    return <Icon_ shape={props.shape} className={classes} size={props.size} />
}

Icon.defaultProps = {
    shape: "home",
    size: 36,
    width: 36,
    height: 36,
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
