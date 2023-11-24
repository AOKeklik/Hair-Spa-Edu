import RevealSections from "./include/RevealSetions.js"

const path = window.location.pathname
if (!path.startsWith("/src")) return

new RevealSections(".header, .reveal-4", true)
new RevealSections(".page-single-product .reveal-2", false, false, 0)