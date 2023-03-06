import * as React from 'react';
import { render, screen } from '@testing-library/react';
import AppointmentCard from './AppointmentCard';
import { handleReleaseSlot } from '../Functions/SpecialFunctions/handleReleaseSlot';

const testSlots = {
    1:"18:00",
    2:"18:30",
    3:"19:00"
}

describe('Appointment Card', () => {
  it('renders Appointment Card component', () => {
    render(<AppointmentCard
        key={1}
        clinicid="clinic1"
        slot={1}
        time="18:00"
        userid="User1"
        checkedIn={true}
        called={true}
        calledBy="Tester1"
        wasSeen={false}
        tester="Tester1"
        slotsUpdate={handleReleaseSlot}
        availableSlots={testSlots}
        clinicStatus="Active"
        //handleUserDetail={handleUserDetail}
    />);

    //renders the HTML in the console window
    //screen.debug();
    //test conditional rendering is displaying the correct information
    expect(screen.getByText("Booked")).toBeInTheDocument()
    expect(screen.getByText("Tester: Tester1")).toBeInTheDocument()
    //test rendering of icons

  });
});