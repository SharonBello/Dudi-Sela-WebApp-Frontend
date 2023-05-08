import { httpService } from './http.service.js'

export const eventService = {
    getClubEvents,
    addClubEvent
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