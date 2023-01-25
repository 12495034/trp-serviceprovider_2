const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/Users/{userId}')
    .onUpdate((snap, context) => {
        // Grab the current value of what was written to Firestore.
        const status = snap.data().status;

        // Access the parameter `{documentId}` with `context.params`
        functions.logger.log('Uppercasing', context.params.userId, status);

        const uppercase = status.toUpperCase();

        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to Firestore.
        // Setting an 'uppercase' field in Firestore document returns a Promise.
        return snap.ref.set({ uppercase }, { merge: true });
    });
