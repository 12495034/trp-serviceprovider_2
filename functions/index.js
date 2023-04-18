//Note console.log messages are only visible in the google cloud console
//https://console.cloud.google.com/functions/details/us-central1/sendNotificationEmail?env=gen1&project=trp-developement&tab=logs
const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();


//send notification email to All App users if a new clinic is created
exports.sendNotificationEmail = functions.region('europe-west1').firestore.document('/Clinics/{clinicId}')
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
                                <h3>Room: ${newClinicData.addDetails}</h3>
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
exports.addDefaultUserClaims = functions.region('europe-west1').firestore.document('/Users/{userId}')
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
exports.modifyUserClaims = functions.region('europe-west1').firestore.document('/Users/{userId}/Restricted/Details')
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
exports.updateUserAuthDetails = functions.region('europe-west1').firestore.document('/Users/{userId}')
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

//disable user auth profile when firestore user document is changed to suspended
exports.disableUserAccount = functions.region('europe-west1').firestore.document('/Users/{userId}/Restricted/Details')
    .onUpdate((change, context) => {
        const newData = change.after.data();
        let userDetails = ""

        if (newData.accountStatus == "Suspended") {
            userDetails = { disabled: true }
        } else if (newData.accountStatus == "Active") {
            userDetails = { disabled: false }
        }
        //disable user account
        return admin.auth().updateUser(
            context.params.userId, userDetails)
            .then(() => {
                console.log("User Auth details updated")
            })
            .catch(error => {
                console.log(error);
            });
    });

//delete User document from firestore when user auth profile is deleted
// exports.deleteUserDocument = functions.region('europe-west1').auth.user().onDelete(async (user) => {
//     deleteDocument('Users', user.uid)
// });

//delete user restricted details document when user auth profile is deleted
// exports.deleteUserRestrictedData = functions.region('europe-west1').auth.user().onDelete(async (user) => {
//     deleteDocument(`Users/${user.uid}/Restricted`, 'Details')
// });

//Delete user appointments subcollection when user auth profile is deleted
//subcollections need to be deleted manually
exports.deleteUserAppointments = functions.region('europe-west1').auth.user().onDelete(async (user) => {
    //delete User subcollection documents
    const collectionRef = admin.firestore().collection(`Users/${user.uid}/Appointments`);
    let promises = []
    return collectionRef.get()
        .then(qs => {
            qs.forEach(docSnapshot => {
                promises.push(docSnapshot.ref.delete());
            });
            Promise.all(promises);
        })
        .then(() => {
            deleteDocument('Users', user.uid)
        })
        .then(() => {
            return deleteDocument(`Users/${user.uid}/Restricted`, 'Details')
        })
        .catch(error => {
            console.log(error);
            return false;
        });
});

//helper function to delete a document within a firestore collection
function deleteDocument(collectionName, docName) {
    admin.firestore().collection(collectionName).doc(docName).delete()
        .then(() => {
            console.log("Document successfully deleted!");
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
        });
}






