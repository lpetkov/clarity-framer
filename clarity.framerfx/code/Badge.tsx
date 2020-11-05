import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import {
    Badge as Badge_,
    BadgeColor,
    BadgeStatus,
} from "../../../clarity-react/dist/emphasis/badges/"

export function Badge(props) {
    if (props.statusOrColor) {
        return <Badge_ status={props.status}>{props.number}</Badge_>
    } else {
        return <Badge_ color={props.colors}>{props.number}</Badge_>
    }
}

Badge.defaultProps = {
    height: 128,
    width: 240,
    text: "Get started!",
    tint: "#0099ff",
}

addPropertyControls(Badge, {
    number: {
        type: ControlType.Number,
        title: "Value",
        defaultValue: 1,
        max: 99,
        displayStepper: true,
    },
    statusOrColor: {
        type: ControlType.Boolean,
        defaultValue: true,
        enabledTitle: "Status",
        disabledTitle: "Color",
    },
    status: {
        type: ControlType.Enum,
        defaultValue: "AlertType.INFO",
        options: [
            BadgeStatus.BADGE_INFO,
            BadgeStatus.BADGE_SUCCESS,
            BadgeStatus.BADGE_WARNING,
            BadgeStatus.BADGE_DANGER,
        ],
        optionTitles: ["Info", "Success", "Warning", "Danger"],
        hidden(props) {
            return props.statusOrColor === false
        },
    },

    colors: {
        type: ControlType.Enum,
        defaultValue: "AlertType.INFO",
        options: [
            BadgeColor.PURPLE,
            BadgeColor.ORANGE,
            BadgeColor.LIGHT_BLUE,
            BadgeColor.BADGE_1,
            BadgeColor.BADGE_2,
            BadgeColor.BADGE_3,
            BadgeColor.BADGE_4,
            BadgeColor.BADGE_5,
        ],
        optionTitles: [
            "Purple",
            "Orange",
            "Light blue",
            "1",
            "2",
            "3",
            "4",
            "5",
        ],
        hidden(props) {
            return props.statusOrColor === true
        },
    },
})
