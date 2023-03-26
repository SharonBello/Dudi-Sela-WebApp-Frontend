import { httpService } from './http.service.js'

export const eventService = {
    getEvents,
    addNewEvent
}

async function getEvents() {
    try {
        let res = await httpService.get('events/events')
        return res
    }
    catch (err) {
        throw err
    }
}

async function addNewEvent(data) {
    try {
        let res = await httpService.post('events/addNewEvent', data)
        return res
    }
    catch (err) {
        throw err
    }
}