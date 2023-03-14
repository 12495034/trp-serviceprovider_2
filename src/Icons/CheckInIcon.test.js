import * as React from 'react';
import { render, screen, getByTitle } from '@testing-library/react';
import CheckInIcon from './CheckInIcon';

describe('Appointment Card', () => {
    it('renders Appointment Card component with user checked in', () => {
        const {getByTitle} = render(<CheckInIcon
            checkedIn={true}
        />);
        //test rendering of icon
        expect(getByTitle("checkedIn")).toBeTruthy();
        
    });

    it('renders Appointment Card component with user not checked in', () => {
        const {getByTitle} = render(<CheckInIcon
            checkedIn={false}
        />);
        expect(getByTitle("notCheckedIn")).toBeTruthy();   
    });
});