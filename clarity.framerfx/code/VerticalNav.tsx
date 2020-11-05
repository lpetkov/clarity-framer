import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

import { VerticalNav as VerticalNav_ } from "../../../clarity-react/dist/layout/vertical-nav/VerticalNav"
import { VerticalNavGroup } from "../../../clarity-react/dist/layout/vertical-nav/VerticalNavGroup"

import { NavLink } from "../../../clarity-react/dist/layout/nav/NavLink"
import { MainContainer } from "../../../clarity-react/dist/layout/main-container/MainContainer"

/* 
We need the clarity-react component to support isCollapsed as a prop
 */
export function VerticalNav(props) {
    return (
        <VerticalNav_>
            {props.menuItemsArray.map((value, index) => {
                return <NavLink>{props.menuItemsArray[index]}</NavLink>
            })}
        </VerticalNav_>
    )
}

VerticalNav.defaultProps = {
    menuItemsArray: ["Default Link 1", "Default Link 2", "Default Link 3"],
}

addPropertyControls(VerticalNav, {
    menuItemsArray: {
        title: "Add and Remove Radio Buttons",
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
            defaultValue: `Radio button`,
        },
    },
})
