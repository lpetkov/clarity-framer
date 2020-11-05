import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

// Learn more: https://framer.com/api

export function CustomCard(props) {
    const { img, header } = props

    return (
        <Frame
            size="100%"
            background="white"
            borderRadius={3}
            style={{
                border: "1px solid #d7d7d7",
                borderBottom: "4px solid #d7d7d7",
            }}
        >
            <Frame
                name="header"
                top={0}
                left={24}
                background={null}
                height={50}
                style={{
                    justifyContent: "left",
                    fontFamily: "Metropolis",
                    fontSize: "18",
                    color: "black",
                }}
            >
                {props.header}
            </Frame>
            <Frame
                name="image"
                top={50}
                width="100%"
                height={348}
                background={{ src: img }}
            ></Frame>
        </Frame>
    )
}

CustomCard.defaultProps = {
    height: 348,
    width: 242,
    text: "Get started!",
    tint: "#0099ff",
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(CustomCard, {
    header: {
        title: "Header",
        type: ControlType.String,
        defaultValue: "Hello Framer!",
    },
    img: {
        type: ControlType.Image,
    },
})
