const { db, admin } = require('../../../../firebase')
const dayjs = require('dayjs')

module.exports = async (id, payload) => {
    const date = Date.parse(dayjs(payload.fecha).add(1, 'day').format('YYYY-MM-DD')) / 1000;
    payload.fecha = new admin.firestore.Timestamp(date, 0);
    return db.collection('Facturas').doc(id).update(payload)
}