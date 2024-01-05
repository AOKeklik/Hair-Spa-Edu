// class MakeList {
//     parentElement
// 	constructor() {
// 		this.parentElement = document.querySelectorAll("[data-list-span]")
// 		if (!this.parentElement) return

//         this.parentElement.forEach(el => this.doList(el))
//     }
//     doList(el) {
//         const className = el.dataset.listSpan
//         const theArry = el.textContent.trim().split(',')
//         el.innerHTML = ""
//         theArry.forEach(text => {
//             const newEl = document.createElement("span")
//             newEl.textContent = text
//             newEl.className = className
//             el.appendChild(newEl)
//         })
        
//     }
// }
class MakeList {
    parentElement
    constructor(parent) {
        this.parentElement = parent
        this.type = parent.dataset.type
        this.dispatcher()
    }
    dispatcher () {
        if (this.type === "link") this.doLinkList()
        if (this.type === "text") this.doTextList()
    }
    doTextList() {
        const that = this
        const theArry = this.parentElement.textContent.trim().split(',')
        this.parentElement.innerHTML = ""

        theArry.forEach(text => {
            const newEl = document.createElement("span")
            newEl.textContent = text
            that.parentElement.appendChild(newEl)
        })        
    }
    doLinkList () {
        const that = this
        const theArry = this.parentElement.textContent.trim().split(',')
        this.parentElement.innerHTML = ""

        theArry.forEach(text => {
            const newEl = document.createElement("a")
            newEl.textContent = text
            newEl.href = text.includes("@") ? "mail:" : text.includes("+") ? "tel:" : ""
            newEl.href += text
            that.parentElement.appendChild(newEl)
        }) 
    }
}

const parentElement = document.querySelectorAll("[rol=convert-text]")
if (parentElement.length > 0) {
    parentElement.forEach(e => new MakeList(e))
}