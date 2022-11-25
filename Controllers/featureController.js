const Feature = require('../Models/Features')
const Lodge = require('../Models/Lodge')

module.exports = {
  async addFeature(req, res) {
    try {
      const feature = new Feature(req.body)
      await feature.save()
      res.status(200).json({
        data: feature,
        msg: 'created secessfully'
      })
    } catch (error) {
      res.status(404).json({
        msg: error.message
      })

    }
  },
  async getAllFeatures(req, res) {
    try {
      const features = await Feature.find({}).populate('lodge')
      res.status(200).json({
        data: features, msg: 'all features'
      })

    } catch (error) {
      res.status(404).json({
        msg: 'failed to get features' + error.message
      })

    }

  },

  async getFeatureById(req, res) {
    const feature = await Feature.findById({ _id: req.params.id })
    res.status(200).json({ data: feature, msg: 'feature by id' })
  },

  async updateFeature(req, res) {

    try {
      const feature = await Feature.findByIdAndUpdate({ _id: req.params.id }, req.body)
      res.status(200).json({
        data: feature, msg: 'updated'
      })

    } catch (error) {
      res.status(404).json({
        msg: 'failed to update feature' + error.message
      })
    }
  },

  async deleteFeture(req, res) {
    try {
      const feature = await Feature.findByIdAndDelete({ _id: req.params.id })


      res.status(200).json({
        msg: 'deleted succesfully'
      })
    } catch (error) {
      res.status(404).json({
        msg: error.message
      })

    }
  }
}
