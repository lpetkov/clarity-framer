import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import {
    Label as Label_,
    LabelColor,
    LabelStatus,
    //@ts-ignore
} from "../../../clarity-react/dist/forms/label/Label"
import {
    Badge,
    BadgeColor,
    BadgeStatus,
    //@ts-ignore
} from "../../../clarity-react/dist/emphasis/badges"

export function Label(props) {
    let labelStatus = props.hasStatus ? props.labelStatus : null
    let badgeStatus = props.hasStatus ? props.badgeStatus : null
    return (
        <Label_
            status={labelStatus}
            {...(props.isClickable && { onClick: () => null })}
        >
            {props.text}
            {props.hasBadge ? (
                <Badge status={badgeStatus}>{props.badgeNumber}</Badge>
            ) : null}
        </Label_>
    )
}

Label.defaultProps = {
    labelStatus: "LabelStatus.INFO",
    badgeStatus: "BadgeStatus.BADGE_INFO",
}

addPropertyControls(Label, {
    text: {
        type: ControlType.String,
        defaultValue: "Label text",
        title: "Label text",
    },
    isClickable: {
        title: "Clickable",
        type: ControlType.Boolean,
        defaultValue: false,
    },
    hasStatus: {
        title: "Has Status",
        type: ControlType.Boolean,
        defaultValue: false,
    },
    hasBadge: {
        title: "Has Badge",
        type: ControlType.Boolean,
        defaultValue: true,
    },
    labelStatus: {
        type: ControlType.Enum,
        title: "Status",
        defaultValue: LabelStatus.INFO,
        options: [
            LabelStatus.INFO,
            LabelStatus.SUCCESS,
            LabelStatus.WARNING,
            LabelStatus.DANGER,
        ],
        optionTitles: ["Info", "Success", "Warning", "Danger"],
        hidden(props) {
            return props.hasStatus === false
        },
    },
    badgeStatus: {
        type: ControlType.Enum,
        title: "Badge status",
        defaultValue: LabelStatus.INFO,
        options: [
            BadgeStatus.BADGE_INFO,
            BadgeStatus.BADGE_SUCCESS,
            BadgeStatus.BADGE_WARNING,
            BadgeStatus.BADGE_DANGER,
        ],
        optionTitles: ["Info", "Success", "Warning", "Danger"],
        hidden(props) {
            return props.hasStatus === false || props.hasBadge === false
        },
    },

    badgeNumber: {
        type: ControlType.Number,
        defaultValue: 1,
        displayStepper: true,
        max: 99,
        hidden(props) {
            return props.hasBadge === false
        },
    },
})
