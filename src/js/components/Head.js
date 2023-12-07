class Head {
	constructor() {
		this.changeTitle()
	}

	changeTitle() {
		const rawLink = window.location.pathname
			.split("/")
			.filter(Boolean)
			.pop()
		const currentLink =
			rawLink !== undefined && rawLink.replace(/\.(html|php)/, "")

		if (!rawLink) document.title = "Hair & Spa Edu"
		else document.title = currentLink.replace(/^\w/, n => n.toUpperCase())
	}
}

new Head()
