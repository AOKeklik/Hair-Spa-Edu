import { assestURL } from "./Constants.js"

class Product {
	constructor(parent) {
		this.parentElement = parent
		this.type = parent.dataset.product
		this.class =
			parent.dataset.productClass ||
			"hover-top-object box-absolute box-top-outsite"

		this.config(this.type)
	}
	config(type) {
		if (type === "hover") this.executeHoverProduct()
	}
	executeHoverProduct() {
		const markup = `
            <button class="flex ${this.class} p-y-s">
                <svg class="icon-s">
                    <use href="${assestURL}icons.svg#icon-add-cart" />
                </svg>
                <svg class="icon-s">
                    <use href="${assestURL}icons.svg#icon-heart" />
                </svg>
            </button>
        `
		this.parentElement.insertAdjacentHTML("beforeend", markup)
	}
}

const parentElement = document.querySelectorAll("[data-product]")
if (parentElement.length > 0) {
	parentElement.forEach(e => new Product(e))
}
