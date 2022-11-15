const Commentaire = require("../Models/Commentaire");
const Customer=require('../Models/Customer')
module.exports = {
  async createCommentaire(req, res) {
    try {
      const newComment = new Commentaire(req.body);
      await newComment.save()
      //relation:
      await Customer.findByIdAndUpdate({_id:req.body.customer},
        {$push:{commentaires:newComment}})
      res.status(200).json({
        status: 200,
        message: "comment created successfully!!",
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "failed to create comment",
        error: error.message,
      });
    }
  },
  async updateCommentaire(req, res) {
    try {
      await Commentaire.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).json({
        status: 200,
        message: "comment updated successfully!!",
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "failed to update a comment",
        error: error.message,
      });
    }
  },
};
