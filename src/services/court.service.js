import { httpService } from './http.service.js'

export const courtService = {
    getCourts,
    getClubCourts,
    addClubCourt
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

async function getClubCourts() {
    try {
        let res = await httpService.get('courts/clubcourts')
        return res
    }
    catch (err) {
        throw err
    }
}


async function addClubCourt(data) {
    try {
        let res = await httpService.post('courts/clubcourts/addClubCourt', data)
        return res
    }
    catch (err) {
        throw err
    }
}