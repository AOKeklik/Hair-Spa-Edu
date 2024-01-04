// import axios from "axios"

import { assestURL } from "./Constants.js"

let tempLikes = JSON.parse(window.localStorage.getItem("like")) || []

class likeLoop {
	constructor(parent) {
		this.parent = parent
		this.doLoop()
	}

	doLoop() {
		const renderMarkup = () =>
			tempLikes
				.map(e => {
					// console.log(e)
					return `
				<div class="col1of5" data-reveal="fade-up-1000-0">
					<a href="${e.theLink}" class="flex-v flex-between p-s p-b-0 h20 border-s bg-white hover-to-bottom">
						<h3 class="heading-tertiary flex-v flex-center text-thin w15 text-center flex-center-self">${e.theTitle}</h3>
						<div class="flex flex-between">
							<div id="product-date">${e.theDate}</div>
							<form action="" method="post" enctype="multipart/form-data" class="flex flex-center hover-bottom-left-object gap05">
								<button name="add-to-cart" value="${e.theProductId}">
									<svg class="icon-s">
										<use href="${assestURL}icons.svg#icon-add-cart" />
									</svg>
								</button>
								<div aria-admin="false" onclick="event.preventDefault()" role="like" data-like="${Date.now()}" data-like-exists="true" data-like-product="${e.theProductId}">
									<svg class="icon-s" aria-hidden="false">
										<use href="${assestURL}icons.svg#icon-heart" />
									</svg>
									<svg class="icon-s" aria-hidden="true">
										<use href="${assestURL}icons.svg#icon-heart-fill" />
									</svg>
								</div>
							</form>
						</div>
					</a>
				</div>
			`
				})
				.join("")
		const renderContainer = () => {
			return `
			
			<h2 class="heading-primary m-b-m flex-v flex-center text-center" data-reveal="fade-up-1000-500">
				<span class="m-b-s">produkty zapisane w plikach cookies</span>
				<span class="heading-marker"></span>
			</h2>
			<div class="container">
				<div class="row gap3">
					${renderMarkup()}
				</div>
			</div>
			`
		}

		if (tempLikes.length === 0) return

		this.parent.innerHTML = ""
		this.parent.insertAdjacentHTML("afterbegin", renderContainer())
	}
}

const parentElement = document.querySelector("[rol=like-loop]")

if (parentElement) {
	new likeLoop(parentElement)
}

class Like {
	constructor(parent) {
		this.parentElement = parent
		// axios.defaults.headers.common["X-WP-Nonce"] = spaEduData.nonce
		this.events()
	}
	events() {
		this.parentElement.addEventListener(
			"click",
			this.clickDispatcher.bind(this)
		)
		this.updateHeartIconLoadPage()
	}
	updateHeartIconLoadPage () {
		const elements = [...document.querySelectorAll("[data-like-product]")]
		if (elements.length === 0) return
		const list = elements.filter(n => {
			return tempLikes.find(e => +n.dataset.likeProduct == e.theProductId)
		})
		list.forEach(e => {
			if (e.getAttribute("aria-admin") === "true") return
			console.log("lll")
			e.setAttribute("data-like-exists", "true")
		})
	}
	clickDispatcher(e) {
		const theNode = e.target.closest("[role=like]")
		const parentcontainer = e.target.closest("[data-parent=parent]")
		const theStatus = theNode.dataset.likeExists
		if (theStatus === "true") this.deleteLike(theNode)
		if (theStatus === "false") this.createLike(theNode, parentcontainer)
	}
	async deleteLike(theNode) {
		try {
			const theLikeId = +theNode.dataset.like
			const theProductId = +theNode.dataset.likeProduct
			const theSpan = theNode.querySelector("span")
			const parent = theNode.closest(".col1of5")

			if (theSpan) {
				let likeCount = parseInt(theSpan.innerHTML, 10)
				likeCount--
				theNode.querySelector("span").innerHTML = likeCount
			}

			theNode.dataset.likeExists = false

			if (window.location.pathname === "/ulubione/" && parent) {
				parent.remove()
			}

			if (theNode.closest("[aria-admin=false]")) {
				tempLikes = tempLikes.filter(e => {
					return e.theProductId !== theProductId
				})
				window.localStorage.setItem("like", JSON.stringify(tempLikes))
			} else {
				const res = await this.fetchLike({ like: theLikeId }, "DELETE")
			}

			if (tempLikes.length === 0 && document.querySelector("[rol=like-loop]")) {
				// console.log(tempLikes, theNode, theNode.closest("section"))
				document.querySelector("[rol=like-loop]").replaceChildren()
			}

			// if (theNode.closest("[aria-admin=false]")) return

			
			// const res = await axios({
			// 	url: "http://test-004.weboki.pl/wp-json/v1/like",
			// 	method: "delete",
			// 	data: { like: theLikeId },
			// })
		} catch (err) {
			console.log(err)
		}
	}
	async createLike(theNode, parentcontainer) {
		try {
			const link = parentcontainer.querySelector("a")

			const title = parentcontainer.querySelector(".heading-tertiary") 
			|| parentcontainer.querySelector(".heading-secondary") 
			|| parentcontainer.querySelector(".heading-primary") 

			const dateObjsc = parentcontainer.querySelector("#product-date")

			const theLink = link.href 
			const theTitle = title.textContent.trim()
			const theDate = dateObjsc.innerHTML.trim()
			
			console.log(theDate)

			const theProductId = +theNode.dataset.likeProduct
			const theSpan = theNode.querySelector("span")

			if (theSpan) {
				let likeCount = parseInt(theSpan.innerHTML, 10)
				likeCount++
				theNode.querySelector("span").innerHTML = likeCount
			}

			theNode.dataset.likeExists = true

			if (theNode.closest("[aria-admin=false]")) {
				tempLikes.push({theProductId, theTitle, theLink, theDate })
				var flags = [], output = [], l = tempLikes.length, i;
				for( i=0; i<l; i++) {
					if( flags[tempLikes[i].theProductId]) continue;
					flags[tempLikes[i].theProductId] = true;
					output.push(tempLikes[i]);
				}
				window.localStorage.setItem("like", JSON.stringify(output))
			} else {
				const res = await this.fetchLike(
					{ productId: theProductId },
					"POST"
				)
				theNode.setAttribute("data-like", res)
			}

			// if (theNode.closest("[aria-admin=false]")) return

			
			// const res = await axios({
			// 	url: "http://test-004.weboki.pl/wp-json/v1/like",
			// 	method: "post",
			// 	data: { like: theProductId },
			// })
		} catch (err) {
			console.log(err)
		}
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
