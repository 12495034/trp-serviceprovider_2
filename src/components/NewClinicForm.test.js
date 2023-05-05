import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewClinicForm from './NewClinicForm';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/react';
import useCollection from '../customHooks/UseCollection';


describe.skip("Test output message created on clinic creation", () => {

    jest.mock('../CustomHooks/UseCollection')

    it.skip("check default selection", async () => {
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

    it.skip("Check selection of other options", async () => {
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
            screen.getByRole('combobox', { name: 'location' }),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole('option', { name: 'Derry' }),
        )
        expect(screen.getByRole('option', { name: 'Derry' }).selected).toBe(true)

    })
})
