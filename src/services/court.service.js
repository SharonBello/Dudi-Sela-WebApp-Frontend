import { httpService } from './http.service.js'

export const courtService = {
    getCourts,
    getClubCourts,
    addClubCourt,
    addPriceConstraint,
    editPriceConstraint,
    getPriceConstraints,
    deletePriceConstraint
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

async function addPriceConstraint(data) {
    try {
        let res = await httpService.post('courts/clubcourts/addPriceConstraint', data)
        return res
    }
    catch (err) {
        throw err
    }
}


async function editPriceConstraint(data) {
    try {
        let res = await httpService.post('courts/clubcourts/editPriceConstraint', data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function deletePriceConstraint(data) {
    try {
        let res = await httpService.delete('courts/clubcourts', data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function getPriceConstraints() {
    try {
        let res = await httpService.get('courts/priceconstraints')
        return res
    }
    catch (err) {
        throw err
    }
}

