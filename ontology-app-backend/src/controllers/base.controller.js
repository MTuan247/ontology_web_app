class BaseController {
  constructor(model) {
    this.Model = model;
  }

  // Create and Save a new Model
  create(req, res) {

    // Create a Model
    const model = {
      ...req.body.Model
    };

    // Save Model in the database
    this.Model.create(model)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Model."
        });
      });
  }

  // Retrieve all Models from the database.
  findAll(req, res) {
    var condition = req.body.Condition;

    this.Model.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Models."
        });
      });
  }

  // Find a single Model with an id
  findOne(req, res) {
    const id = req.params.id;

    this.Model.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Model with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Model with id=" + id
        });
      });
  }

  // Update a Model by the id in the request
  update(req, res) {

    this.Model.update(req.body.Model, {
      where: { ...req.body.Condition }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Model was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Model with id=${id}. Maybe Model was not found or req.body.Model is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Model with id=" + id
        });
      });
  }

  // Delete a Model with the specified id in the request
  delete(req, res) {
    this.Model.destroy({
      where: { ...req.body.Condition },
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Models were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Models."
        });
      });
  }
}

module.exports = BaseController