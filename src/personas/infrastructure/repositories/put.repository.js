const {db, getAuth} = require('../../../../firebase')
const find = require('../repositories/find.repository')

module.exports = async (id, payload) => {
    const user = await find(id)
    console.log(user, payload)
    if (user.correo !== payload.correo) {
        await getAuth.updateUser(user.uid, {
            email: payload.correo,
        })
    }
    if (payload.password && payload.password !== '') {
        await getAuth.updateUser(user.uid, {
            password: payload.password,
        })
    }
    delete payload.password
    return db.collection('Personas').doc(id).update(payload)
}