module.exports = app => {
    const patients = require("../controllers/patient.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Patient
    router.post("/", patients.create);
  
    // Retrieve all Patients
    router.get("/", patients.findAll);
  
    // Retrieve a single Patient with id
    router.get("/:N_Dossier", patients.findOne);
  
    // Update a Patient with id
    router.put("/:N_Dossier", patients.update);
  
    // Delete a Patient with id
    router.delete("/:N_Dossier", patients.delete);
  
  
    app.use('/api/patients', router);
  };
  