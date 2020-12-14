import { switchTheme, getCurrentTheme, currentTheme } from "./utils/theme"
import "../../../clarity-react/node_modules/@webcomponents/custom-elements/custom-elements.min.js"
import "../../../clarity-react/node_modules/@clr/icons/clr-icons.min.css"
import "../../../clarity-react/node_modules/@clr/icons/clr-icons-lite.min.js"
import "../../../clarity-react/node_modules/@clr/icons/shapes/technology-shapes.js"
import "./styles.css"

async function initTheme() {
    const initialTheme = getCurrentTheme()

    // Theme was changed from Framer's canvas
    window.addEventListener("storage", async (e) => {
        const updatedTheme = getCurrentTheme()

        if (updatedTheme !== currentTheme) {
            switchTheme(updatedTheme)
        }
    })

    await switchTheme(initialTheme)
}

initTheme()
