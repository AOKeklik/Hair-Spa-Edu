class SearchBox {
    constructor () {
        this.link = document.getElementById("searching-box")
		if (!this.link) return
        this.events ()
    }
    events () {
        this.renderSearchBox()
        this.parentElement = document.getElementById("searchbox")
        this.link.addEventListener("click", this.openSearchBox.bind(this))
        this.parentElement.addEventListener("click", this.closeSearchBox.bind(this))
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
    renderSearchBox() {
        const markup = `
            <div id="searchbox">
                <div class="form-control" data-reveal="fade-up-1000-0">
                    <input type="text" class="form-control-input" placeholder="napisz coś...">
                    <a href="${/* jsData.searchUrl */ ""}" class="form-send-text">szukaj</a>
                </div>
                <span class="searchbox-btn">X</span>
            </div> 
        `
        document.body.insertAdjacentHTML("beforeend", markup)
    }
}
new SearchBox()