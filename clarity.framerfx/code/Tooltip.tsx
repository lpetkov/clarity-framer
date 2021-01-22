import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import {
    ToolTip as ToolTip_,
    ToolTipDirection,
    ToolTipSize,
    //@ts-ignore
} from "../../../clarity-react/dist/forms/tooltip/ToolTip"

export function Tooltip(props) {
    return (
        <Frame width="100%" height={36} background={null}>
            <ToolTip_
                size={props.toolTipSize}
                direction={props.toolTipDirection}
                iconSize={props.iconSize}
            >
                {props.tooltipText}
            </ToolTip_>
            {props.bodyText}
        </Frame>
    )
}

Tooltip.defaultProps = {
    text: "Tooltip text",
}

const sortedTooltipSizeKeys = Object.keys(ToolTipSize)
const sortedTooltipDirectionKeys = Object.keys(ToolTipDirection)

addPropertyControls(Tooltip, {
    tooltipText: {
        title: "Tooltip text",
        type: ControlType.String,
        defaultValue: "Tooltip text",
    },
    bodyText: {
        title: "Body text",
        type: ControlType.String,
        defaultValue: "Body text",
        displayTextArea: true,
    },
    iconSize: {
        type: ControlType.SegmentedEnum,
        title: "Size",
        defaultValue: "16",
        options: ["12", "16", "36"],
        optionTitles: ["12", "16", "36"],
    },
    toolTipSize: {
        type: ControlType.Enum,
        title: "Size",
        defaultValue: ToolTipSize.MEDIUM,
        options: sortedTooltipSizeKeys.map((key) => ToolTipSize[key]),
        optionTitles: sortedTooltipSizeKeys,
    },
    toolTipDirection: {
        type: ControlType.Enum,
        title: "Direction",
        defaultValue: ToolTipDirection.TOP_RIGHT,
        options: sortedTooltipDirectionKeys.map((key) => ToolTipDirection[key]),
        optionTitles: sortedTooltipDirectionKeys,
    },
})
