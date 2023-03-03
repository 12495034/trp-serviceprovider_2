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
        slot: 1, time: "15:00",
    },
    {
        slot: 2, time: "15:30",
    },
]

const expectedNull = "No appointments Data provided"
const expectedAM = "10:00"
const expectedPM = "16:00"

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