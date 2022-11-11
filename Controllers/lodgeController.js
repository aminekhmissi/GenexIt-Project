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
getLodgeById= async (req,res)=>{
  const lodge = await Lodge.findById({_id: req.params.id})
  res.status(200).json({data: lodge, msg : 'lodge by ID'})
}