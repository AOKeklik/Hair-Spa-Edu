class RevealSections {
	parentElements
	previousY = 0
	previousRatio = 0
	constructor() {
		this.parentElements = document.querySelectorAll("[data-reveal]")
		if (!this.parentElements) return
		this.handleIntersect()
	}
	handleIntersect() {
		const thresholdArray = steps =>
			Array(steps + 1)
				.fill(0)
				.map((_, index) => index / steps || 0)
		const handleObserving = (entries, observing) => {
			let theNode
			entries.forEach(entry => {
				theNode = entry.target
				const className = entry.target.dataset.reveal
				const currentY = entry.boundingClientRect.y
				const currentRatio = entry.intersectionRatio
				const isIntersecting = entry.isIntersecting

				if (!isIntersecting) return
				theNode.classList.add(className)
				observing.unobserve(theNode)
			})
		}
		const observing = new IntersectionObserver(handleObserving, {
			root: null,
			rootMargin: "0px",
			threshold: thresholdArray(10),
		})
		this.parentElements.forEach(el => observing.observe(el))
	}
}
new RevealSections()
