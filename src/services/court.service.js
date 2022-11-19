import { httpService } from './http.service.js'

export const courtService = {
    getCourts,
}

async function getCourts() {
    try {
        let res = await httpService.get('courts/courts')
        return res
    }
    catch (err) {
        throw err
    }
}