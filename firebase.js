require('dotenv').config();
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
    credential: applicationDefault(),
})

const db = getFirestore();
const getAuth = admin.auth();

module.exports = {
    db,
    getAuth,
    admin
};