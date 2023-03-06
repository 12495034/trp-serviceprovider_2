//Note console.log messages are only visible in the google cloud console
//https://console.cloud.google.com/functions/details/us-central1/sendNotificationEmail?env=gen1&project=trp-developement&tab=logs
const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

//send notification email to All App users if a new clinic is created
exports.sendNotificationEmail = functions.firestore.document('/Clinics/{clinicId}')
    .onCreate(async (snap) => {
        //get the data from the newly created document
        const newClinicData = snap.data();
        //get the list of users from the Users collection who have opted in for email communications
        const userSnapshots = await admin.firestore().collection('Users').where('emailOptIn', '==', true).get();
        //create an array of document Id's from the Users collection
        const userIdArray = userSnapshots.docs.map(snap => snap.id);
        //if there are registered users
        if (userIdArray.length != 0) {
            emailData = {
                //toUIDs required an array input
                toUids: userIdArray,
                message: {
                    subject: 'The Rainbow Project - Rapid HIV & Syphillis Testing clinic',
                    html:
                        `<div>
                            <div>
                                <h2>A new Rapid HIV & Syphillis testing clinic has been scheduled</h2>
                            </div>
                            <div>
                                <h3>Location: ${newClinicData.location}</h3>
                                <h3>Center: ${newClinicData.center}</h3>
                                <h3>Date: ${newClinicData.date}</h3>
                                <h3>Start Time: ${newClinicData.startTime}</h3>
                                <h3>Capacity: ${newClinicData.capacity}</h3>
                            </div>
                            <div>
                                <h3>To book an appointment please login to the mobile app</h3>
                            </div>
                            <div>
                                <h4>You are recieving this email because you are a registered user with The Rainbow Projects Rapid HIV testing mobile App</h3>
                                <h4>To opt out of further communications please update your notification settings in your User profile</h3>
                            </div>
                        </div>`
                    ,
                }
            }
            //create new document in the Mail collection to be sent by the trigger email extension
            admin.firestore().collection(`Mail`).add(emailData)
        } else {
            console.log("There are no Users currently registered for the App")
        }
    });

//create custom claim and firestore restricted data on initial user creation (default - service user with an active account)
exports.addDefaultUserClaims = functions.firestore.document('/Users/{userId}')
    .onCreate((change, context) => {
        const customClaims = {
            role: "Service-User",
            accountStatus: "Active",
        }

        // Set default custom user claims on doc create.
        admin.auth().setCustomUserClaims(
            context.params.userId, customClaims)
            .then(() => {
                console.log("Default custom claims created for new user")
            })
            .catch(error => {
                console.log(error);
            });

        //create subcollection and document on document creation
        admin.firestore().doc(`/Users/${context.params.userId}/Restricted/Details`).set(customClaims)
            .then(() => {
                console.log("Restricted User data created in firestore")
            })
            .catch(error => {
                console.log(error);
            });
    });

//Edit custom claims when document is modified
exports.modifyUserClaims = functions.firestore.document('/Users/{userId}/Restricted/Details')
    .onUpdate((change, context) => {
        const newData = change.after.data();
        //custom claims are overwritten each time they are updated. Therefore all custom claims must be included with each update
        const customClaims = {
            role: newData.role,
            accountStatus: newData.accountStatus,
        }

        // Set custom user claims on doc create.
        return admin.auth().setCustomUserClaims(
            context.params.userId, customClaims)
            .then(() => {
                console.log("Custom claims updated")
            })
            .catch(error => {
                console.log(error);
            });
    });

//Edit displayName on user auth details if details are modified in the firestore database
//at present cloud function will run if there is any change to the document, not just the users name
exports.updateUserAuthDetails = functions.firestore.document('/Users/{userId}')
    .onUpdate((change, context) => {
        const newData = change.after.data();
        //custom claims are overwritten each time they are updated. Therefore all custom claims must be included with each update
        const userDetails = {
            displayName: `${newData.FirstName} ${newData.LastName}`,
        }
        // Set custom user claims on doc create.
        return admin.auth().updateUser(
            context.params.userId, userDetails)
            .then(() => {
                console.log("User Auth details updated")
            })
            .catch(error => {
                console.log(error);
            });
    });

