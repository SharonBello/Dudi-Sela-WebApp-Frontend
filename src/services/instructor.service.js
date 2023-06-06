import { httpService } from './http.service.js'

export const instructorService = {
    getInstructors,
    getParticipants,
    addParticipant
}

async function getInstructors() {
    try {
        let res = await httpService.get('instructors/instructors')
        return res.data.tennis_instructors;
    }
    catch (err) {
        throw err
    }
}

async function getParticipants() {
    try {
        let res = await httpService.get('instructors/participants')
        return res.data.class_participants;
    }
    catch (err) {
        throw err
    }
}

async function addParticipant(data, role='instructor') {
    try {
        let res = await httpService.post('instructors/addparticipant', data, role)
        return res;
    }
    catch (err) {
        throw err
    }
}