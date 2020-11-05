import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

import {
    ProgressBar as ProgressBar_,
    ProgressBarStatus,
    ProgressBarType,
    ProgressBarAnimation,
    ProgressBarPosition,
    //@ts-ignore
} from "../../../clarity-react/dist/progress_bars"

export function ProgressBar(props) {
    return (
        <ProgressBar_
            value={props.progress}
            max={100}
            status={props.status}
            labeled={props.isLabeled}
            style={{ width: "100%", heigth: "100%" }}
        >
            {" "}
        </ProgressBar_>
    )
}

ProgressBar.defaultProps = {
    progress: 30,
    isLabeled: true,
    status: "normal",
}

addPropertyControls(ProgressBar, {
    progress: {
        type: ControlType.Number,
        defaultValue: 0,
        min: 0,
        max: 100,
        unit: "%",
        step: 5,
    },
    isLabeled: {
        type: ControlType.Boolean,
        title: "Show label",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    status: {
        type: ControlType.SegmentedEnum,
        defaultValue: "a",
        options: ["normal", "success", "danger"],
        optionTitles: ["Normal", "Success", "Danger"],
    },
})
