import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

import {
    Alert as Alert_,
    AlertItem,
    AlertLevel,
    AlertSize,
    AlertType,
} from "../../../clarity-react/dist/emphasis/alert/"
import { Icon } from "../../../clarity-react/dist/icon/Icon"
import { Button } from "./Button"

export function Alert(props) {
    const [isOpen, setIsOpen] = React.useState(true)
    const { messagesInAlert, ...rest } = props

    let alertSize = props.alertSize ? null : AlertSize.COMPACT
    let alertAppLevel = props.alertAppLevel ? null : AlertLevel.APP
    //TODO expose <AlertItem> icons through the prop controls

    const handleClick = (e, index) => {
        e.preventDefault()
        if (props[`onLinkClick${index + 1}`]) {
            props[`onLinkClick${index + 1}`]()
        }
    }

    const handleOnClose = () => {
        setIsOpen(false)
    }
    if (!isOpen) {
        return null
    }
    return (
        <Alert_
            width={400}
            type={props.alertType}
            closeable={props.alertIsCloseable}
            size={alertSize}
            onClose={handleOnClose}
            level={alertAppLevel}
        >
            {messagesInAlert.map((value, index) => {
                if (props.hasAction) {
                    return (
                        <AlertItem
                            actions={
                                <a
                                    href="javascript://"
                                    onClick={(e) => handleClick(e, index)}
                                >
                                    {props.action}
                                </a>
                            }
                            icon={<Icon shape={props.icon} />}
                        >
                            {props.messagesInAlert[index]}
                        </AlertItem>
                    )
                } else {
                    return (
                        <AlertItem icon={<Icon shape={props.icon} />}>
                            {props.messagesInAlert[index]}
                        </AlertItem>
                    )
                }
            })}
        </Alert_>
    )
}

Alert.defaultProps = {
    alertType: "AlertType.DANGER",
    closeable: true,
    size: false,
    messagesInAlert: ["Alert message"],
}

addPropertyControls(Alert, {
    messagesInAlert: {
        type: ControlType.Array,
        title: "Messages",

        propertyControl: {
            type: ControlType.String,
            placeholder: "Type alert message",
        },
    },
    alertAppLevel: {
        title: "Alet level",
        type: ControlType.Boolean,
        enabledTitle: "Standard",
        disabledTitle: "App level",
    },

    alertType: {
        type: ControlType.Enum,
        defaultValue: "AlertType.DANGER",
        options: [
            AlertType.DANGER,
            AlertType.INFO,
            AlertType.WARNING,
            AlertType.SUCCESS,
        ],
        optionTitles: ["Danger", "Info", "Warning", "Success"],
    },
    alertIsCloseable: {
        type: ControlType.Boolean,
        title: "Closeable",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    alertSize: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: true,
        enabledTitle: "Regular",
        disabledTitle: "Small",
    },
    hasAction: {
        type: ControlType.Boolean,
        title: "Action",
        enabledTitle: "Yes",
        disabledTitle: "No",
        defaultValue: true,
    },
    action: {
        type: ControlType.String,
        defaultValue: "Action",
        title: "CTA",
        hidden(props) {
            return props.hasAction === false
        },
    },
    icon: {
        type: ControlType.String,
        defaultValue: "error",
        title: "Icon",
    },
    onLinkClick1: {
        type: ControlType.EventHandler,
    },
    onLinkClick2: {
        type: ControlType.EventHandler,
    },
    onLinkClick3: {
        type: ControlType.EventHandler,
    },
    onLinkClick4: {
        type: ControlType.EventHandler,
    },
    onLinkClick5: {
        type: ControlType.EventHandler,
    },
})
