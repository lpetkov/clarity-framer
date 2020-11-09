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
    width: 200,
    height: 18,
}

addPropertyControls(ProgressBar, {
    progress: {
        type: ControlType.Number,
        defaultValue: 0,
        min: 0,
        max: 100,
        unit: "%",
        step: 5,
        displayStepper: true,
    },
    isLabeled: {
        type: ControlType.Boolean,
        title: "Label",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    status: {
        type: ControlType.Enum,
        defaultValue: "a",
        options: ["normal", "success", "danger"],
        optionTitles: ["Normal", "Success", "Danger"],
    },
})
