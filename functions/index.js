const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

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

//Edit custom claims when document is modified (WIP)
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

