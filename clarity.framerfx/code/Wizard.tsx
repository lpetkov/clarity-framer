import * as React from "react"
import { Frame, addPropertyControls, ControlType, RenderTarget } from "framer"
import {
    Wizard as Wizard_,
    WizardSize,
} from "../../../clarity-react/dist/wizards"
import { placeholderStyle } from "./utils/placeholder"

function getSteps(props) {
    const childrenAsArray = React.Children.toArray(props.steps)
    let toReturn = []

    for (let i = 0; i < childrenAsArray.length; i++) {
        const stepWrapper = childrenAsArray[i] as any

        if (
            !stepWrapper.props ||
            stepWrapper.props.componentIdentifier.indexOf("WizardStep") === -1
        ) {
            return []
        }

        const stepChildComponent = React.Children.toArray(
            stepWrapper.props.children
        )[0] as any

        if (!stepChildComponent || !stepChildComponent.props) {
            return []
        }

        toReturn.push({
            stepId: i,
            stepName: stepChildComponent.props.stepName,
            showStepTitle: stepChildComponent.props.showStepTitle,
            stepCompleted: stepChildComponent.props.stepCompleted,
            stepComponent: (
                <div style={{ position: "relative" }} key={`${i}`}>
                    {stepChildComponent.props.stepContent}
                </div>
            ),
            isStepValid: () => {
                return false
            },
            onStepSubmit: () => {
                return new Promise((resolve, reject) => {
                    switch (i) {
                        case 0:
                            if (props.onSubmitStep1) props.onSubmitStep1()
                            break
                        case 1:
                            if (props.onSubmitStep2) props.onSubmitStep2()
                            break
                        case 2:
                            if (props.onSubmitStep3) props.onSubmitStep3()
                            break
                        case 3:
                            if (props.onSubmitStep4) props.onSubmitStep4()
                            break
                        case 4:
                            if (props.onSubmitStep5) props.onSubmitStep5()
                            break
                    }
                    resolve(true)
                })
            },
        })
    }

    return toReturn
}

/* 
We need the clarity-react component to support isCollapsed as a prop
 */
export function Wizard(props) {
    const steps = getSteps(props)

    // Ensure Wizard re-mounts when a step is added/removed
    const rerenderKey = React.useMemo(() => {
        return `${steps.length}`
    }, [steps.length])

    if (!steps || steps.length === 0) {
        return (
            <div style={{ ...placeholderStyle }}>
                Connect WizardStep components on the canvas.
            </div>
        )
    }

    return (
        <Wizard_
            key={rerenderKey}
            show={RenderTarget.current() === RenderTarget.preview}
            isOnFramerCanvas={true}
            size={WizardSize[props.wizardSize]}
            title={props.title}
            steps={steps}
        />
    )
}

Wizard.defaultProps = {
    width: 589,
    height: 504,
}

addPropertyControls(Wizard, {
    title: {
        type: ControlType.String,
        defaultValue: "Wizard Title",
    },
    wizardSize: {
        title: "Size",
        type: ControlType.Enum,
        options: Object.keys(WizardSize),
        defaultValue: WizardSize.MEDIUM,
    },
    steps: {
        title: "Steps",
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.ComponentInstance,
        },
    },
    onSubmitStep1: {
        type: ControlType.EventHandler,
    },
    onSubmitStep2: {
        type: ControlType.EventHandler,
    },
    onSubmitStep3: {
        type: ControlType.EventHandler,
    },
    onSubmitStep4: {
        type: ControlType.EventHandler,
    },
    onSubmitStep5: {
        type: ControlType.EventHandler,
    },
})
