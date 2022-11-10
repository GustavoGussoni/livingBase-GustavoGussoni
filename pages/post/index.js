/* Desenvolva seu script aqui */
import { getLocalStorageId } from "../../scripts/localStorage.js"
import { requestPost } from "../../scripts/request.js"

const bttRight = document.querySelector(".img-angle")
const bttLeft = document.querySelector(".img-angle-left")
const ulCat = document.querySelector(".cat-list")
const bttBack = document.querySelector(".back-to-top")
const head = document.querySelector(".head")
const bttHome = document.querySelector(".btt-home")

bttRight.addEventListener("click", () => {
    ulCat.scrollBy(200, 0)
})
bttLeft.addEventListener("click", () => {
    ulCat.scrollBy(-200, 0)
})
bttBack.addEventListener("click", () => {
    head.scrollIntoView()
})
bttHome.addEventListener("click", () => {
    localStorage.removeItem("cat")
    window.location.assign("/pages/home/index.html")
})

function goToCat() {
    const list = [...ulCat.children]
    list.forEach((elem) => {
        elem.addEventListener("click", () => {
            const value = JSON.stringify(elem.children[0].innerText)
            localStorage.setItem("cat", value)
            window.location.assign("/pages/home/index.html")
        })
    })
}
goToCat()

const verifyLocal = async () => {
    const idNew = getLocalStorageId()
    if (idNew == "") {
        window.location.assign("/pages/home/index.html")
    }
    return await requestPost(idNew)
}

async function renderNewPost() {
    const postToRender = await verifyLocal()
    const title = document.querySelector("#title-head")
    const infoH = document.querySelector("#info-head")
    const img = document.querySelector("#img-post")
    const infoP = document.querySelector("#info-post")
    title.innerText = `${postToRender.title}`
    infoH.innerText = `${postToRender.description}`
    img.src = `${postToRender.image}`
    infoP.innerText = `${postToRender.content}`
}
renderNewPost()



