class MakeList {
    parentElement
	constructor() {
		this.parentElement = document.querySelectorAll("[data-list-span]")
		if (!this.parentElement) return

        this.parentElement.forEach(el => this.doList(el))
    }
    doList(el) {
        const className = el.dataset.listSpan
        const theArry = el.textContent.trim().split(',')
        el.innerHTML = ""
        theArry.forEach(text => {
            const newEl = document.createElement("span")
            newEl.textContent = text
            newEl.className = className
            el.appendChild(newEl)
        })
        
    }
}
new MakeList()