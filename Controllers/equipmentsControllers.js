const Eq = require('../Models/Equipments')
const Lodge = require('../Models/Lodge')

addEquipments = async (req, res) => {
  const equipment = new Eq(req.body)
  await equipment.save()
  res.status(200).json({
    msg: 'added', data: equipment
  })
  await Lodge.findByIdAndUpdate({ _id: req.body.lodge },
    { $push: { equipments: equipment } })
}
getAllEquipments = async (req, res) => {
  try {
    const equipments = await Eq.find({})
    res.status(200).json({
      data: equipments, msg: 'all equipments'
    })

  } catch (error) {
    res.status(404).json({
      msg: 'failed to get equipments' + error
    })

  }
}
getEquipmentById = async (req, res) => {
  const equipment = await Eq.findById({ _id: req.params.id }).populate('lodge')
  res.status(200).json({ data: equipment, msg: 'Equipment by id' })
}
updateEquipment = async (req, res) => {

  try {
    const updatedEquiment = await Eq.findByIdAndUpdate({ _id: req.params.id }, req.body)
    res.status(200).json({
      data: updatedEquiment, msg: 'updated equipments'
    })

  } catch (error) {
    res.status(404).json({
      msg: 'failed to update equipment' + error.message
    })
  }
}

deleteEquipment = async (req, res) => {
  try {
    const equipment = await Eq.findById({ _id: req.params.id })

    const lodge = await Lodge.findByIdAndUpdate(equipment.lodge, { $pull: { equipments: req.params.id } })
    const deletedEquipment = Eq.findByIdAndDelete({ _id: req.params.id })
    res.status(200).json({
      msg: 'deleted succesfully'
    })
  } catch (error) {
    res.status(404).json({
      msg: error.message
    })

  }


}
module.exports = {
  deleteEquipment, addEquipments, updateEquipment, getAllEquipments, getEquipmentById
}