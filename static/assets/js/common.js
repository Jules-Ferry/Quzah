const navButtons = document.querySelector("section.buttons")

if (navButtons) {
    for (const button of navButtons.children) {
        button.addEventListener("click", () => {
            const page = button.getAttribute("page")
            if (page) {
                window.location.href = page
            }
        })
    }
}