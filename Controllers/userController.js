const Owner = require("../Models/Owner");
const Customer = require("../Models/Customer");
const User = require("../Models/User");

module.exports = {
  async getCustomerById(req, res) {
    try {
      const customer = await Customer.findById({
        _id: req.params.id,
      })
        .populate({ path: "reservations", populate: { path: "lodge" } })
        .populate("listFavoris");
      res.status(202).json({
        status: 202,
        message: "customer by id:",
        data: customer,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "failed to get customer by id",
        error: error.message,
      });
    }
  },
  async getOwnerById(req, res) {
    try {
      const owner = await Owner.findById({ _id: req.params.id })
        .populate({ path: "lodges", populate: { path: "place" } })
        .populate({ path: "lodges", populate: { path: "category" } })
        .populate({ path: "lodges", populate: { path: "equipements" } });
      res.status(202).json({
        status: 202,
        message: "Owner by id:",
        data: owner,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "failed to get owner by id",
        error: error.message,
      });
    }
  },
  async getAllCustomer(req, res) {
    try {
      const listCustomers = await Customer.find({});
      res.status(200).json({
        status: 200,
        message: "list of all customers",
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "failed to get all customers",
        error: error.message,
      });
    }
  },
  async addLodgeToFavoris(req, res) {
    try {
      const customer = await Customer.findById({ _id: req.body.customer });
      const lodge = req.body.lodge;
      var msg = "";
      console.log(customer.listFavoris);
      if (!customer.listFavoris.includes(lodge)) {
        customer.listFavoris.push(lodge);
        await customer.save();
        msg = "lodge added in my favoris list successfully";
      } else {
        var msg = "lodge already exists in my favoris list";
      }
      res.status(200).json({
        status: 200,
        message: " " + msg,
        data: customer,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: " failed to add in favoris",
        error: error.message,
      });
    }
  },
  async removeLodgeFromFavoris(req, res) {
    try {
      const customer = await Customer.findByIdAndUpdate(
        { _id: req.body.customer },
        { $pull: { listFavoris: req.body.lodge } }
      );
      res.status(200).json({
        status: 200,
        message: "lodge removed from my favoris list!",
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "failed to remove a lodge from my favoris list!",
        error: error.message,
      });
    }
  },
  async deleteUser(req, res) {
    try {
      await User.findByIdAndRemove({ _id: req.params.id });
      res.status(200).json({
        status: 200,
        message: "user deleted suceesfully",
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "failed to delete a user",
      });
    }
  },
};
