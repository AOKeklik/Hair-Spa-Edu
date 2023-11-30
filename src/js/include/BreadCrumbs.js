class BreadCrumbs {
    parentElement
    baseUrl
    currentPage
    constructor () {
        this.events()
    }
    events () {
        this.setLinks()
        this.renderBreadCrumbs()
    }
    setLinks () {
        this.parentElement = document.querySelector("[data-breadcrumbs]")
        this.baseUrl = window.location.origin

        const rawLinks = window.location.pathname
            .slice()
			.split("/")
			.filter(Boolean)

        
        this.currentPage = rawLinks.slice().pop().replace(/\.(html|php)/, "")
         

        console.log(this.baseUrl)
        console.log(rawLinks)
    }
    renderBreadCrumbs () {
        console.log(this.parentElement)
        this.parentElement.innerHTML = ""
        this.parentElement.insertAdjacentHTML("afterbegin", 
        `<a hre="${this.baseUrl}">home</a>
        <span>${this.currentPage}</span>`)
    }
}

new BreadCrumbs