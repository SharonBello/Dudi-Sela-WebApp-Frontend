import { httpService } from './http.service.js'

export const instructorService = {
    getInstructors,
}

async function getInstructors() {
    try {
        let res = await httpService.get('instructors/instructors')
        return res.data.names;
    }
    catch (err) {
        throw err
    }
}