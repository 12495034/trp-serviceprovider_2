import React from 'react'
import { Container } from 'react-bootstrap'

/**
 * Privacy Policy page for the mobile app
 */

export default function PrivacyPolicyMobile() {
    return (
        <div className='page-body'>
            <Container className='page-content'>
                <div>
                    <h3>PRIVACY POLICY FOR MOBILE APPLICATION "TRP - Rapid HIV testing"</h3>
                    <h6>Last updated: March 16th, 2023</h6>
                    <p>This privacy policy governs your use of the software application “TRP - Rapid HIV Testing” (later referred as the/this “App”) for Android™ mobile devices that was created by Gavin Davis.
                        The Application is a mobile Android application intended to facilitate booking appointments for rapid HIV & syphilis testing
                        at clinics scheduled by the rainbow project based in Belfast, Northern Ireland.
                    </p>
                </div>

                <div>
                    <div>
                        <h5>What information does the Application obtain and how is it used?</h5>
                        <h6>User Provided Information</h6>
                        <ol>
                            <li>This application requires user registration with the following basic personal information being required -  </li>
                            <ul>
                                <li>Preferred Pro-Nouns</li>
                                <li>First name, middle name and last name</li>
                                <li>E-mail Address</li>
                                <li>Telephone Number</li>
                                <li>Date of birth</li>
                            </ul>
                            <li>All personal details are stored within a secure Google Firestore database.</li>
                            <li>Access to users personal information is restricted to the owner of that data and Rainbow project Administrators only.</li>
                            <li> User provided details are used to identify the user when they attend a rapid HIV testing clinic, verify their age and provide contact details for reporting of positive HIV/syphilis test results only.</li>
                        </ol>
                    </div>
                    <div>
                        <h6>Automatically collected Information</h6>
                        <ol>
                            <li>Users have the ability to check in for their clinic appointments using the app which is automatically recorded in the Firestore database.</li>
                            <li>Users appointment histories are also recorded remotely in a secure Google firestore database. User appointment history is accessible only to the owner of that data and Rainbow project clinic administrators.</li>
                            <li>The Application does not collect precise information about the location of your mobile device.</li>
                            <li>User details and appointment check in status is monitored by the rainbow project clinic staff through a web interface that is accessible to authorised administrators only.</li>
                            <li>The App collects the minimum viable amount of personal information for app functionality and user maintenance. It is not possible to opt-out of any of the current data collected. All User Provided Data can be deleted by selecting 'Delete Account' within the profile section of the App.  </li>
                        </ol>
                    </div>
                    <div>
                        <h6>Data Retention Policy, Managing Your Information</h6>
                        <ol>
                            <li>All personal details are stored within a secure Google Firestore database.</li>
                            <li>Access to users personal information is restricted to the owner of that data and Rainbow project Administrators only. </li>
                            <li>If you would like to update specific User Provided Data, you may do it directly within the Application, by editing user details via the profile section of the app.</li>
                            <li>If you would like to delete User Provided Data, all User Provided Data can be deleted by selecting 'Delete Account' within the profile section of the App. </li>
                            <li>The App collects the minimum viable amount of personal information for app functionality and user maintenance. It is not possible to opt-out of any of the current data collected. All User Provided Data can be deleted by selecting 'Delete Account' within the profile section of the App.  </li>
                            <li>Results from rapid HIV and syphillis test are not stored or communicated with anyone except the person being tested.</li>
                        </ol>
                    </div>
                    <div>
                        <h6>Children</h6>
                        <ol>
                            <li>Our Application does not address anyone under the age of 13. </li>
                            <li>We do not use the Application to knowingly solicit data from or market to children under the age of 13.</li>
                        </ol>
                    </div>
                    <div>
                        <h6>Changes</h6>
                        <ol>
                            <p>This Privacy Policy may be updated from time to time for any reason. We will notify you of any changes to our Privacy Policy by posting the new Privacy Policy at  https://trp-developement.web.app/privacy-policy-mobile and update the "Last updated" date at the top of this Privacy Policy.
                                Please be aware that, although we endeavor provide reasonable security for information we process and maintain, no security system can prevent all potential security breaches (e.g., a zero-day attack targeting mobile Operating System – OS).
                                You are advised to review this Privacy Policy periodically for any changes, as continued use is deemed approval of all changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                        </ol>
                    </div>
                    <div>
                        <h6>Your Consent</h6>
                        <ol>
                            <p>By using the Application, you consent to remote processing of your information.
                                Only for those reasons stated above shall User Provided Data be shared, processed and/or stored by third parties. User Provided Data cannot and will never be sold to any other third parties.</p>
                        </ol>
                    </div>
                    <div>
                        <h6>Contact Us</h6>
                        <ol>
                            <p>If you have any questions regarding privacy while using the Application, or have questions about our practices, please contact us via email at:
                                gavindave@hotmail.com</p>
                        </ol>
                    </div>
                    <div>The "Android" name, the Android logo, the "Google Play" brand, and other Google trademarks, are property of Google LLC and not part of the assets available through the Android Open Source Project.</div>
                </div>
            </Container>
        </div>
    )
}
