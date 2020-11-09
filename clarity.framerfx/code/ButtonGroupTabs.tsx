import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { ButtonGroup } from "../../../clarity-react/dist/forms/button/ButtonGroup"
import { RadioButton } from "../../../clarity-react/dist/forms/radio/RadioButton"
import { useManagedState } from "./utils/useManagedState"
import { placeholderStyle } from "./utils/placeholder"

export function ButtonGroupTabs(props) {
    const { width, selectedTab, tabContent, titles, height } = props
    const [currentSelectedTab, setCurrentSelectedTab] = useManagedState(
        selectedTab - 1
    )
    const content = React.useMemo(() => {
        if (tabContent[currentSelectedTab]) {
            const { props: contentProps } = tabContent[currentSelectedTab]
            return React.cloneElement(tabContent[currentSelectedTab], {
                style: {
                    ...contentProps.style,
                    position: "relative",
                    width,
                },
            })
        }

        return (
            <div style={{ ...placeholderStyle, height: height - 36 }}>
                Connect another layer on the canvas using the property controls
                for tab "{titles[currentSelectedTab]}"
            </div>
        )
    }, [currentSelectedTab, tabContent, titles, height])

    return (
        <div>
            <ButtonGroup
                name={"framer"}
                className={props.size ? "btn-outline-primary btn-sm" : null}
                defaultValue={selectedTab}
                selectedValue={currentSelectedTab + 1}
                onChange={(e) => {
                    setCurrentSelectedTab(
                        parseInt(e.currentTarget.value, 10) - 1
                    )
                }}
            >
                {titles.map((item, index) => (
                    <RadioButton
                        key={index}
                        value={index + 1}
                        label={props.titles[index]}
                    />
                ))}
            </ButtonGroup>
            {content}
        </div>
    )
}

ButtonGroupTabs.defaultProps = {
    titles: ["Button 1", "Button 2", "Button 3"],
    selectedTab: 0,
    width: 533,
    height: 204,
}

addPropertyControls(ButtonGroupTabs, {
    titles: {
        type: ControlType.Array,
        title: "Columns",
        propertyControl: {
            type: ControlType.String,
            placeholder: "Type name",
            defaultValue: "New item",
        },
        defaultValue: ButtonGroupTabs.defaultProps.titles,
        maxCount: 10,
    },
    selectedTab: {
        type: ControlType.Number,
        defaultValue: 1,
        min: 1,
        max: 10,
        step: 1,
        displayStepper: true,
    },
    tabContent: {
        title: "Content",
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.ComponentInstance,
            title: "Tab Content",
        },
    },
    size: {
        type: ControlType.Boolean,
        defaultValue: false,
        disabledTitle: "Regular",
        enabledTitle: "Small",
    },
})
