import { dev } from "./Constants.js"

class SortBTN {
    constructor (parent) {
        this.parentElement = parent
        this.childs = [...parent.children]
        this.marker = parent.querySelector(".sort-btn-marker")

        this.events()
    }
    events () {
        this.childs.forEach(e => e.addEventListener("click", this.toggleBTN.bind(this)))
        this.childs.forEach(e => e.addEventListener("mouseover", this.hoverBTN.bind(this)))
        this.parentElement.addEventListener("mouseleave", this.leaveBTN.bind(this))
        this.toggleAfterLoadingPageBTN()
    }
    hoverBTN (e) {
        const theNode = e.target

        this.marker.style.width = theNode.offsetWidth + "px"
        this.marker.style.height = theNode.offsetHeight + "px"
        this.marker.style.left = theNode.offsetLeft + "px"
    }
    leaveBTN (e) {
        this.marker.style.width = "0px"
        this.marker.style.left = "0px"
    }
    toggleBTN (e) {
        if (dev) e.preventDefault()
        
        const theNode = e.target
        this.childs.forEach(e => e.classList.remove("sort-btn-active"))
        theNode.classList.add("sort-btn-active")        
    }
    toggleAfterLoadingPageBTN () {
        const sort = window.location.search.split("=")[1]  

        this.childs.forEach(e => e.classList.remove("sort-btn-active"))

        if (sort === "online")
            return  this.parentElement.querySelector("[title=online]").classList.add("sort-btn-active")

        if (sort === "locale")
            return  this.parentElement.querySelector("[title=locale]").classList.add("sort-btn-active")
        
        
        this.parentElement.querySelector("[title=all]").classList.add("sort-btn-active")
    }

}

const sortBtn = document.querySelectorAll("[role=sort-btn]")
if (sortBtn.length > 0) {
    sortBtn.forEach(e => new SortBTN(e))
}