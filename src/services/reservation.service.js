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
    addNewReservationByDate,
    deleteReservation,
    deleteReservationByDate,
    changeCredit,
    getCredit,
    isReservetionExists,
    queryByWeekDay,
    postByWeekDay
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


async function postByWeekDay(weekday, data) {
    try {
        let res = await httpService.post('reservations/schedule/weekday?weekday=' + weekday, data)
        return res
    } catch (err) {
        throw err
    }
}

async function queryByWeekDay(weekday) {
    try {
        let data = await httpService.get('reservations/schedule/weekday?weekday=' + weekday)
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

async function isReservetionExists(uid, data) {
    try {
        let res = await httpService.post('reservations/reservation/exists?docId=' + uid, data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function changeCredit(uid, data) {
    try {
        let res = await httpService.post('reservations/usercredit?docId=' + uid, data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function getCredit(uid) {
    try {
        let data = await httpService.get('reservations/usercredit?docId=' + uid)
        let user_credit = data.data.user_credit
        return user_credit
    } catch (err) {
        throw err
    }
}

async function deleteReservation(uid, data) {
    try {
        let res = await httpService.delete('reservations/reservations?docId=' + uid, data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function deleteReservationByDate(date, data) {
    try {
        let res = await httpService.delete('reservations/reservations/bydate?date=' + date, data)
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
