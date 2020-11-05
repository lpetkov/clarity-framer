import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import {
    Dropdown as Dropdown_,
    DropdownMenu,
    DropdownItem,
    MenuItemType,
    //@ts-ignore
} from "../../../clarity-react/dist/forms/dropdown"

// Open Preview: Command + P
// Learn more: https://framer.com/api

export function Dropdown(props) {
    console.log(props.items.length)

    return (
        <Dropdown_ label={props.mainLabel}>
            <DropdownMenu>
                <DropdownItem
                    menuItemType={MenuItemType.HEADER}
                    label="Dropdown header"
                />

                {props.items.map((item, index) => (
                    <DropdownItem
                        menuItemType={MenuItemType.ITEM}
                        isHeaderChild={true}
                        label={props.items[index]}
                        onCLick={props.onClick}
                    />
                ))}
                <DropdownItem
                    menuItemType={MenuItemType.ITEM}
                    isHeaderChild={true}
                    label="Disabled Link"
                    isDisabled={true}
                />
                <DropdownItem menuItemType={MenuItemType.DIVIDER} />
                <DropdownItem label="Lorem" />
            </DropdownMenu>
        </Dropdown_>
    )
}

Dropdown.defaultProps = {
    items: [],
}

addPropertyControls(Dropdown, {
    onClick: { type: ControlType.EventHandler },
    mainLabel: {
        type: ControlType.String,
        defaultValue: "Dropdown label",
    },
    items: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
            defaultValue: "Framer",
            placeholder: "Type something…",
        },
    },
})
