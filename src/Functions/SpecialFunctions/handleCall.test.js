import { handleCall } from "./handleCall";

beforeEach(() => {
});

const field = "called"
const valueTrue = true
const valueFalse = false
const userid = "123456789"
const clinicid = "123456789"
const tester = "Tester"
const statusActive = "Active"
const statusComplete = "Complete"

const expectedObjectTrue = {
    called: true,
    calledBy: "Tester"
}
const expectedObjectFalse = {
    called: false,
    calledBy: "Tester"
}


describe('Checks data format prior to submissiong to firestore to update called field in appointment', () => {
    test.skip('User called', () => {
        expect(handleCall(field, valueTrue, userid, clinicid, tester, statusActive)).toEqual(
            expect.objectContaining(expectedObjectTrue)
        );
    });

    test.skip('User not called', () => {
        expect(handleCall(field, valueFalse, userid, clinicid, tester, statusActive)).toEqual(
            expect.objectContaining(expectedObjectFalse)
        );
    });

    test.skip('Updating inactive clinic', () => {
        expect(handleCall(field, valueTrue, userid, clinicid, tester, statusComplete)).toMatch("Input error - Check function arguments");
    });

});