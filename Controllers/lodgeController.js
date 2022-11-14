const Lodge = require('../Models/lodge')
const Place = require('../Models/place')

addLodge = async (req, res) => {
  const lodge = new Lodge(req.body)
  await lodge.save()
  await Place.findByIdAndUpdate({
    _id: req.body.place
  }, { $push: { lodges: lodge } })
  res.status(200).json({
    data: lodge,
    msg: 'lodge created successfully'
  })
}
getAllLodges = async (req, res) => {
  const allLodges = await Lodge.find({})
  res.status(200).json({
    msg: 'all lodges', data: allLodges
  })
}
getLodgeById = async (req, res) => {

  const lodge = await Lodge.findById({ _id: req.params.id })
  res.status(200).json({ data: lodge, msg: 'lodge by ID' })
}
updateLodge = async (req, res) => {
  const lodge = await Lodge.findByIdAndUpdate({ _id: req.params.id }, req.body)
  res.status(200).json({ msg: 'lodge updated' })
}
deleteLodge = async (req, res) => {
  const deletedLodge = await Lodge.findOneAndRemove({ _id: req.params.id })
  res.status(200).json({
    msg: 'deleted successfully '
  })
}
module.exports = {
  addLodge, getAllLodges, getLodgeById, deleteLodge, updateLodge
}