class SearchBox {
	constructor() {
		this.link = document.getElementById("searching-box")
		if (!this.link) return
		this.events()
	}
	events() {
		this.renderSearchBox()
		this.renderSeachQuery()
		this.parentElement = document.getElementById("searchbox")
		this.link.addEventListener("click", this.openSearchBox.bind(this))
		this.parentElement.addEventListener(
			"click",
			this.closeSearchBox.bind(this)
		)
	}
	openSearchBox(e) {
		e.preventDefault()
		this.parentElement.classList.add("searchbox-active")
	}
	closeSearchBox(e) {
		const theNode = e.target.closest(".searchbox-btn")
		if (!theNode) return
		this.parentElement.classList.remove("searchbox-active")
	}
	renderSeachQuery() {
		let search = window.location.search
		if (search === "") return

		const parent = document.getElementById("search-query")
		search = window.location.search.split("=")[1].split("+").join(", ")
		parent.innerHTML = ""
		parent.insertAdjacentHTML("afterbegin", search)
	}
	renderSearchBox() {
		const markup = `
            <div id="searchbox">
                <form class="form-control" data-reveal="fade-up-1000-0" method="get" action="${window.location.origin}">
                    <input type="text" class="form-control-input" placeholder="napisz coś..." id="s" type="search" name="s" />
                    <input type="submit" value="szukaj" class="form-send-text">
                </form>
                <span class="searchbox-btn">X</span>
            </div> 
        `
		document.body.insertAdjacentHTML("beforeend", markup)
	}
}
new SearchBox()
