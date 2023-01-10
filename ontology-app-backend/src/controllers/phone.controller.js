const db = require("../models");
const BaseController = require("./base.controller");
const Model = db.phones;

class PhoneController extends BaseController {
  constructor(model) {
    super(model);
  }
}

module.exports = new PhoneController(Model);