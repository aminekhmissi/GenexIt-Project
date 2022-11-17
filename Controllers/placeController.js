const lodge = require('../Models/Lodge')
const Place = require('../Models/Place')

addPlace = async (req, res) => {
  const place = new Place(req.body)
  await place.save()
  res.status(200).json({
    data: place, msg: 'place created successfully'
  })
}
getAllPlaces = async (req, res) => {
  const places = await Place.find({})
  res.status(200).json({
    data: places, msg: 'places'
  })
}
getPlceById = async (req, res) => {
  const place = await Place.findById({ _id: req.params.id })
  res.status(200).json({
    data: place, msg: 'place by id'
  })
}
updatePlace = async (req, res) => {
  const UpdatedPlace = await Place.findByIdAndUpdate({ _id: req.params.id }, req.body)
  res.status(200).json({
    msg: 'place updated'
  })

}
deletePlace = async (req, res) => {
  const deletedPlace = await Place.findByIdAndRemove({ _id: req.params.id })
}
module.exports = {
  deletePlace, updatePlace, getPlceById, getAllPlaces, addPlace
}