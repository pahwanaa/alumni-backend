const { StatusCodes } = require('http-status-codes')
const { create, get } = require('./service')


const createAlumni = async ( req, res, next) => {
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

module.exports={
    createAlumni,
    getAlumni,
    getAlumniById
}