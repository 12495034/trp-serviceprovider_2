import { createDateString } from './createDateString';

beforeEach(() => {
});

const singleDigit = "2023-03-03"
const doubleDigit = "2023-03-17"

describe('Creates a date string of format weekDay Month day year  ', () => {
    test('single day', () => {
        expect(createDateString(singleDigit)).toMatch("Fri Mar 03 2023");
    });

    test('Creates a date string of format weekDay Month day year  ', () => {
        expect(createDateString(doubleDigit)).toMatch("Fri Mar 17 2023");
    });
});