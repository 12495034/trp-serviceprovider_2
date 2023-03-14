import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewClinicForm from './NewClinicForm';
import userEvent from '@testing-library/user-event';


describe("Test fields disable when role is not an Admin", () => {

    const handleSubmit = jest.fn();
    const handleChange = jest.fn();

    const currentDate = "2023-08-13"
    const locationData = [{ id: "Belfast" }, { id: "Derry" }]
    const centerData = [{ id: "LGBT Center" }, { id: "Trans Resource Center" }]
    const ClinicFormData = {
        location: "Belfast",
        center: "",
        date: "",
        startTime: "",
        capacity: 0,
        slots: {},
        clinicStatus: "Active",
        addDetails: "",
        //timeStamp: Timestamp.fromDate(new Date())
    }
    const role = "Service-User"

    beforeEach(() => {
        render(
            <NewClinicForm
                locationData={locationData}
                centerData={centerData}
                currentFormState={ClinicFormData}
                onChange={handleChange}
                currentDate={currentDate}
                role={role}
                handleSubmit={handleSubmit}
            />)
    });

    it("location field disabled if role is not Admin", () => {
        const location = screen.getByTestId("location")
        expect(location).toBeDisabled();

        const center = screen.getByTestId("center")
        expect(center).toBeDisabled();

        const addDetails = screen.getByRole("textbox", { id: "addDetails" })
        expect(addDetails).toBeDisabled();

        const date = screen.getByTestId("date")
        expect(date).toBeDisabled();

        const startTime = screen.getByTestId("startTime")
        expect(startTime).toBeDisabled();
        
        const capacity = screen.getByTestId("capacity")
        expect(capacity).toBeDisabled();
    })
})

describe("field conditional logic",()=>{

    const handleSubmit = jest.fn();
    const handleChange = jest.fn();

    const currentDate = "2023-08-13"
    const locationData = [{ id: "Belfast" }, { id: "Derry" }]
    const centerData = [{ id: "LGBT Center" }, { id: "Trans Resource Center" }]
    const ClinicFormData = {
        location: "Belfast",
        center: "",
        date: "",
        startTime: "18:00",
        capacity: 0,
        slots: {},
        clinicStatus: "Active",
        addDetails: "",
        //timeStamp: Timestamp.fromDate(new Date())
    }
    const role = "Admin"

    beforeEach(() => {
        render(
            <NewClinicForm
                locationData={locationData}
                centerData={centerData}
                currentFormState={ClinicFormData}
                onChange={handleChange}
                currentDate={currentDate}
                role={role}
                handleSubmit={handleSubmit}
            />)
    });

    it("location field disabled if role is not Admin", () => {
        const location = screen.getByTestId("location")
        expect(location).not.toBeDisabled();

        const capacity = screen.getByTestId("capacity")
        expect(capacity).not.toBeDisabled();
    })
})


describe("test function calls",()=>{
    const handleSubmit = jest.fn();
    const handleChange = jest.fn();

    const currentDate = "2023-08-13"
    const locationData = [{ id: "Belfast" }, { id: "Derry" }]
    const centerData = [{ id: "LGBT Center" }, { id: "Trans Resource Center" }]
    const ClinicFormData = {
        location: "Belfast",
        center: "",
        date: "",
        startTime: "18:00",
        capacity: 0,
        slots: {},
        clinicStatus: "Active",
        addDetails: "",
        //timeStamp: Timestamp.fromDate(new Date())
    }
    const role = "Admin"

    beforeEach(() => {
        render(
            <NewClinicForm
                locationData={locationData}
                centerData={centerData}
                currentFormState={ClinicFormData}
                onChange={handleChange}
                currentDate={currentDate}
                role={role}
                handleSubmit={handleSubmit}
            />)
    });

    it("create Clinic button calls handle submit function",()=>{
        const button = screen.getByText(/create clinic/i)
        fireEvent.click(button)
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    })
})
