import * as React from "react"
import { Frame, addPropertyControls, ControlType, Stack } from "framer"
import { Icon } from "./Icon"
//@ts-ignore
//import { Button } from "./Button"
import {
    ButtonSize,
    ButtonState,
    //@ts-ignore
} from "../../../clarity-react/dist/forms/button/Button"

export function Modal(props) {
    return (
        <Frame
            size={"100%"}
            background="white"
            borderRadius={3}
            style={{
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 2px 2px",
            }}
        >
            <Frame size={24} right={24} top={24} background={null}>
                <Icon shape="close" size={24} />
            </Frame>
            <Frame
                name="title"
                width="100%"
                height={24}
                top={24}
                background={null}
                style={{
                    fontFamily: "Metropolis",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "22px",
                    lineHeight: "24px",
                    color: "#000000",
                    textAlign: "start",
                    padding: "0 24px 0 24px",
                }}
            >
                <span>{props.title}</span>
            </Frame>

            {props.contentType ? (
                <Frame
                    background={null}
                    size="100%"
                    top={74}
                    left={24}
                    right={24}
                    width="100%"
                >
                    {props.children}
                </Frame>
            ) : (
                <Frame
                    background={null}
                    position="relative"
                    size="100%"
                    style={{
                        padding: "74px 24px 72px 24px",
                        fontFamily: "Metropolis",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "14px",
                        lineHeight: "24px",
                    }}
                >
                    <span>{props.contentTypeText}</span>
                </Frame>
            )}

            <Frame
                bottom={18}
                background="null"
                width="100%"
                style={{
                    height: "36px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    overflow: "visible",
                    paddingRight: "12px",
                }}
            >
                {props.singleButton ? (
                    <button
                        className="btn"
                        onClick={props.modalButtonRightLink}
                    >
                        {props.modalButtonLeft}
                    </button>
                ) : null}
                <button
                    className="btn btn-primary"
                    onClick={props.modalButtonLeftLink}
                >
                    {props.modalButtonRight}
                </button>
            </Frame>
        </Frame>
    )
}

Modal.defaultProps = {
    modalButtonLeft: "Cancel",
    modalButtonRight: "complete",
    title: "Modal title",
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Modal, {
    title: {
        type: ControlType.String,
        title: "Title ",
        defaultValue: "Modal title",
    },
    contentType: {
        type: ControlType.Boolean,
        title: "Content",
        defaultValue: false,
        disabledTitle: "Text",
        enabledTitle: "Component",
    },
    contentTypeText: {
        type: ControlType.String,
        title: "Body text",
        defaultValue:
            "The truth seldom lies, but when it does lie it lies somewhere in between.",
        hidden(props) {
            return props.contentType === true
        },
    },
    singleButton: {
        type: ControlType.Boolean,
        title: "Single CTA",
        defaultValue: false,
        disabledTitle: "Yes",
        enabledTitle: "No",
    },
    modalButtonLeft: {
        type: ControlType.String,
        title: "Left Button",
        defaultValue: "Cancel",
        hidden(props) {
            return props.singleButton === false
        },
    },
    modalButtonRight: {
        type: ControlType.String,
        title: "Right Button",
        defaultValue: "run",
    },
    modalButtonRightLink: { type: ControlType.EventHandler },
    modalButtonLeftLink: { type: ControlType.EventHandler },

    modalButtonRightstate: {
        type: ControlType.SegmentedEnum,
        defaultValue: ButtonState.INFO,
        options: [ButtonState.SUCCESS, ButtonState.WARNING, ButtonState.INFO],
        optionTitles: ["Success", "Err", "Info"],
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})
