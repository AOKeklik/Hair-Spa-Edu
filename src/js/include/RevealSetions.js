class RevealSections {
	parentElements
	constructor() {
		this.events()
	}
	events() {
		this.splitInfo()
	}
	splitInfo() {
		this.parentElements = document.querySelectorAll("[data-reveal]")

		this.parentElements.forEach(el => {
			const instructions = el.dataset.reveal.split("-")

			this.applayAnimations(el, instructions)
		})
	}
	applayAnimations(el, instructions) {
		const [type, direct, duration, delay, times] = instructions
		let animaateClass = type + "-" + direct + "-" + duration + "-" + delay
		const that = this
		new IntersectionObserver(
			(entries, observed) => {
				const entry = entries[0]

				if (direct === "up" || direct === "down") {
					if (entry.target.delayAnimation === undefined) {
						entry.target.delayAnimation = true

						if (times === "2x") {
							if (entry.isIntersecting) {
								entry.target.classList.add(animaateClass)
							} else {
								entry.target.classList.remove(animaateClass)
							}
						} else {
							if (entry.isIntersecting)
								entry.target.classList.add("reveal")
						}

						setTimeout(() => {
							entry.target.delayAnimation = undefined
						}, 500)
					}

					return
				}

				if (times === "2x") {
					if (entry.isIntersecting) {
						entry.target.classList.add(animaateClass)
					} else {
						entry.target.classList.remove(animaateClass)
					}
				} else {
					if (entry.isIntersecting)
						entry.target.classList.add("reveal")
				}
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: that.threshold,
			}
		).observe(el)
	}
}
new RevealSections()
