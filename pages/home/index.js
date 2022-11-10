/* Desenvolva seu script aqui */
import { renderCategory } from "../../scripts/request.js"
import { getLocalStorageCat } from "../../scripts/localStorage.js"
let page = 0;

const bttRight = document.querySelector(".img-angle")
const bttLeft = document.querySelector(".img-angle-left")
const ulCat = document.querySelector(".cat-list")
const bttBack = document.querySelector(".back-to-top")
const head = document.querySelector(".head")
const divObs = document.querySelector(".obs")

const observer = new IntersectionObserver(async (entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
        renderNews(await renderCategory(page))
    }
})

const verifyLocal = async () => {
    const cat = getLocalStorageCat()
    const listCat = await renderCategory(page)
    const listCatOne = await renderCategory(1)
    const listCatTwo = await renderCategory(2)
    const listTotal = [listCat.news, listCatOne.news, listCatTwo.news]
    if (cat == "Todos" || cat == "") {
        newsList.innerHTML = ""
        page = 0
        observer.observe(divObs)
    } else {
        const filter = []
        listTotal.forEach((elem) => {
            elem.forEach((el) => {
                if (el.category == cat) {
                    filter.push(el)
                }
            })
        })
        renderNewCards(filter)
    }
}
verifyLocal()


bttRight.addEventListener("click", () => {
    ulCat.scrollBy(200, 0)
})

bttLeft.addEventListener("click", () => {
    ulCat.scrollBy(-200, 0)
})
bttBack.addEventListener("click", () => {
    head.scrollIntoView()
})

const newsList = document.querySelector(".news-list")

async function renderNews(news) {
    const newsToRender = news

    if (newsToRender.news.length != 0) {
        const createCards = newsToRender.news.forEach((elem) => {
            const li = document.createElement("li")
            li.classList.add("news-card")
            const imgLi = document.createElement("img")
            imgLi.src = `${elem.image}`
            const divInfo = document.createElement("div")
            const title = document.createElement("h2")
            title.classList.add("font3-semibold")
            title.innerText = `${elem.description}`
            const info = document.createElement("p")
            info.classList.add("font4-regular")
            info.innerText = `${elem.content}`
            const btt = document.createElement("button")
            btt.className = "btt-acess  font4-semibold"
            btt.innerText = "Acessar conteúdo"
            btt.id = elem.id
            btt.addEventListener("click", () => {
                localStorage.setItem("id", btt.id)
                window.location.assign("/pages/post/index.html")
            })

            divInfo.append(title, info, btt)
            li.append(imgLi, divInfo)

            newsList.append(li)
        })
        page++
        return createCards
    }
}

async function renderByClick() {
    const list = [...ulCat.children]
    const listCat = await renderCategory(page)
    const listCatOne = await renderCategory(1)
    const listCatTwo = await renderCategory(2)
    const listTotal = [listCat.news, listCatOne.news, listCatTwo.news]

    list.forEach((elem) => {
        elem.addEventListener("click", () => {
            const value = elem.children[0].innerText
            if (value === "Todos") {
                newsList.innerHTML = ""
                page = 0
                observer.observe(divObs)
            }
            if (value !== "Todos") {
                const filter = []
                listTotal.forEach((elem) => {
                    elem.forEach((el) => {
                        if (el.category == value) {
                            filter.push(el)
                        }
                    })
                })
                renderNewCards(filter)
            }
        })
    })
}
renderByClick()


function renderNewCards(filtered) {
    const listToRender = filtered
    newsList.innerHTML = ""
    const createCards = listToRender.forEach((elem) => {
        const li = document.createElement("li")
        li.classList.add("news-card")
        const imgLi = document.createElement("img")
        imgLi.src = `${elem.image}`
        const divInfo = document.createElement("div")
        const title = document.createElement("h2")
        title.classList.add("font3-semibold")
        title.innerText = `${elem.description}`
        const info = document.createElement("p")
        info.classList.add("font4-regular")
        info.innerText = `${elem.content}`
        const btt = document.createElement("button")
        btt.className = "btt-acess  font4-semibold"
        btt.innerText = "Acessar conteúdo"
        btt.id = elem.id
        btt.addEventListener("click", () => {
            localStorage.setItem("id", btt.id)
            window.location.assign("/pages/post/index.html")
        })
        divInfo.append(title, info, btt)
        li.append(imgLi, divInfo)
        newsList.append(li)
    })
    return createCards
}








