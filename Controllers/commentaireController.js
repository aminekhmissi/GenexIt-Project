const Commentaire = require("../Models/Commentaire");
const Customer = require('../Models/Customer')
const Lodge = require('../Models/Lodge')
module.exports = {
  async createCommentaire(req, res) {
    try {
      const newComment = new Commentaire(req.body);
      await newComment.save()
      //relation:
      await Customer.findByIdAndUpdate({ _id: req.body.customer },
        { $push: { commentaires: newComment } })
      await Lodge.findByIdAndUpdate({ _id: req.body.lodge },
        { $push: { comments: newComment } })
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
  async deleteCommentaire(req, res) {
    try {
      const comment = await Commentaire.findById({ _id: req.params.id })
      //relation:
      const customer = await Customer.findOneAndUpdate(comment.customer, { $pull: { commentaires: req.params.id } })
      const lodge = await Lodge.findOneAndUpdate(comment.lodge, { $pull: { comments: req.params.id } })

      await Commentaire.findByIdAndRemove({ _id: req.params.id })
      res.status(200).json({
        status: 200,
        message: "comment deleted successfully"
      })
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "failed to delete a comment",
        error: error.message
      })
    }
  }

};
