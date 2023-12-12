class Slider {
	parentElement
	currentSlide = 0
	length
	waitForAnimation = false
	constructor() {
		this.parentElement = document.querySelector(".slider")
		if (!this.parentElement) return

		this.sliderType = +this.parentElement.dataset.sliderType || 0
		this.slides = document.querySelectorAll(".slider-slide")
		this.control = document.querySelectorAll(".slider-control")

		this.renders()

		this.dots = document.querySelector(".slider-dots")

		this.events()
	}
	renders() {
		this.renderControls()
	}
	events() {
		const that = this
		this.executeSlider()
		this.control.forEach(el => {
			el.addEventListener("click", function (e) {
				const next = e.target.closest(".slider-next")
				const prev = e.target.closest(".slider-prev")
				if (next) that.nextSlider()
				if (prev) that.prevSlider()
			})
		})
		this.dots.addEventListener("click", function (e) {
			console.log()
			const dot = e.target.closest(".slider-dot")
			if (!dot) return
			that.dotSlider(e)
		})
	}
	executeSlider() {
		console.log(this.sliderType)
		if (this.sliderType === 1) {
			this.slides.forEach((el, i) => {
				el.querySelector("img").style.transform = `translate(${
					(this.currentSlide - i) * 100
				}%, 0)`
			})
		}
		if (this.sliderType === 2 || this.sliderType === 3) {
			this.slides.forEach((el, i) => {
				el.style.transform = `translate(${
					(this.currentSlide - i) * 100
				}%, 0)`
			})
		}

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
		if (this.waitForAnimation) return
		const theNode = +e.target.dataset.slide
		this.currentSlide = theNode
		this.executeSlider()
		this.setWaitForAnimation()
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

		const renderImgDots = [...this.slides]
			.map((n, i) => {
				if (this.currentSlide === i)
					return `<img src="${n.src}" data-slide="${i}" class="slider-dot img active-dot" />`
				return `<img src="${n.src}" data-slide="${i}" class="slider-dot img" />`
			})
			.join("")

		console.log(renderImgDots)

		const renderDots = Array.from({ length: this.length }, (n, i) => {
			if (this.currentSlide === i)
				return `<span data-slide="${i}" class="slider-dot active-dot"></span>`
			return `<span data-slide="${i}" class="slider-dot"></span>`
		}).join("")

		let markup

		markup = `
			<div class="m-b-m">
				<span class="slider-prev"></span>
				<span class="slider-next"></span>
			</div>
			<div class="slider-dots">${renderDots}</div>
		`
		if (this.sliderType === 3) {
			markup = `<div class="slider-dots flex-v flex-gap1">
				${renderImgDots}
			</div>`
		}

		this.control.forEach(el => {
			el.innerHTML = ""
			el.insertAdjacentHTML("beforeend", markup)
		})
	}
	setWaitForAnimation() {
		this.waitForAnimation = true
		setTimeout(() => {
			this.waitForAnimation = false
		}, 1000)
	}
}

new Slider()
