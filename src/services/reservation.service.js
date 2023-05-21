import { httpService } from './http.service.js'
// import { getActionRemoveReservation } from '../store/actions/reservation.actions.js'

const reservationChannel = new BroadcastChannel('reservationChannel')

export const reservationService = {
    query,
    queryByDate,
    subscribe,
    unsubscribe,
    getById,
    addNewReservation,
    addNewReservationByDate,
    deleteReservation,
    deleteEvent,
    changeCredit,
    getCredit,
    isReservationExists,
    resetByWeekDay,
    addNewReservationToUser,
    queryByDayofweek,
    postByWeekDay
}

function getById(reservationId) {
    let reservation = httpService.get(`reservation/${reservationId}`)
    return reservation
}

async function query(uid) {
    try {
        const results = await httpService.post('reservations/userreservations/user', {'uid': uid})
        return results
    } catch (err) {
        throw err
    }
}

async function queryByDate(date) {
    try {
        let data = await httpService.post('reservations/userreservations/date', {"date": date})
        let reservations
        if (!data) {
            reservations = []
        } else {
            reservations = data.data
        }
        return reservations
    } catch (err) {
        throw err
    }
}

async function queryByDayofweek(dayofweek) {
    try {
        let data = await httpService.post('reservations/userreservations/dayofweek', {"dayofweek": dayofweek})
        let reservations
        if (!data) {
            reservations = []
        } else {
            reservations = data.data
        }
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

async function resetByWeekDay(weekday) {
    try {
        let res = await httpService.post('reservations/schedule/reset?weekday=' + weekday)
        return res
    } catch (err) {
        throw err
    }
}

async function addNewReservation(data) {
    try {
        let res = await httpService.post('reservations/addReservation', data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function isReservationExists(uid, data) {
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

async function deleteEvent(data) {
    try {
        let res = await httpService.delete('reservations/reservations/event', data)
        return res
    }
    catch (err) {
        throw err
    }
}

async function addNewReservationToUser(data) {
    try {
        let res = await httpService.post('reservations/addReservation/user', data)
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
