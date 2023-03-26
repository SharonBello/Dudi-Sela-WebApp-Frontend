export const FREQUENCY_TYPES = {
    Once: 'once',
    OnceAWeek: 'onceAWeek',
    OnceAMonth: 'onceAMonth'
}

export const SCHEDULE_TYPE = {
    Schedule: 'schedule',
    InternalSchedule: 'internalSchedule',
    Unavailable: 'unavailable'
}

export const PAID_STATUS = {
    Paid: 'paid',
    UnPaid: 'unpaid',
}

export interface EVENT {
    price: string,
    paidStatus: PAID_STATUS,
    description: string,
    frequency: FREQUENCY_TYPES,
    startHour: number,
    endHour: number,
    date: string,
    title: string,
    scheduleType: SCHEDULE_TYPE,
    shouldJoinClass: boolean,
    instructorIndices: number[],
    participantIndices: number[],
    courtNumbers: number[]
}