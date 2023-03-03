import { createSlotsList } from "./createSlotsList";

beforeEach(() => {
});

const date = "2023-03-03"
const startTimePM = "17:00"
const startTimeAM = "09:00"
const capacity = 4
const capacityNull = null
const inc30 = 30
const inc20 = 20

const expectedObjectAM = {
    1:"09:00",
    2:"09:30",
    3:"10:00",
    4:"10:30",
}

const expectedObjectPM20 = {
    1:"17:00",
    2:"17:20",
    3:"17:40",
    4:"18:00",
}
const expectedObjectPM30 = {
    1:"17:00",
    2:"17:30",
    3:"18:00",
    4:"18:30",
}


describe('Creates a map of available appointments', () => {

    test('AM appointments', () => {
        expect(createSlotsList(date, startTimeAM, capacity, inc30)).toEqual(
            expect.objectContaining(expectedObjectAM)
        );
    });

    test('PM appointments', () => {
        expect(createSlotsList(date, startTimePM, capacity, inc30)).toEqual(
            expect.objectContaining(expectedObjectPM30)
        );
    });

    test('PM appointments, 20minute increments', () => {
        expect(createSlotsList(date, startTimePM, capacity, inc20)).toEqual(
            expect.objectContaining(expectedObjectPM20)
        );
    });

    test('PM appointments, 20minute increments, null capacity', () => {
        expect(createSlotsList(date, startTimePM, capacityNull, inc20)).toBe(null);
    });

});