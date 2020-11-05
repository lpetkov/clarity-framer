import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { motion, useMotionValue, useTransform } from "framer";


export function Toast(props) {
    const { title, description, type, onTap, ...rest } = props

    // info icon animation 
    const bgVariants = {
        checked: { scale: 1 },
        unchecked: { scale: 0.8 },
    }

    const checkVariants = {
        checked: { pathLength: 0.9 },
        unchecked: { pathLength: 0 }
    };
    const [isChecked, setIsChecked] = React.useState(true);
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

    return (
        // bg
        <Frame
            {...rest}
            background={"#25333D"}
            // TODO: Tap event
            // onTap={onTap}
            borderRadius={3}
            shadow={"0px 2px 10px rgba(0,0,0,.4)"}
        >
            {/* icon */}
            <motion.div
                style={{
                    width: 36,
                    height: 36,
                    backgroundColor: "none",
                    position: "absolute",
                    top: 9,
                    left: 9,
                }}
                variants={bgVariants}
                initial={"checked"}
                animate={isChecked ? "checked" : "unchecked"}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onTap={() => setIsChecked(!isChecked)}
            >
            
                {/* info icon  */}
                {props.type === "info" && (
                    // initial motion path work
                    // <svg width="36" height="36" viewBox="0 0 36 36">
                    //     <path id="info-icon-outline" d="M18,7A11,11,0,1,1,7,18,11,11,0,0,1,18,7"/>
                    //     <circle id="info-icon-dot" cx="17.9" cy="11.85" r="1.3"/>
                    //     <motion.path id="info-icon-line" d="M38 74.707l24.647 24.646L116.5 45.5" 
                    //         fill="none" 
                    //         stroke="#000" 
                    //         stroke-linecap="round" 
                    //         stroke-miterlimit="10" 
                    //         stroke-width="2"
                    //         variants={checkVariants}
                    //         style={{ pathLength: pathLength, opacity: opacity }}
                    //     />
                    // </svg>

                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 18C6 11.3726 11.3726 6 18 6C21.1826 6 24.2348 7.26428 26.4853 9.51472C28.7357 11.7652 30 14.8174 30 18C30 24.6274 24.6274 30 18 30C11.3726 30 6 24.6274 6 18ZM19.33 11.9C19.33 12.6732 18.7032 13.3 17.93 13.3C17.1568 13.3 16.53 12.6732 16.53 11.9C16.53 11.1268 17.1568 10.5 17.93 10.5C18.7032 10.5 19.33 11.1268 19.33 11.9ZM18 28C12.4772 28 8 23.5228 8 18C8 12.4772 12.4772 8 18 8C23.5228 8 28 12.4772 28 18C28 20.6522 26.9464 23.1957 25.0711 25.0711C23.1957 26.9464 20.6522 28 18 28ZM19 23H21C21.5523 23 22 23.4477 22 24C22 24.5523 21.5523 25 21 25H15C14.4477 25 14 24.5523 14 24C14 23.4477 14.4477 23 15 23H17V17H16C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15H19V23Z" fill="#0095D3"/>
                    </svg>
                )}
                {/* warning icon  */}
                {props.type === "warning" && (
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.59 7.6L30.33 25.54V25.57C30.8343 26.5 30.8114 27.627 30.2698 28.5358C29.7282 29.4446 28.748 30.001 27.69 30H8.21001C7.14299 30.0069 6.15264 29.4464 5.60911 28.5282C5.06558 27.61 5.05069 26.4721 5.57001 25.54L15.32 7.6C15.8453 6.63488 16.8562 6.03415 17.955 6.03415C19.0538 6.03415 20.0647 6.63488 20.59 7.6ZM27.69 27.97C28.0431 27.9699 28.3699 27.7837 28.55 27.48C28.7311 27.1767 28.7387 26.8004 28.57 26.49L18.83 8.55C18.6554 8.22658 18.3175 8.02498 17.95 8.02498C17.5825 8.02498 17.2446 8.22658 17.07 8.55L7.33001 26.49C7.16025 26.8003 7.16699 27.1771 7.34774 27.4811C7.52848 27.7851 7.85635 27.971 8.21001 27.97H27.69ZM17.95 25.77C18.7784 25.77 19.45 25.0984 19.45 24.27C19.45 23.4416 18.7784 22.77 17.95 22.77C17.1216 22.77 16.45 23.4416 16.45 24.27C16.45 25.0984 17.1216 25.77 17.95 25.77ZM19.3 20.02C19.3 20.738 18.718 21.32 18 21.32C17.6517 21.32 17.318 21.1803 17.0736 20.9322C16.8292 20.6841 16.6946 20.3482 16.7 20V14C16.7 13.282 17.282 12.7 18 12.7C18.718 12.7 19.3 13.282 19.3 14V20.02Z"
                            fill="#EDB200"
                        />
                    </svg>
                )}
                {/* error icon  */}
                {props.type === "error" && (
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6 18C6 11.3726 11.3726 6 18 6C21.1826 6 24.2348 7.26428 26.4853 9.51472C28.7357 11.7652 30 14.8174 30 18C30 24.6274 24.6274 30 18 30C11.3726 30 6 24.6274 6 18ZM16.7 18.77C16.7 19.488 17.282 20.07 18 20.07C18.718 20.07 19.3 19.488 19.3 18.77V12.77C19.3 12.052 18.718 11.47 18 11.47C17.282 11.47 16.7 12.052 16.7 12.77V18.77ZM18 28C12.4772 28 8 23.5228 8 18C8 12.4772 12.4772 8 18 8C23.5228 8 28 12.4772 28 18C28 20.6522 26.9464 23.1957 25.0711 25.0711C23.1957 26.9464 20.6522 28 18 28ZM19.45 23.02C19.45 23.8484 18.7784 24.52 17.95 24.52C17.1216 24.52 16.45 23.8484 16.45 23.02C16.45 22.1916 17.1216 21.52 17.95 21.52C18.7784 21.52 19.45 22.1916 19.45 23.02Z"
                            fill="#F54F47"
                        />
                    </svg>
                )}
            </motion.div>

            {/* title */}
            <Frame
                height={18}
                width={294}
                background={null}
                y={18}
                x={51}
                style={{
                    textAlign: "left",
                    justifyContent: "start",
                    display: "flex",
                    fontSize: 14,
                    lineHeight: 24,
                    fontWeight: 600,
                    color: "#E9ECEF",
                }}
            >
                {title}
            </Frame>

            {/* description */}
            <Frame
                width={330}
                height={36}
                background={null}
                y={42}
                x={51}
                style={{
                    textAlign: "left",
                    justifyContent: "start",
                    fontSize: 13,
                    lineHeight: "18px",
                    fontWeight: "normal",
                    color: "#ADBBC4",
                    verticalAlign: "top",
                }}
            >
                {description}
            </Frame>
        </Frame>
    )
}

Toast.defaultProps = {
    height: 126,
    width: 414,
    title: "Short Title not to Exceed 35 Characters",
    description:
        "A short description of the event. Information not to exceed 156 characters.",
    // onValueChange: value => null,
}

addPropertyControls(Toast, {
    title: {
        title: "Title",
        type: ControlType.String,
    },
    description: {
        title: "Description",
        type: ControlType.String,
    },
    type: {
        type: ControlType.Enum,
        defaultValue: "info",
        options: ["info", "warning", "error"],
        optionTitles: ["Info", "Warning", "Error"],
    },
})
