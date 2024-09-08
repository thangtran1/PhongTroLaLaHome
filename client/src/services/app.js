import axios from '../axiosConfig'

export const apiGetPrices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/price/all'
        })
        resolve(response)

    } catch (e) {
        reject(e)
    }
})

export const apiGetAreas = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/area/all'
        })
        resolve(response)

    } catch (e) {
        reject(e)
    }
})

export const apiGetProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/province/all'
        })
        resolve(response)

    } catch (e) {
        reject(e)
    }
})