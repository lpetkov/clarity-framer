import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

import {
    Select,
    SelectOption,
} from "../../../clarity-react/dist/forms/select/Select"

export function SelectBox(props) {
    const {
        itemsArray,
        label,
        errorHelperText,
        error,
        showDefaultSelect,
        defaultHelperText,
        ...rest
    } = props

    const handleChange = (e) => {
      const parsedValue = parseInt(e.currentTarget.value, 10)
      /**
       * If we were using this component within a code override, we may want to hook
       * some logic into what item was currently selected. If we attach a code override like so:
       * 
       * export function SmartSelect(props): Override {
       *  return {
       *      onChange(selectedIndex) {
       *        console.log('User selected index ' + selectedIndex)
       *      }
       *    }
       * }
       */
      if(props.onChange) {
        props.onChange(parsedValue)
      }

      switch(parsedValue) {
        case 0:
          if(props.onOption1Select) {
            props.onOption1Select()
          }
          break;
        case 1:
          if(props.onOption2Select) {
            props.onOption2Select()
          }
          break;
        case 2:
          if(props.onOption3Select) {
            props.onOption3Select()
          }
          break;
        case 3:
          if(props.onOption4Select) {
            props.onOption4Select()
          }
          break;
        case 4:
          if(props.onOption5Select) {
            props.onOption5Select()
          }
          break;
        case 5:
          if(props.onOption6Select) {
            props.onOption6Select()
          }
          break;
        case 6:
          if(props.onOption7Select) {
            props.onOption7Select()
          }
          break;
        case 7:
          if(props.onOption8Select) {
            props.onOption8Select()
          }
          break;
        case 8:
          if(props.onOption9Select) {
            props.onOption9Select()
          }
          break;
        case 9:
          if(props.onOption10Select) {
            props.onOption10Select()
          }
          break;
      }
    }

    return (
        <Frame width="100%" height="100%" background="null">
            <Select
                showDefaultSelect={showDefaultSelect}
                width="100%"
                label={label}
                error={error}
                defaultHelperText={defaultHelperText}
                errorHelperText={errorHelperText}
                onChange={handleChange}
            >
                {itemsArray.map((value, index) => {
                    return (
                        <SelectOption value={index}>
                            {itemsArray[index]}{" "}
                        </SelectOption>
                    )
                })}
            </Select>
        </Frame>
    )
}

SelectBox.defaultProps = {
    itemsArray: [],
    showDefaultSelect: true,
    label: "Default",
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(SelectBox, {
    itemsArray: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
            defaultValue: `Radio button label`,
        },
    },
    showDefaultSelect: {
        type: ControlType.Boolean,
        defaultValue: true,
        title: "Default select",
    },
    label: {
        type: ControlType.String,
        defaultValue: "Selectbox label",
        title: "Label",
    },
    defaultHelperText: {
        type: ControlType.String,
        defaultValue: "HelperText",
        title: "Helper text",
    },
    error: {
        type: ControlType.Boolean,
        title: "Error",
        defaultValue: false,
    },
    errorHelperText: {
        type: ControlType.String,
        defaultValue: "Error message",
        title: "Error message",
    },
    onOption1Select: {
      title: "Option 1 Select",
      type: ControlType.EventHandler
    },
    onOption2Select: {
      title: "Option 2 Select",
      type: ControlType.EventHandler
    },
    onOption3Select: {
      title: "Option 3 Select",
      type: ControlType.EventHandler
    },
    onOption4Select: {
      title: "Option 4 Select",
      type: ControlType.EventHandler
    },
    onOption5Select: {
      title: "Option 5 Select",
      type: ControlType.EventHandler
    },
    onOption6Select: {
      title: "Option 6 Select",
      type: ControlType.EventHandler
    },
    onOption7Select: {
      title: "Option 7 Select",
      type: ControlType.EventHandler
    },
    onOption8Select: {
      title: "Option 8 Select",
      type: ControlType.EventHandler
    },
    onOption9Select: {
      title: "Option 9 Select",
      type: ControlType.EventHandler
    },
    onOption10Select: {
      title: "Option 10 Select",
      type: ControlType.EventHandler
    }
})
