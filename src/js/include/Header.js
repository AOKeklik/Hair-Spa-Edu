class Header {
	constructor() {
		this.header = document.querySelector(".header")
		this.menuItems = document.querySelectorAll(".header .menu-item")
		this.marker = document.querySelector(".header .marker")
		this.burger = document.querySelector(".header .nav-burger")
		this.evnets()
	}
	evnets() {
		this.menuItems.forEach(el => {
			el.addEventListener("mouseenter", this.reLocateMarker.bind(this))
			el.addEventListener("mouseleave", this.reLocateMarker.bind(this))
			el.addEventListener("click", this.toggleActiveMenuItem.bind(this))
		})
		this.burger.addEventListener("click", this.toggleMenu.bind(this))
		this.reloadingActiveMenuItem()
	}
	toggleMenu(e) {
		const theOpen = e.target.closest(".nav-burger-open")
		const theClose = e.target.closest(".nav-burger-close")

		if (theOpen) this.header.classList.add("toggle-nav")
		if (theClose) this.header.classList.remove("toggle-nav")
	}
	toggleActiveMenuItem(e) {
		const theNode = e.target.closest(".menu-item")

		if(!theNode) return

		this.menuItems.forEach(el => {
			el.classList.remove("active")
		})

		theNode.classList.add("active")
	}
	reLocateMarker(e) {
		if (e.type === "mouseleave") return (this.marker.style.height = "0px")
		const theNode = e.target.closest(".menu-item")

		this.marker.style.left = theNode.offsetLeft + "px"
		this.marker.style.top = theNode.offsetTop + "px"
		this.marker.style.width = theNode.offsetWidth + "px"
		this.marker.style.height = theNode.offsetHeight + "px"
	}
	reloadingActiveMenuItem () {
		const currentPage = document.URL

		console.log(currentPage)
		this.menuItems.forEach(el => {
			el.classList.remove("active")
			
			if (el.children[0].href === currentPage)
				el.classList.add("active")
		})
	}
}
new Header()
