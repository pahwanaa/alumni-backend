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

const getAlumni = async ( req, res, next) => {
    try {
        const result = await get(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getAlumniById = async ( req, res, next) => {
    try {
        const result = await getAlumniById(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const editAlumni = async ( req, res, next) => {
    try {
        const result = await edit(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const deleteAlumni = async ( req, res, next) => {
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
    getAlumni,
    getAlumniById,
    editAlumni,
    deleteAlumni
}