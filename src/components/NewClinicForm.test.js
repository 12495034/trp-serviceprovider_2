import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewClinicForm from './NewClinicForm';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/react';
import useCollection from '../CustomHooks/UseCollection';


// describe("Test fields disable when role is not an Admin", () => {
//     //Don't need to mock form drop down data for tests to run
//     beforeEach(() => {
//         const role = "Service-User"
//         const user = { displayName: "Test User" }
//         render(<NewClinicForm user={user} role={role} />)
//     });
//     it("location field disabled if role is not Admin", () => {
//         const location = screen.getByTestId("location")
//         expect(location).toBeDisabled();
//     })
//     it("location field disabled if role is not Admin", () => {
//         const center = screen.getByTestId("center")
//         expect(center).toBeDisabled();
//     })
//     it("location field disabled if role is not Admin", () => {
//         const addDetails = screen.getByRole("textbox", { id: "addDetails" })
//         expect(addDetails).toBeDisabled();
//     })
//     it("location field disabled if role is not Admin", () => {
//         const date = screen.getByTestId("date")
//         expect(date).toBeDisabled();
//     })
//     it("location field disabled if role is not Admin", () => {
//         const startTime = screen.getByTestId("startTime")
//         expect(startTime).toBeDisabled();
//     })
//     it("location field disabled if role is not Admin", () => {
//         const capacity = screen.getByTestId("capacity")
//         expect(capacity).toBeDisabled();
//     })

// })

// describe("Test fields enabled when role is an Admin", () => {
//     //Don't need to mock form drop down data for tests to run
//     beforeEach(() => {
//         const roleAdmin = "Admin"
//         const user = { displayName: "Test User" }
//         render(<NewClinicForm user={user} role={roleAdmin} />)
//     });
//     it("location field disabled if role is not Admin", () => {
//         const location = screen.getByTestId("location")
//         expect(location).not.toBeDisabled();
//     })
//     it("center field disabled if role is not Admin", () => {
//         const center = screen.getByTestId("center")
//         expect(center).not.toBeDisabled();
//     })
//     it("additional details field disabled if role is not Admin", () => {
//         const addDetails = screen.getByRole("textbox", { id: "addDetails" })
//         expect(addDetails).not.toBeDisabled();
//     })
//     it("date field disabled if role is not Admin", () => {
//         const date = screen.getByTestId("date")
//         expect(date).not.toBeDisabled();
//     })
//     it("startTime field disabled if role is not Admin", () => {
//         const startTime = screen.getByTestId("startTime")
//         expect(startTime).not.toBeDisabled();
//     })
// })

// describe("Test output message created on clinic creation", () => {

jest.mock('../CustomHooks/UseCollection')

it("check default selection", async () => {
    //mocking useCollection hooks in order of call
    useCollection
        .mockReturnValueOnce({ collectionData: [{ id: "Belfast" }, { id: "Derry" }] })
        .mockReturnValueOnce({ collectionData: [{ name: "LGBT Center" }, { name: "Trans Resource Center" }] });

    const roleAdmin = "Admin"
    const user = { displayName: "Test User" }
    render(<NewClinicForm user={user} role={roleAdmin} />)
    //test default location
    expect(screen.getByRole('option', { name: 'Belfast' }).selected).toBe(true)
   
})

it("Check selection of other options", async () => {
    //mocking useCollection hooks in order of call
    useCollection
        .mockReturnValueOnce({ collectionData: [{ id: "Belfast" }, { id: "Derry" }] })
        .mockReturnValueOnce({ collectionData: [{ name: "LGBT Center" }, { name: "Trans Resource Center" }] });

    const roleAdmin = "Admin"
    const user = { displayName: "Test User" }
    render(<NewClinicForm user={user} role={roleAdmin} />)
    //test default location
    userEvent.selectOptions(
        // Find the select element, like a real user would.
        screen.getByRole('combobox',{name:'location'}),
        // Find and select the Ireland option, like a real user would.
        screen.getByRole('option', { name: 'Derry' }),
      )
      expect(screen.getByRole('option', { name: 'Derry' }).selected).toBe(true)
   
})
//})
