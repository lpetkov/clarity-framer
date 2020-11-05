import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { Accordion as Accordion_ } from "../../../clarity-react/dist/accordian/Accordion"

export function Accordion(props) {
    let itemTitles = []
    const { items, itemsContent } = props
    console.log(items)

    items.map((value, index) => {
        return itemTitles.push({
            title: items[index],
            itemComponent: (
                <Frame
                    position="relative"
                    width="100%"
                    background={null}
                    height={props.itemHeight}
                    style={{
                        marginTop: "-6px",
                        marginBottom: "-6px",
                        marginRight: "-10px",
                    }}
                >
                    {itemsContent[index]}
                </Frame>
            ),
        })
    })

    return <Accordion_ content={itemTitles} accordionMultiPanel={true} />
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
    itemHeight: {
        type: ControlType.Number,
        defaultValue: 36,
        min: 36,
        max: 300,
        unit: "px",
        step: 10,
        displayStepper: true,
    },
})
