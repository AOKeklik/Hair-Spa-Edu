class BreadCrumbs {
	parentElement
	baseUrl
	currentPage
	constructor() {
		this.parentElement = document.querySelector("[data-breadcrumbs]")
		if (!this.parentElement) return
		this.events()
	}
	events() {
		this.setLinks()
		this.renderBreadCrumbs()
	}
	setLinks() {
		this.baseUrl = window.location.origin

		const rawLinks = window.location.pathname
			.slice()
			.split("/")
			.filter(Boolean)

		this.currentPage = rawLinks
			.slice()
			.pop()
			.replace(/\.(html|php)/, "")
	}
	renderBreadCrumbs() {
		this.parentElement.innerHTML = ""
		this.parentElement.insertAdjacentHTML(
			"afterbegin",
			`<a href="${this.baseUrl}">home</a>
        <a href="${this.baseUrl}/${this.currentPage}">${this.currentPage}</a>`
		)
	}
}

new BreadCrumbs()
