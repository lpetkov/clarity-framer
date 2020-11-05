import * as React from "react"
import { Component } from "react"
import { Frame, addPropertyControls, ControlType, Stack } from "framer"

//@ts-ignore
import { MainContainer } from "../../../clarity-react/dist/layout/main-container/MainContainer"
//@ts-ignore
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

export function Card(props) {
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
                        <CardTitle>{props.cardTitle}</CardTitle>
                    ) : null}

                    {props.cardHasBody ? (
                        <CardText>
                            Card content can contain text, links, images, data
                            visualizations, lists and more.
                        </CardText>
                    ) : null}
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
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    cardHasBody: {
        type: ControlType.Boolean,
        title: "Body Text",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
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
    },
    cardHasFooter: {
        type: ControlType.Boolean,
        title: "Footer",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },

    cardTitle: { type: ControlType.String, title: "Title" },
    cardHeader: { type: ControlType.String, title: "Header" },
    cardBody: { type: ControlType.String, title: "Body text" },
    cardButtonLeft: { type: ControlType.String, title: "Left Button " },
    cardButtonLeftLink: { type: ControlType.EventHandler },
    cardButtonRight: { type: ControlType.String, title: "Right Button" },
    cardButtonRightLink: { type: ControlType.EventHandler },
})
