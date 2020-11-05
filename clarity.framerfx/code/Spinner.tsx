import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import {
    Spinner as Spinner_,
    SpinnerType,
    SpinnerSize,
    //@ts-ignore
} from "../../../clarity-react/dist/spinner/Spinner"

export function Spinner(props) {
    const { text, tint, ...rest } = props

    if (props.pageOrInline) {
        return <Spinner_ size={props.size} />
    } else {
        return (
            <Spinner_ size={props.size} type={SpinnerType.INLINE}>
                {text}
            </Spinner_>
        )
    }
}

Spinner.defaultProps = {
    height: 128,
    width: 240,
    text: "Get started!",
    tint: "#0099ff",
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Spinner, {
    pageOrInline: {
        type: ControlType.Boolean,
        defaultValue: true,
        enabledTitle: "Page",
        disabledTitle: "Inline",
    },
    size: {
        type: ControlType.SegmentedEnum,
        title: "My Enum",
        options: [SpinnerSize.LARGE, SpinnerSize.MEDIUM, SpinnerSize.SMALL],
        optionTitles: ["Large", "Medium", "Small"],
        hidden(props) {
            return props.pageOrInline === false
        },
    },

    text: {
        type: ControlType.String,
        defaultValue: "Loading...",
        title: "Text",
        hidden(props) {
            return props.pageOrInline === true
        },
    },
})
