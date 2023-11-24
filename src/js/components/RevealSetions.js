class RevealSections {
    parentElement
    constructor (parent, direct = false, threshold = 0.5) {
        this.parentElement = parent
        this.events()
    }
    events () {}
    doBrushHeading() {
		const that = this
		const observingHeadings = new IntersectionObserver(
			(entries, observed) => {
				const entry = entries[0]
				
				if (!this.direct) {
					if (entry.isIntersecting) {
						entry.target.classList.add("reveal")
					} else {
						entry.target.classList.remove("reveal")
					}
				} else {
					if (entry.isIntersecting) 
						entry.target.classList.add("reveal")
				}

				if (this.addBtn)
					if (entry.target.classList.contains("header"))
						if (!entry.isIntersecting) addTheButtonInHeader()
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: that.threshold,
			}
		)
		this.headings.forEach(el => observingHeadings.observe(el))
	}
}
new RevealSections()