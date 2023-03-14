import { handleReleaseSlot } from "./handleReleaseSlot";

beforeEach(() => {
});

const clinicId = "12345"
const availableSlots = { 1: "18:00", 2: "18:30", 4: "19:30" }
const newSlotNumber = 3
const time = "19:00"

const expectedObjectTrue = { 1: "18:00", 2: "18:30", 3: "19:00", 4: "19:30" }

describe('Checks data format prior to submissiong to firestore to update slots map with released appointment time', () => {
    test.skip('User called', () => {
        expect(handleReleaseSlot(clinicId, availableSlots, newSlotNumber, time)).toEqual(
            expect.objectContaining(expectedObjectTrue)
        );
    });
});