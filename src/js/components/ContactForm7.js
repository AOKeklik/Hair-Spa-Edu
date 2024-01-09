class ContactForm7 {
	constructor() {
		this.events()
	}

	events() {
		document.addEventListener(
			"click",
			this.doSendingMailToApi.bind(this)
		)
	}

	async doSendingMailToApi() {
		console.log("ll")
		const results = await this.fetchingData()
		console.log(results)
	}

	async fetchingData() {
		try {
			const res = await fetch(
				// "http://test-004.weboki.pl/wp-json/contact-form-7/v1/contact-forms/97e379a/feedback",
				"http://test-004.weboki.pl/wp-json/wp/v2/cart",
				{
					// method: "POST",
					method: "get",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"X-WP-Nonce": "d535342856",
						consumerKey:
							"ck_ce879a447e844c8e7aecff7f9daebf3d78946ded",
						consumerSecret:
							"cs_3371797336505b1035b866cce8c88a0315f0da05",
					},
					credentials: "same-origin",

					// body: JSON.stringify({
					// 	email: "Hello World",
					// }),
				}
			)
			const data = await res.json()
			return data
		} catch (err) {
			console.log(err)
		}
	}
}

// new ContactForm7()
