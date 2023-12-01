class LightBox {
	boxs
	constructor() {
		this.boxs = document.querySelectorAll("[data-lightbox] img")
		if (!this.boxs) return

		this.lightbox = document.querySelector(".lightbox")

		this.events()
	}
	events() {
		this.renderLightBox()
		this.lightbox.addEventListener("click", this.closeLightBox.bind(this))
		this.boxs.forEach(el =>
			el.addEventListener("click", this.openLightBox.bind(this))
		)
	}
	openLightBox(e) {
		this.lightbox.classList.add("lightbox-active")
	}
	closeLightBox(e) {
		const theNode = e.target.closest(".lightbox-btn-close")

		if (!theNode) return

		this.lightbox.classList.remove("lightbox-active")
	}
	renderLightBox() {
		console.log(this.boxs)
	}
}

new LightBox()
