import { httpService } from './http.service.js'
import { getActionRemoveReservation } from '../store/actions/reservation.actions.js'

const reservationChannel = new BroadcastChannel('reservationChannel')

export const reservationService = {
    query,
    queryByDate,
    subscribe,
    unsubscribe,
    getById,
    remove,
    addNewReservation,
    addNewReservationByDate
}

function getById(reservationId) {
    let reservation = httpService.get(`reservation/${reservationId}`)
    return reservation
}

async function query(uid) {
    try {
        let data = await httpService.get('reservations/reservations?docId=' + uid)
        let reservations = data.data.reservations
        return reservations
    } catch (err) {
        throw err
    }
}

async function queryByDate(date) {
    try {
        let data = await httpService.get('reservations/reservations/date?date=' + date)
        let reservations = data.data.reservations
        return reservations
    } catch (err) {
        throw err
    }
}

async function remove(reservationId) {
    reservationChannel.postMessage(getActionRemoveReservation(reservationId))
    await httpService.delete(`reservation/${reservationId}`)
}

async function addNewReservation(uid, data) {
    try {
        let res = await httpService.post('reservations/reservations?docId=' + uid, data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function addNewReservationByDate(date, data) {
    try {
        let res = await httpService.post('reservations/reservations/date?date=' + date, data)
        return res
    }
    catch (err) {
        throw err
    }
}

function subscribe(listener) {
    reservationChannel.addEventListener('message', listener)
}

function unsubscribe(listener) {
    reservationChannel.removeEventListener('message', listener)
}
