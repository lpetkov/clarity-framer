import * as React from "react"
import { Frame, addPropertyControls, ControlType, motion, useMotionValue, useTransform } from "framer"

export function Snackbar(props) {
    const { description, tint, onTap, ...rest } = props

    // icon animation 
    const checkVariants = {
        checked: { pathLength: 0.9 },
        unchecked: { pathLength: 0 }
    };
    // const [isChecked, setIsChecked] = React.useState(true);
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);


    return (
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
                    top: 6,
                    left: 6,
                }}
            >

                {/* svg */}
                <svg width="36" height="36" viewBox="0 0 36 36">
                    <path id="success-icon-outline" d="M18,7A11,11,0,1,1,7,18,11,11,0,0,1,18,7" fill="none" stroke="#60B515" strokeMiterlimit="10" strokeWidth="2"/>
                    <motion.path id="success-icon-check" d="M12.2,18.2l4.1,4.1L23.7,15" fill="none" stroke="#60B515" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"
                        // variants={checkVariants}
                        // style={{ pathLength: pathLength, opacity: opacity }}
                    />
                </svg>
                
            </motion.div>

            {/* description */}
            <Frame
                height={18}
                background={null}
                top={15}
                left={48}
                width={props.width - (51+36)}
                style={{
                    textAlign: "left",
                    justifyContent: "start",
                    color: "#E9ECEF",
                    fontSize: 14,
                }}
            > 
                {description}
            </Frame>
        </Frame>
    )
}

Snackbar.defaultProps = {
    height: 48,
    width: 500,
    description: "A short confirmation message not to exceed 156 characters",
}

addPropertyControls(Snackbar, {
    description: {
        title: "Text",
        type: ControlType.String,
    },
    onTap: {
        type: ControlType.EventHandler,
    },
})
