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
    const { progressType, duration, progress } = props
    const [currentProgress, setCurrentProgress] = React.useState(0)
    const timerRef = React.useRef<number>()

    React.useEffect(() => {
        if (progressType === "static") {
            setCurrentProgress(progress)
        } else if (!timerRef.current) {
            // We need a better way to do this, perhaps using a MotionValue. React is throttling the state updates, meaning the progress bar jumps to the end before the animation has finished. Ideally, this would be built into the component itself
            let counter = 0

            const timerInterval = (duration * 1000) / progress

            timerRef.current = setInterval(() => {
                counter++
                setCurrentProgress(counter)
                if (counter === progress) {
                    clearInterval(timerRef.current)
                }
            }, timerInterval)

            return () => {
                clearInterval(timerRef.current)
            }
        }
    }, [progress, progressType, duration])

    return (
        <ProgressBar_
            value={currentProgress}
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
    progressType: {
        type: ControlType.Enum,
        options: ["static", "animate"],
        optionTitles: ["Static", "Animate to Value"],
        defaultValue: "static",
    },
    duration: {
        type: ControlType.Number,
        defaultValue: 0,
        min: 0,
        unit: "s",
        step: 1,
        displayStepper: true,
        hidden: (props) => props.progressType !== "animate",
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
