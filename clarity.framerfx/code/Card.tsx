import * as React from "react"
import { Frame, addPropertyControls, ControlType, Stack } from "framer"
import {
    Card as Card_,
    CardFooter,
    CardTitle,
    CardImage,
    CardBlock,
    CardText,
    //@ts-ignore
} from "../../../clarity-react/dist/cards/Card"

import { Button } from "../../../clarity-react/dist/forms/button/Button"
import { useConnectedComponentInstance } from "./utils/useConnectedComponentInstance"

export function Card(props) {
    const { cardFrameContent } = props
    const [connectedContent] = useConnectedComponentInstance(cardFrameContent)

    let cardIsClickable = props.cardIsClickable
        ? "onclick - card image top"
        : null
    let cardHasHeader = props.cardHasHeader ? props.cardHeader : null
    return (
        <Frame width="100%" background="null">
            <Card_
                onClick={cardIsClickable}
                header={cardHasHeader}
                style={{ "margin-top": "0px", "min-width": "200px" }}
            >
                {props.cardHasImage ? (
                    <CardImage style={{ "max-height": "250px" }}>
                        <img src={props.cardImageUrl} />
                    </CardImage>
                ) : null}
                <CardBlock>
                    {props.cardHasTitle ? (
                        <CardTitle>
                            {props.hasProgressBar && (
                                <div className="progress top">
                                    <progress
                                        value={props.progressBarValue}
                                        max="100"
                                    ></progress>
                                </div>
                            )}
                            {props.cardTitle}
                        </CardTitle>
                    ) : null}

                    {props.cardHasBodyText && (
                        <CardText>{props.cardBody}</CardText>
                    )}
                    <div style={{ position: "relative" }}>
                        {!props.cardHasBodyText &&
                            // @ts-ignore
                            React.cloneElement(connectedContent, {
                                width: "100%",
                                style: {
                                    // @ts-ignore
                                    ...connectedContent.props.style,
                                    position: "relative",
                                },
                            })}
                    </div>
                </CardBlock>
                {props.cardHasFooter ? (
                    <CardFooter>
                        <button
                            className="btn btn-sm btn-link"
                            onClick={props.cardButtonLeftLink}
                        >
                            {props.cardButtonLeft}
                        </button>
                        <button
                            className="btn btn-sm btn-link"
                            onClick={props.cardButtonRightLink}
                        >
                            {props.cardButtonRight}
                        </button>
                    </CardFooter>
                ) : null}
            </Card_>
        </Frame>
    )
}

Card.defaultProps = {
    cardImageUrl:
        "https://v2.clarity.design/assets/images/documentation/cards/placeholder_350x150.png",
    cardTitle: "Card title",
    cardBody:
        "Card content can contain text, links, images, data visualizations, lists and more.",
    cardButtonLeft: "Left Button",
    cardButtonRight: "Right Button",
    cardHeader: "Card header",
}

addPropertyControls(Card, {
    cardHasHeader: {
        type: ControlType.Boolean,
        title: "Header",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    cardHasTitle: {
        type: ControlType.Boolean,
        title: "Title",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    cardTitle: {
        type: ControlType.String,
        title: "  ",
        hidden(props) {
            return props.cardHasTitle === false
        },
    },
    cardHasBodyText: {
        type: ControlType.Boolean,
        title: "Content",
        defaultValue: false,
        enabledTitle: "Text",
        disabledTitle: "Frame",
    },
    cardBody: {
        type: ControlType.String,
        title: "  ",
        displayTextArea: true,
        hidden(props) {
            return !props.cardHasBodyText
        },
    },
    cardFrameContent: {
        title: "  ",
        type: ControlType.ComponentInstance,
        hidden(props) {
            return props.cardHasBodyText
        },
    },
    cardIsClickable: {
        type: ControlType.Boolean,
        title: "Clickable",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    cardHasImage: {
        type: ControlType.Boolean,
        title: "Image",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    cardImageUrl: {
        type: ControlType.File,
        allowedFileTypes: ["png", "jpg", "jpeg", "svg", "gif"],
        hidden(props) {
            return props.cardHasImage === false
        },
    },
    hasProgressBar: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Progress Bar",
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    progressBarValue: {
        type: ControlType.Number,
        defaultValue: 25,
        min: 0,
        max: 100,
        unit: "%",
        displayStepper: false,
        hidden(props) {
            return props.hasProgressBar === false
        },
    },

    cardHasFooter: {
        type: ControlType.Boolean,
        title: "Footer",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    cardHeader: {
        type: ControlType.String,
        title: "Header",
        hidden(props) {
            return props.cardHasHeader === false
        },
    },
    cardButtonLeft: {
        type: ControlType.String,
        title: "Left Button ",
        hidden(props) {
            return props.cardHasFooter === false
        },
    },
    cardButtonLeftLink: { type: ControlType.EventHandler },
    cardButtonRight: {
        type: ControlType.String,
        title: "Right Button",
        hidden(props) {
            return props.cardHasFooter === false
        },
    },
    cardButtonRightLink: { type: ControlType.EventHandler },
})
