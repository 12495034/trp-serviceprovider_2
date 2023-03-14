import { addAdditionalSlot } from "./addAdditionalSlot";

beforeEach(() => {
});

const date = "2023-03-03"
const inc = 30
const dataNull = null
const dataAM = [
    {
        slot: 1, time: "09:00",
    },
    {
        slot: 2, time: "09:30",
    },
]
const dataPM = [
    {
        slot: 1, time: "18:00",
    },
    {
        slot: 2, time: "18:30",
    },
    {
        slot: 3, time: "19:00",
    },
    {
        slot: 4, time: "19:30",
    },
    {
        slot: 5, time: "20:00",
    },
    {
        slot: 6, time: "20:30",
    },
    {
        slot: 7, time: "21:00",
    },
    {
        slot: 8, time: "21:30",
    },


]

const expectedNull = "Input error - Check function arguments"
const expectedAM = "10:00"
const expectedPM = "22:00"

describe('creates a time slot a specified number of minutes after the last row of data', () => {
    test('test of AM time slot', () => {
        expect(addAdditionalSlot(dataAM, date, inc)).toMatch(expectedAM);
    });

    test('test of PM time slot', () => {
        expect(addAdditionalSlot(dataPM, date, inc)).toMatch(expectedPM);
    });

    test('test of AM time slot', () => {
        expect(addAdditionalSlot(dataNull, date, inc)).toMatch(expectedNull);
    });
});