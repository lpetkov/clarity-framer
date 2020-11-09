import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import {
    Tabs as Tabs_,
    TabOrientation,
    TabType,
    TabDetails,
    //@ts-ignore
} from "../../../clarity-react/dist/tabs"
import { useManagedState } from "./utils/useManagedState"
import { placeholderStyle } from "./utils/placeholder"

export function Tabs(props) {
    const {
        tabContent,
        tabTitles,
        selectedTab,
        disabledTabs,
        width,
        height,
    } = props
    const [updatedTabData, setUpdatedTabData] = React.useState(null)
    const tabData = React.useMemo(() => {
        if (updatedTabData) {
            setUpdatedTabData(null)
            return updatedTabData
        }

        const disabledTabIndices = disabledTabs
            .split(",")
            .map((index) => parseInt(index, 10) - 1)

        return tabTitles.map((title, index) => {
            let content = tabContent[index]

            if (content) {
                const { props: contentProps } = tabContent[index] as any
                content = React.cloneElement(tabContent[index], {
                    width,
                    style: {
                        ...contentProps.style,
                        position: "relative",
                    },
                })
            } else {
                content = (
                    <div style={{ ...placeholderStyle, height: height - 35 }}>
                        Connect another layer on the canvas using the property
                        controls for tab "{title}"
                    </div>
                )
            }

            return {
                name: title,
                id: `${index}`,
                isDisabled: disabledTabIndices.indexOf(index) > -1,
                isSelected: selectedTab - 1 === index,
                component: content,
            }
        })
    }, [tabContent, height, selectedTab, disabledTabs])
    const handleTabClick = (
        e: React.MouseEvent<HTMLElement>,
        clickedTab: TabDetails,
        updatedTabs: TabDetails[]
    ) => {
        setUpdatedTabData([...updatedTabs])
    }

    return (
        <Tabs_
            tabs={tabData}
            tabOrientation={props.tabOrientation}
            // @ts-ignore
            tabType={TabType.SIMPLE}
            overflowTabsFrom={props.overflowTabsFrom}
            onTabClick={handleTabClick}
        />
    )
}

Tabs.defaultProps = {
    tabTitles: ["Tab 1"],
    tabContent: [<Frame />],
}

addPropertyControls(Tabs, {
    selectedTab: {
        type: ControlType.Number,
        displayStepper: true,
        step: 1,
        min: 1,
        defaultValue: 1,
    },
    tabOrientation: {
        type: ControlType.Enum,
        displaySegmentedControl: true,
        title: "Orientation",
        defaultValue: TabOrientation.HORIZONTAL,
        options: [TabOrientation.HORIZONTAL, TabOrientation.VERTICAL],
        optionTitles: ["Horizontal", "Vertical"],
    },
    tabTitles: {
        type: ControlType.Array,
        title: "Titles",
        propertyControl: {
            type: ControlType.String,
            defaultValue: "Tab name",
        },
        defaultValue: ["Tab 1"],
    },
    tabContent: {
        title: "Content",
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.ComponentInstance,
            title: "Tab Content",
        },
    },
    overflowTabsFrom: {
        type: ControlType.Number,
        displayStepper: true,
        min: 1,
        step: 1,
        title: "Overflow From",
        defaultValue: 3,
    },
    disabledTabs: {
        title: "Disabled",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "1,2",
    },
})
