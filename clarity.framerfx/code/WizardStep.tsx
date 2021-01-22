import * as React from "react"
import { Frame, addPropertyControls, ControlType, RenderTarget } from "framer"
import { placeholderStyle } from "./utils/placeholder"
import { indentPropertyControlTitle } from "./utils/propertyControls"
import { useConnectedComponentInstance } from "./utils/useConnectedComponentInstance"
import { forceRelativePositioning } from "./utils/layout"

const containerStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    boxSizing: "border-box",
    overflow: "hidden",
}

const stepNameStyle: React.CSSProperties = {
    padding: 8,
}

export function WizardStep(props) {
    const [stepContent] = useConnectedComponentInstance(props.stepContent)
    // const [stepFooter] = useConnectedComponentInstance(props.stepFooter)
    if (!stepContent) {
        return (
            <div style={{ ...placeholderStyle }}>
                Connect Content to show inside this step.
            </div>
        )
    }
    return (
        <div style={containerStyle}>
            {props.showStepTitle && (
                <div style={stepNameStyle}>{props.stepName}</div>
            )}
            {forceRelativePositioning(stepContent as React.ReactElement)}
            {/* {forceRelativePositioning(stepFooter as React.ReactElement)} */}
        </div>
    )
}

WizardStep.defaultProps = {}

addPropertyControls(WizardStep, {
    showStepTitle: {
        title: "Step Name",
        type: ControlType.Boolean,
        enabledTitle: "Show",
        disabledTitle: "Hide",
        defaultValue: true,
    },
    stepName: {
        type: ControlType.String,
        title: indentPropertyControlTitle("Name"),
        defaultValue: "Step Name",
        hidden: (props) => !props.showStepTitle,
    },
    stepCompleted: {
        title: "Step Completed",
        type: ControlType.Boolean,
        enabledTitle: "True",
        disabledTitle: "False",
        defaultValue: false,
    },
    stepContent: {
        title: "Content",
        type: ControlType.ComponentInstance,
    },
    // stepFooter: {
    //     title: "Footer",
    //     type: ControlType.ComponentInstance,
    // },
})
