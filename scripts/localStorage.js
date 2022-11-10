export const getLocalStorageId = () => {
    const getId = localStorage.getItem
        ("id") || ""
    return getId
}

export const getLocalStorageCat = () => {
    const getCat = JSON.parse(localStorage.getItem
        ("cat")) || ""
    return getCat
}