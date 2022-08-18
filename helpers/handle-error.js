
const handleError = ( res, error) => {

    console.log(error)

    res.status(500).json({
      ok: false,
      msg: 'internal server error, please check server logs'
    })

}

module.exports = { handleError }