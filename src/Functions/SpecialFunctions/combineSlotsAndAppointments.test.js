import { combineSlotsAndAppointments } from './combineSlotsAndAppointments';

beforeEach(() => {
});

const slotsMapNull = null
const slotsMapAM = {
    3: "10:00",
    4: "10:30",
}
const slotsMapPM = {
    4: "15:30",
    5: "16:00",
    6: "16:30"
}

const appointmentsArrayNull = null
const appointmentsArrayAM = [
    { slot: 1, time: "09:00" },
    { slot: 2, time: "09:30" },
]
const appointmentsArrayPM = [
    { slot: 1, time: "14:00" },
    { slot: 2, time: "14:30" },
    { slot: 3, time: "15:00" },
]

const expectedArrayAM = [
    { slot: 1, time: "09:00" },
    { slot: 2, time: "09:30" },
    { slot: 3, time: "10:00" },
    { slot: 4, time: "10:30" },
]
const expectedArrayPM = [
    { slot: 1, time: "14:00" },
    { slot: 2, time: "14:30" },
    { slot: 3, time: "15:00" },
    { slot: 4, time: "15:30" },
    { slot: 5, time: "16:00" },
    { slot: 6, time: "16:30" },
]
const expectedLengthAM = 4
const expectedLengthPM = 6

describe('Creates a combined array of objects from input of objects array and map', () => {

    test('AM slots', () => {
        expect(combineSlotsAndAppointments(appointmentsArrayAM, slotsMapAM)).toEqual(
            expect.arrayContaining(expectedArrayAM)
        );
    });

    test('AM slots array length', () => {
        expect(combineSlotsAndAppointments(appointmentsArrayAM, slotsMapAM).length).toBe(expectedLengthAM);
    });

    test('PM slots', () => {
        expect(combineSlotsAndAppointments(appointmentsArrayPM, slotsMapPM)).toEqual(
            expect.arrayContaining(expectedArrayPM)
        );
    });

    test('PM slots array length', () => {
        expect(combineSlotsAndAppointments(appointmentsArrayPM, slotsMapPM).length).toBe(expectedLengthPM);
    });
});