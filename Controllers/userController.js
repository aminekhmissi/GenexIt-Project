const Owner = require("../Models/Owner");
const Customer = require("../Models/Customer");

module.exports = {
  async getCustomerById(req, res) {
    try {
      const customer = await Customer.findById({
        _id: req.params.id,
      }).populate({path:"reservations",populate:{path:"lodge"}});
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
      const owner = await Owner.findById({ _id: req.params.id });
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
  async getAllCustomer(req,res){
    try {
        const listCustomers=await Customer.find({})
        res.status(200).json({
            status:200,
            message:'list of all customers'
        })
    } catch (error) {
        res.status(404).json({
            status:404,
            message:"failed to get all customers",
            error:error.message
        })
    }
  }
};
