const Lodge = require('../Models/lodge')

addLodge = async (req, res) => {
  const lodge = new Lodge(req.body)
  await lodge.save()
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
  const lodge = Lodge.findByIdAndUpdate({ _id: req.params.id }, req.body)
}
deleteLodge = async (req, res) => {
  const deletedLodge = await Lodge.findByIdAndDelete({ _id: req.params.id })
}
module.exports = {
  addLodge, getAllLodges, getLodgeById, deleteLodge, updateLodge
}