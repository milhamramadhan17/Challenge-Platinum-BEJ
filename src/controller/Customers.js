const { customer : customers } = require('../models');
const customers = require('../models/customer');
const { Op } = require("sequelize");

class CustomerController {
  static async addCustomer(req, res) {
    try {
      if (!req.body.id) throw {
        status: 400,
        message: 'parameter name tidak boleh kosong.'
      }
       const newCustomer = {
        user_id: 18
      }
  
      await customers.create(newCustomer);
  
      return res.status(201).json({
        message: 'Berhasil menambahkan customer '})
    } catch (err) {
      return res
        .status(err.status ||  500)
        .json({ message: err.message || 'Internal server error' })
    }
  }

  static async getAllcustomer(req, res) {
    const rows = await customers.findAll({
      where: condition
  })
  .then(results => {
      res.send(results)
  })
} catch (err) {
  res.status(500).send({
      message:
        err.message || "Internal server error"
    });
    return res.status(200).json({
      message: 'Berhasil mendapatkan customer',
      data: rows
    })
  }  
  static updateCustomer(req, res) {
    const user_id = req.params.id;

    return res.status(200).json({
      message: 'Berhasil merubah id ',
    })
  }


  static async deleteCustomer(req, res) {
    try {
      if (!req.body.id) throw { status: 400, message: 'parameter id tidak boleh kosong' };

      await customers.destroy({
        where: { id: req.body.id }
      });

      return res.status(200).json({
        message: 'Berhasil menghapus customer ' + req.body.id
      })
    } catch (err) {
      return res
        .status(err.status ||  500)
        .json({ message: err.message || 'Internal server error' })
    }
  }
}

module.exports = CustomerController;
