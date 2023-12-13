const { StatusCodes } = require('http-status-codes')
const { create } = require('./service')


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

// const getAlumni = async ( req, res, next) => {
//     try {
//         console.log("ini createAlumni")
//         const result = await create(req)

//         res.status(StatusCodes.CREATED).json({
//             data: result
//         })
//     } catch (error) {
//         next(error)
//     }
// }

module.exports={
    createAlumni
}