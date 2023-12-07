class BreadCrumbs {
	parentElement
	baseUrl
	links
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

		this.links = rawLinks.slice().map(n => {
			return n.replace(/\.(html|php)/, "")
		})
	}
	renderBreadCrumbs() {
		this.parentElement.innerHTML = ""

		let markup = `<a href="${this.baseUrl}">Home</a>`
		let link = this.baseUrl

		this.links.forEach((el, i, arr) => {
			link += "/" + el
			markup += `<a href="${link}">${el}</a>`
		})

		this.parentElement.insertAdjacentHTML("afterbegin", markup)
	}
}

new BreadCrumbs()
