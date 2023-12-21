class LightBox {
	boxs
	currentImg
	constructor() {
		this.boxs = document.querySelectorAll("[data-lightbox] img")
		if (!this.boxs) return
		this.renderLightBox()
		this.lightbox = document.querySelector(".lightbox")
		this.lightboxIMG = document.querySelector(".lightbox img")
		this.events()
	}
	events() {
		this.lightbox.addEventListener("click", this.closeLightBox.bind(this))
		this.lightbox.addEventListener("click", this.doSlide.bind(this))
		this.boxs.forEach(el =>
			el.addEventListener("click", this.openLightBox.bind(this))
		)
	}
	async openLightBox(e) {
		this.currentImg = e.target
		this.lightboxIMG.src = this.currentImg.src
		await this._wait(3)
		this.lightbox.classList.add("lightbox-active")
	}
	doSlide(e) {
		const left = e.target.closest(".lightbox-btn-left")
		const right = e.target.closest(".lightbox-btn-right")
		if (left) this.previousSlide()
		if (right) this.nextSlide()
	}
	async previousSlide() {
		const currentIndex = this._currentImgIndex()
		const prev = currentIndex > 0 ? currentIndex - 1 : this.boxs.length - 1
		this.currentImg = this.boxs[prev]

		if (this.lightboxIMG.isWaiting !== undefined) return
		this.lightboxIMG.isWaiting = true

		this.lightboxIMG.style.opacity = "0"
		this.lightboxIMG.style.transform = "translate(10%, 0)"
		await this._wait(5)
		this.lightboxIMG.src = this.currentImg.src
		this.lightboxIMG.style.transform = "translate(-10%, 0)"
		await this._wait(5)
		this.lightboxIMG.style.opacity = "1"
		this.lightboxIMG.style.transform = "translate(0%, 0%)"

		await this._wait(1)

		this.lightboxIMG.isWaiting = undefined
	}
	async nextSlide() {
		const currentIndex = this._currentImgIndex()
		const next = currentIndex < this.boxs.length - 1 ? currentIndex + 1 : 0
		this.currentImg = this.boxs[next]

		if (this.lightboxIMG.isWaiting !== undefined) return
		this.lightboxIMG.isWaiting = true

		this.lightboxIMG.style.opacity = "0"
		this.lightboxIMG.style.transform = "translate(-10%, 0)"
		await this._wait(5)
		this.lightboxIMG.src = this.currentImg.src
		this.lightboxIMG.style.transform = "translate(10%, 0)"
		await this._wait(5)
		this.lightboxIMG.style.opacity = "1"
		this.lightboxIMG.style.transform = "translate(0%, 0%)"

		await this._wait(1)

		this.lightboxIMG.isWaiting = undefined
	}
	async closeLightBox(e) {
		const theNode = e.target.closest(".lightbox-btn-close")
		if (!theNode) return

		this.lightboxIMG.style = " "

		await this._wait(3)

		this.lightbox.classList.remove("lightbox-active")
	}
	renderLightBox() {
		const markup = `<div class="lightbox">
			<span class="lightbox-btn lightbox-btn-left"><</span>
			<span class="lightbox-btn lightbox-btn-right">></span>
			<span class="lightbox-btn lightbox-btn-close">&times;</span>
			<img src="" alt="">
		</div>`
		document.body.insertAdjacentHTML("beforeend", markup)
	}
	_currentImgIndex() {
		const arr = Array.prototype.slice.call(this.boxs)
		return arr.indexOf(this.currentImg)
	}
	_wait(ms) {
		return new Promise(resolve => setTimeout(resolve, ms * 100))
	}
}

new LightBox()
