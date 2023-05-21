import { httpService } from './http.service.js'

export const eventService = {
    getClubEvents,
    addClubEvent,
    editClubEvent
}

async function getClubEvents() {
    try {
        let res = await httpService.get('events/clubevents')
        return res
    }
    catch (err) {
        throw err
    }
}

async function addClubEvent(data) {
    try {
        let res = await httpService.post('events/addClubEvent', data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function editClubEvent(data) {
    try {
        let res = await httpService.post('events/editClubEvent', data)
        return res
    }
    catch (err) {
        throw err
    }
}