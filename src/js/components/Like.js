class Like {
	constructor(parent) {
		this.parentElement = parent
		this.events()
	}
	events() {
		this.parentElement.addEventListener(
			"click",
			this.clickDispatcher.bind(this)
		)
	}
	clickDispatcher(e) {
		const theNode = e.target.closest("[role=like]")
		const theStatus = theNode.dataset.likeExists
		if (theStatus === "true") this.deleteLike(theNode)
		if (theStatus === "false") this.createLike(theNode)
	}
	async deleteLike(theNode) {
		const theId = +theNode.dataset.like
		const theSpan = theNode.querySelector("span")
		const parent = theNode.closest(".col1of5")

		if (theSpan) {
			let likeCount = parseInt(theSpan.innerHTML, 10)
			likeCount--
			theNode.querySelector("span").innerHTML = likeCount
		}

		if (window.location.pathname === "/ulubiony/" && parent) {
			parent.remove()
		}

		theNode.dataset.likeExists = false

		const res = await this.fetchLike({ like: theId }, "DELETE")
	}
	async createLike(theNode) {
		const theId = +theNode.dataset.likeProduct
		const theSpan = theNode.querySelector("span")

		if (theSpan) {
			let likeCount = parseInt(theSpan.innerHTML, 10)
			likeCount++
			theNode.querySelector("span").innerHTML = likeCount
		}

		theNode.dataset.likeExists = true

		const res = await this.fetchLike({ productId: theId }, "POST")
	}
	async fetchLike(body = null, type = null) {
		try {
			const method = type ? type : "get"
			const features = {
				method,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"X-WP-Nonce": spaEduData.nonce,
				},
				...(body && {
					...{ body: JSON.stringify(body) },
					credentials: "same-origin",
				}),
			}
			const res = await fetch(
				method !== "get"
					? "http://test-004.weboki.pl/wp-json/v1/like"
					: "http://test-004.weboki.pl/wp-json/wp/v2/like",
				features
			)
			if (!res.ok) throw new Error("Error Fetch Posts!!")
			const data = await res.json()
			return data
		} catch (err) {
			throw err
		}
	}
}

const likeBox = document.querySelectorAll("[role=like]")
if (likeBox.length > 0) {
	likeBox.forEach(e => new Like(e))
}
