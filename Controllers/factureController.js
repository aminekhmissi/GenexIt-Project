const Facture = require('../Models/facture')


addFacture = async (req, res) => {
  const facture = new Facture(req.body)
  await facture.save
  res.status(200).json({ data: facture, msg: 'facture created ' })
}
getAllFactures = async (req, res) => {
  const facture = await Facture.find({})
  res.status(200).json({
    msg: 'all categories',
    data: facture
  })
}


getFactureByid = async (req, res) => {
  const facture = await Facture.findById({ _id: req.params.id })
  res.status(200).json({ data: facture, msg: 'facture by id' })
}
updateFacture = async (req, res) => {
  const facture = await Facture.findByIdAndUpdate({ _id: req.params.id }, req.body)
  res.status(200).json({
    msg: 'facture updated '
  })
}
deleteFacture = async (req, res) => {
  const deletedFacture = await Facture.findByIdAndRemove({ _id: req.params.id })
}