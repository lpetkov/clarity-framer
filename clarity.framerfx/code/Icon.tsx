import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import {
    SignPost,
    SignPostDirection,
} from "../../../clarity-react/dist/forms/signpost/SignPost"
import { Icon as Icon_ } from "../../../clarity-react/dist/icon/Icon"
import { AllShapes } from "../../../clarity-react/node_modules/@clr/icons/shapes/all-shapes"
import { placeholderStyle } from "./utils/placeholder"
import { useConnectedComponentInstance } from "./utils/useConnectedComponentInstance"

export function Icon(props) {
    const {
        shape,
        style,
        status,
        size,
        signPostContentType,
        signPostText,
        signPostContent,
        signPostDirection,
    } = props
    const [connectedSignPostContent] = useConnectedComponentInstance(
        signPostContent
    )
    const content = React.useMemo(() => {
        if (signPostContentType === "text") {
            return signPostText
        }

        if (!connectedSignPostContent) {
            return (
                <div style={{ ...placeholderStyle }}>
                    Connect a layer on the canvas to be displayed here.
                </div>
            )
        }
        const contentHeight = (connectedSignPostContent as any).props.height
        const contentWidth = (connectedSignPostContent as any).props.width
        return (
            <div
                style={{
                    position: "relative",
                    height: contentHeight,
                    width: contentWidth,
                }}
            >
                {signPostContent}
            </div>
        )
    }, [signPostContentType, signPostText, connectedSignPostContent])
    const icon = React.useMemo(() => {
        return (
            <Icon_
                shape={shape}
                className={`${style ? "" : "is-solid"} ${status}`}
                size={size}
            />
        )
    }, [shape, size, style, status])

    if (props.signPost) {
        return (
            <SignPost direction={signPostDirection} openAt={icon}>
                {content}
            </SignPost>
        )
    }

    return icon
}

Icon.defaultProps = {
    shape: "home",
    size: "36",
    width: 36,
    height: 36,
    signPost: false,
    signPostContentType: "text",
    signPostText: "This is some example SignPost content",
}

const sortedSignPostDirectionKeys = Object.keys(SignPostDirection).sort()

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
    signPost: {
        type: ControlType.Boolean,
        title: "SignPost",
        defaultValue: Icon.defaultProps.signPost,
    },
    signPostContentType: {
        title: "Content",
        type: ControlType.Enum,
        options: ["text", "component"],
        optionTitles: ["Text", "Custom"],
        displaySegmentedControl: true,
        defaultValue: Icon.defaultProps.signPostContentType,
        hidden: (props) => !props.signPost,
    },
    signPostText: {
        title: "Text",
        type: ControlType.String,
        defaultValue: Icon.defaultProps.signPostText,
        hidden: (props) =>
            !(props.signPost && props.signPostContentType === "text"),
    },
    signPostContent: {
        title: "Layer",
        type: ControlType.ComponentInstance,
        hidden: (props) =>
            !(props.signPost && props.signPostContentType === "component"),
    },
    signPostDirection: {
        title: "Direction",
        type: ControlType.Enum,
        optionTitles: sortedSignPostDirectionKeys,
        options: sortedSignPostDirectionKeys.map(
            (key) => SignPostDirection[key]
        ),
        hidden: (props) => !props.signPost,
    },
})
