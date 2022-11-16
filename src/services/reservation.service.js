import { httpService } from './http.service.js'
import { getActionRemoveReservation } from '../store/actions/reservation.actions.js'
import { userService } from './user.service.js'

const reservationChannel = new BroadcastChannel('reservationChannel')

export const reservationService = {
    query,
    subscribe,
    unsubscribe,
    getById,
    remove,
    addNewReservation,
    // getReservations
}

function getById(reservationId) {
    // return storageService.get(STORAGE_KEY, reservationId)
    let reservation = httpService.get(`reservation/${reservationId}`)
    return reservation
}

async function query(uid) {
    try {
        let data = await httpService.get('reservations/reservations?docId=' + uid)
        console.log("🚀 ~ file: reservation.service.js ~ line 34 ~ query ~ data", data)
        let reservations = data.data.reservations
        console.log("🚀 ~ file: reservation.service.js ~ line 35 ~ query ~ reservations", reservations)
        return reservations
    } catch (err) {
        throw err
    }
}

async function remove(reservationId) {
    reservationChannel.postMessage(getActionRemoveReservation(reservationId))
    await httpService.delete(`reservation/${reservationId}`)
}

async function addNewReservation(reservation) {
    if (reservation._id) {
        await httpService.put(`reservation/${reservation._id}`, reservation)
        return reservation
    } else {
        let newReservation = {
            "court": reservation.court,
            "date": reservation.date,
            "start": reservation.start,
            "end": reservation.end
        }
        newReservation = await httpService.post('reservation', newReservation)
        return newReservation
    }
}

function subscribe(listener) {
    reservationChannel.addEventListener('message', listener)
}

function unsubscribe(listener) {
    reservationChannel.removeEventListener('message', listener)
}
