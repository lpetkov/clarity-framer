import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
//@ts-ignore
import {
    Tabs as Tabs_,
    TabOrientation,
    TabType,
    TabDetails,
    //@ts-ignore
} from "../../../clarity-react/dist/tabs"
import { useManagedState } from './utils/useManagedState'

const instructionsStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  fontSize: 13,
  fontWeight: 500,
  textAlign: "center",
  color: "#bb88ff",
  backgroundColor: "#2f2546",
  border: "4px solid #8855ff",
  padding: 16,
  overflow: "hidden",
}

export function Tabs(props) {
    const { tabContent, tabTitles, selectedTab, disabledTabs, width, height, } = props;
    const [tabData, setTabData] = React.useState(tabTitles.map((title, index) => {
      let content = tabContent[index]

      if(content) {
        const { props: contentProps } = tabContent[index] as any
        content = React.cloneElement(tabContent[index], {
          width,
          style: {
            ...contentProps.style,
            position: "relative"
          }
        })
      } else {
        content = <div style={{...instructionsStyle, height: height - 35 }}>Connect another layer on the canvas using the property controls for tab "{title}"</div>
      }

      return {
        name: title,
        id: `${index}`,
        isDisabled: false,
        isSelected: selectedTab - 1 === index,
        component: content
      }
    }))
    const handleTabClick = (e: React.MouseEvent<HTMLElement>, clickedTab: TabDetails, updatedTabs: TabDetails[]) => {
      setTabData([...updatedTabs])
    }

    React.useEffect(() => {
      setTabData(tabData.map((tab, index) => {
        return {
          ...tab,
          isSelected: selectedTab - 1 === index
        }
      }))
    }, [selectedTab])

    React.useEffect(() => {
      try {
        const disabledTabIndices = disabledTabs.split(',').map(index => parseInt(index, 10) - 1)
        setTabData(tabData.map((tab, index) => {
          return {
            ...tab,
            isDisabled: disabledTabIndices.indexOf(index) > -1
          }
        }))
      } catch(err) {}
    }, [disabledTabs])

    return (
      <Tabs_
          tabs={tabData}
          tabOrientation={props.tabOrientation}
          tabType={TabType.SIMPLE}
          overflowTabsFrom={props.overflowTabsFrom}
          onTabClick={handleTabClick}
      />
    )
}

Tabs.defaultProps = {
    tabTitles: ["Tab 1"],
    tabContent: [<Frame/>]
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
        optionTitles: ['Horizontal', 'Vertical']
    },
    tabTitles: {
        type: ControlType.Array,
        title: "Titles",
        propertyControl: {
            type: ControlType.String,
            defaultValue: "Tab name",
        },
        defaultValue: ["Tab 1"]
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
        title: "Disabled (1, 2)",
        type: ControlType.String,
        defaultValue: ""
    },
})
