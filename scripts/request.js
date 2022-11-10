const baseUrl = 'https://m2-api-living.herokuapp.com/news'

export async function renderCategory(currentPage) {
    try {
        const request = await fetch(`${baseUrl}?page=${currentPage}`, {
            method: 'GET',
        })
        const res = await request.json()
        return res
    } catch (err) {
        return err
    }
}

export async function requestPost(id) {
    try {
        const request = await fetch(`${baseUrl}/${id}`, {
            method: 'GET',
        })
        const res = await request.json()
        return res
    } catch (err) {
        return err
    }
}