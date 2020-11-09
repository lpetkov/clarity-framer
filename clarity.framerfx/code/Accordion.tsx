import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { Accordion as Accordion_ } from "../../../clarity-react/dist/accordian/Accordion"
import { placeholderStyle } from "./utils/placeholder"
;``
export function Accordion(props) {
    const { items, itemsContent, expandedItems, width, height } = props
    const content = React.useMemo(() => {
        const openItemIndices = expandedItems
            .split(",")
            .map((index) => parseInt(index, 10) - 1)
        return items.map((title, index) => {
            // The inner content is 2px less than the outer size of the frame
            const adjustedWidth = width - 2
            let height = "auto"
            let content = itemsContent[index]

            if (!content) {
                content = (
                    <div style={{ ...placeholderStyle, width: adjustedWidth }}>
                        Connect another layer on the canvas using the property
                        controls for tab "{title}"
                    </div>
                )
            } else {
                content = React.cloneElement(content, {
                    width: adjustedWidth,
                })
                height = content.props.height
            }

            return {
                title,
                itemComponent: (
                    <div
                        style={{
                            width: adjustedWidth,
                            position: "relative",
                            // The inner content applies a .3rem and 1.75rem margin, but we want our content to fill the available space
                            margin: "-.3rem -1.75rem",
                            height,
                        }}
                    >
                        {content}
                    </div>
                ),
                isOpen: openItemIndices.indexOf(index) > -1,
            }
        })
    }, [items, width, height, expandedItems, itemsContent])

    return <Accordion_ content={content} accordionMultiPanel={true} />
}

Accordion.defaultProps = {
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    itemsContent: [],
}

addPropertyControls(Accordion, {
    items: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
            defaultValue: "Framer",
            placeholder: "Type something…",
        },
    },
    itemsContent: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.ComponentInstance,
        },
    },
    expandedItems: {
        title: "Expanded",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "1,2",
    },
})
