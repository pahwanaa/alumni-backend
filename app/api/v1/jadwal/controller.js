const { StatusCodes } = require('http-status-codes')
const { create, get, edit, remove } = require('./service')


const createJadwal = async ( req, res, next) => {
    try {
        const result = await create(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getJadwal = async ( req, res, next) => {
    try {
        const result = await get(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getJadwalById = async ( req, res, next) => {
    try {
        const result = await getById(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const editJadwal = async ( req, res, next) => {
    try {
        const result = await edit(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const deleteJadwal = async ( req, res, next) => {
    try {
        const result = await remove(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports={
    createJadwal,
    getJadwal,
    getJadwalById,
    editJadwal,
    deleteJadwal
}