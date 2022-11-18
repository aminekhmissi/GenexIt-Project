const Lodge = require('../Models/Lodge')
const Place = require('../Models/Place')
const Owner = require('../Models/Owner')

addLodge = async (req, res) => {

  // req.body["galleries"] = req.file.filename //lire une seul image file;
  try {


    req.body['galleries'] =
      req.files.length <= 0 ? []
        : req.files.map(function (file) {
          return { name: file.filename, description: 'add prod' }//galleryschema:name=nom de photo,description=add prod
        })

    const lodge = new Lodge(req.body)
    await lodge.save()
    await Place.findByIdAndUpdate({
      _id: req.body.place
    }, { $push: { lodges: lodge } })
    await Owner.findByIdAndUpdate({
      _id: req.body.owner
    }, { $push: { lodges: lodge } })
    res.status(200).json({
      data: lodge,
      msg: 'lodge created successfully'
    })
  }
  catch (error) {
    res.status(404).json({
      msg: 'error' + error.message
    })
  }
}
getAllLodges = async (req, res) => {
  var allLodges = await Lodge.find({})
  res.status(200).json({
    msg: 'all lodges', data: allLodges
  })
}
getLodgeById = async (req, res) => {

  const lodge = await Lodge.findById({ _id: req.params.id }).populate('place').populate('owner').populate('adress')
  res.status(200).json({ data: lodge, msg: 'lodge by ID' })
}
updateLodge = async (req, res) => {
  const lodge = await Lodge.findByIdAndUpdate({ _id: req.params.id }, req.body)
  res.status(200).json({ msg: 'lodge updated' })
}
deleteLodge = async (req, res) => {
  await Lodge.findByIdAndUpdate(Lodge.place, {
    $pull: { lodges: req.params.id },
  });
  await Lodge.findByIdAndUpdate(Lodge.owner, {
    $pull: { lodges: req.params.id }
  })
  const deletedLodge = await Lodge.findOneAndRemove({ _id: req.params.id })
  res.status(200).json({
    msg: 'deleted successfully '
  })
}


// find each person with a name contains 'Ghost'
searchLodge = async (req, res) => {
  try {
    const found = await Lodge.findOne({ "title": { $regex: /[a-z]/, $options: 'i' } })
    res.status(200).json({ data: found, msg: 'found' })
  }
  catch (error) {
    res.status(404).json({ msg: 'error failed to get' })

  }

}


module.exports = {
  addLodge, getAllLodges, getLodgeById, deleteLodge, updateLodge, searchLodge
} 