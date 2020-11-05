import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { Accordion as Accordion_ } from "../../../clarity-react/dist/accordian/Accordion"

export function AccordionNested(props) {
    let itemTitles = []
    const { items, itemsContent } = props
    console.log(items)

    const accordionContent = [
        { title: "Item 1", itemComponent: "Content 1" },
        { title: "Item 2", itemComponent: "Content 2" },
        { title: "Item 3", itemComponent: "Content 3" },
    ]

    const nesteAccordionContent = [
        { title: "Item 1", itemComponent: "Content 1" },
        {
            title: "Item 2",
            itemComponent: (
                <Accordion_
                    content={accordionContent}
                    accordionMultiPanel={true}
                />
            ),
        },
    ]

    return (
        <Accordion_
            content={nesteAccordionContent}
            accordionMultiPanel={true}
        />
    )
}

AccordionNested.defaultProps = {
    items: [],
    itemsContent: [],
}

addPropertyControls(AccordionNested, {
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
