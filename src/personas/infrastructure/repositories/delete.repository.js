const { db, getAuth } = require('../../../../firebase')
const find = require('../repositories/find.repository')

module.exports = async (id) => {
    const user = await find(id)
    await getAuth.deleteUser(user.uid).catch((error) => {
        console.log('Error deleting user:', error);
    });
    return db.collection('Personas').doc(id).delete()
}