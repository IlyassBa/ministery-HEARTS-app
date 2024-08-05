const db = require("../models");
const Patient = db.patients;
const Op = db.Sequelize.Op;

// Create and Save a new Patient
exports.create = (req, res) => {
  if (!req.body.CNIE || !req.body.nom || !req.body.prenom) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const patient = {
    N_Dossier: req.body.N_Dossier,
    CNIE: req.body.CNIE,
    nom: req.body.nom,
    prenom: req.body.prenom,
    Date_Naissance: req.body.Date_Naissance,
    sexe: req.body.sexe,
    provenance: req.body.provenance,
    niveauDeScolarite: req.body.niveauDeScolarite,
    couverture: req.body.couverture
  };

  Patient.create(patient)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Patient."
      });
    });
};

// Retrieve all Patients from the database.
exports.findAll = (req, res) => {
  Patient.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving patients."
      });
    });
};

// Find a single Patient with an id
exports.findOne = (req, res) => {
  const id = req.params.N_Dossier;

  Patient.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Patient with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Patient with id=" + id
      });
    });
};

// Update a Patient by the id in the request
exports.update = (req, res) => {
  const id = req.params.N_Dossier;

  Patient.update(req.body, {
    where: { N_Dossier: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Patient was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Patient with id=" + id
      });
    });
};

// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.N_Dossier;

  Patient.destroy({
    where: { N_Dossier: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Patient was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Patient with id=" + id
      });
    });
};

