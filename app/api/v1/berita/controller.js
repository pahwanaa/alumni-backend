const { StatusCodes } = require('http-status-codes')
const { create, get, getById, edit, remove } = require('./service')


const createBerita = async ( req, res, next) => {
    try {
        const result = await create(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getBerita = async ( req, res, next) => {
    try {
        const result = await get(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getBeritaById = async ( req, res, next) => {
    try {
        const result = await getById(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: 'Berita not found',
        });
    }
}

const editBerita = async ( req, res, next) => {
    try {
        const result = await edit(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: 'Berita not found',
        });
    }
}

const deleteBerita = async ( req, res, next) => {
    try {
        const result = await remove(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: 'Berita not found',
        });
    }
}

module.exports={
    createBerita,
    getBerita,
    getBeritaById,
    editBerita,
    deleteBerita
}