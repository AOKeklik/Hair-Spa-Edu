export const dev = window.origin === "http://127.0.0.1:8080" || window.origin === "http://127.0.0.1:5500" ? true : false
export const assestURL = dev
	? "./assets/"
	: window.origin + "/wp-content/themes/EduHairSpa/assets/"
