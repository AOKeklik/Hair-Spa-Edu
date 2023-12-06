class Slider {
	parentElement
	currentSlide = 0
	length
	waitForAnimation = false
	constructor() {
		this.parentElement = document.querySelector(".slider")
		if (!this.parentElement) return
		this.slides = document.querySelectorAll(".slider-slide")
		this.control = document.querySelector(".slider-control")
		this.dots = document.querySelector(".slider-dots")

		this.renders()
		this.events()
	}
	renders() {
		this.renderControls()
	}
	events() {
		const that = this
		this.executeSlider()
		this.control.addEventListener("click", function (e) {
			const next = e.target.closest(".slider-next")
			const prev = e.target.closest(".slider-prev")
			if (next) that.nextSlider()
			if (prev) that.prevSlider()
		})
		this.dots.addEventListener("click", function (e) {
			const dot = e.target.closest(".slider-dot")
			if (!dot) return
			that.dotSlider(e)
		})
	}
	executeSlider() {
		const prevSlide =
			this.currentSlide > 0 ? this.currentSlide - 1 : this.length - 1
		const nextSlide =
			this.currentSlide < this.length - 1 ? this.currentSlide + 1 : 0

		this.slides.forEach(el => {
			el.classList.remove("prev-slide", "current-slide", "next-slide")
		})

		this.slides[prevSlide].classList.add("prev-slide")
		this.slides[this.currentSlide].classList.add("current-slide")
		this.slides[nextSlide].classList.add("next-slide")

		this.activeDot()
	}
	nextSlider() {
		if (this.waitForAnimation) return
		this.currentSlide =
			this.currentSlide < this.length - 1 ? this.currentSlide + 1 : 0
		this.executeSlider()
		this.setWaitForAnimation()
	}
	prevSlider() {
		if (this.waitForAnimation) return
		this.currentSlide =
			this.currentSlide > 0 ? this.currentSlide - 1 : this.length - 1
		this.executeSlider()
		this.setWaitForAnimation()
	}
	dotSlider(e) {
		const theNode = +e.target.dataset.slide
		this.currentSlide = theNode
		this.executeSlider()
	}
	activeDot() {
		const theItems = document.querySelectorAll(".slider-dot")
		theItems.forEach(el => {
			el.classList.remove("active-dot")
		})
		theItems[this.currentSlide].classList.add("active-dot")
	}
	renderControls() {
		this.length = this.slides.length
		const markup = Array.from({ length: this.length }, (n, i) => {
			if (this.currentSlide === i)
				return `<span data-slide="${i}" class="slider-dot active-dot"></span>`
			return `<span data-slide="${i}" class="slider-dot"></span>`
		}).join("")

		this.dots.innerHTML = ""
		this.dots.insertAdjacentHTML("beforeend", markup)
	}
	setWaitForAnimation() {
		this.waitForAnimation = true
		setTimeout(() => {
			this.waitForAnimation = false
		}, 1000)
	}
}

new Slider()
