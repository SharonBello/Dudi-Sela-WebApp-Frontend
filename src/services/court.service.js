import { httpService } from './http.service.js'

export const courtService = {
    getClubCourts,
    addClubCourt,
    addPriceConstraint,
    editPriceConstraint,
    getPriceConstraints,
    getPunchCards,
    getClubUsers,
    getClubClasses,
    addPunchCard,
    addClubClass,
    getClubHours,
    addClubHours,
    deleteClubHours,
    editClubPreferences,
    getClubPreferences,
    editAboutClub,
    getAboutClub,
    getUserPermissions,
    deletePriceConstraint,
    deleteClubCourt,
    editClubCourt,
    queryAdminUser
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

async function getAboutClub() {
    try {
        let res = await httpService.get('courts/aboutclub')
        return res
    }
    catch (err) {
        throw err
    }
}

async function getClubPreferences() {
    try {
        let res = await httpService.get('courts/clubpreferences')
        return res
    }
    catch (err) {
        throw err
    }
}

async function getPunchCards() {
    try {
        let res = await httpService.get('courts/punchcards')
        return res
    }
    catch (err) {
        throw err
    }
}

async function getClubUsers() {
    try {
        let res = await httpService.get('courts/clubusers')
        return res
    }
    catch (err) {
        throw err
    }
}

async function getUserPermissions() {
    try {
        let res = await httpService.get('courts/userpermissions')
        return res
    }
    catch (err) {
        throw err
    }
}

async function getClubClasses() {
    try {
        let res = await httpService.get('courts/clubclasses')
        return res
    }
    catch (err) {
        throw err
    }
}

async function addPunchCard(data) {
    try {
        let res = await httpService.post('courts/punchcards/addPunchCard', data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function addClubClass(data) {
    try {
        let res = await httpService.post('courts/clubclasses/addClubClass', data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function getClubHours() {
    try {
        let res = await httpService.get('courts/clubhours')
        return res
    }
    catch (err) {
        throw err
    }
}

async function addClubHours(data) {
    try {
        let res = await httpService.post('courts/clubhours/addClubHours', data)
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

async function editClubCourt(data) {
    try {
        let res = await httpService.post('courts/clubcourts/editClubCourt', data)
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

async function editClubPreferences(data) {
    try {
        let res = await httpService.post('courts/clubpreferences', data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function editAboutClub(data) {
    try {
        let res = await httpService.post('courts/aboutclub', data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function deleteClubCourt(data) {
    try {
        let res = await httpService.delete('courts/clubcourts/court', data)
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

async function deleteClubHours(data) {
    try {
        let res = await httpService.delete('courts/clubhours', data)
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

async function queryAdminUser(data) {
    try {
        let res = await httpService.post('courts/adminusers', data)
        return res
    }
    catch (err) {
        throw err
    }
}