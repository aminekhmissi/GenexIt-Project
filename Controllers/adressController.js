const Adress = require('../Models/Adress')


addAdress = async (req, res) => {
  try {
    const adress = new Adress(req.body)
    await adress.save()
    res.status(200).json({
      data: adress, msg: 'created successfully'
    })

  } catch (error) {

    res.status(500).json({
      msg: 'somthing went wrong !' + error.message
    })

  }

}
getadressByid = async (req, res) => {
  const adress = await Adress.findById({ _id: req.params.id })
  res.status(200).json({
    data: adress,
    msg: 'all adresses'
  })

}
module.exports = {
  addAdress, getadressByid
}