import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { Button } from "../../../clarity-react/dist/forms/button/Button"
import { ButtonGroup } from "../../../clarity-react/dist/forms/button/ButtonGroup"
import { RadioButton } from "../../../clarity-react/dist/forms/radio/RadioButton"
import {
    DropdownMenu,
    Dropdown,
    DropdownItem,
    MenuItemType,
} from "../../../clarity-react/dist/forms/dropdown"
import { useManagedState } from './utils/useManagedState'

import { Icon } from "../../../clarity-react/dist/icon/Icon"

export function ButtonGroupTabs(props) {
    const { width, selectedTab, } = props;
    const [currentSelectedTab, setCurrentSelectedTab] = useManagedState(selectedTab)
    let contentToRender = null;

    if(props.tabContent[currentSelectedTab - 1]) {
      const { props: contentProps } = props.tabContent[currentSelectedTab - 1]
      contentToRender = React.cloneElement(props.tabContent[currentSelectedTab - 1], {
          style: {
              ...contentProps.style,
              position: "relative",
              width
          },
      })
    }

    return (
      <div>
          <ButtonGroup
              className={props.size ? "btn-outline-primary btn-sm" : null}
              defaultValue={selectedTab}
              onChange={(e) => {
                setCurrentSelectedTab(e.currentTarget.value)
              }}
          >
              {props.titles.map((item, index) => (
                  <RadioButton
                      key={index}
                      value={index + 1}
                      label={props.titles[index]}
                  />
              ))}
          </ButtonGroup>
          {contentToRender}
      </div>
    )
}

ButtonGroupTabs.defaultProps = {
    titles: ["Button 1", "Button 2", "Button 3"],
    selectedTab: 0,
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
