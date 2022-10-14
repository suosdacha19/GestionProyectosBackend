const repository = require('../infrastructure/repositories/get.repository')
module.exports = async () => {
    const data = await repository()
    return data.map(item => {
        const total = item.cantidad * item.precio
        return {
            ...item,
            total
        }
    })
}