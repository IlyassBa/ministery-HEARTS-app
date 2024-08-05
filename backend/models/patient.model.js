module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define("patient", {
      N_Dossier: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      CNIE: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Date_Naissance: {
        type: Sequelize.DATE
      },
      sexe: {
        type: Sequelize.STRING
      },
      provenance: {
        type: Sequelize.STRING
      },
      niveauDeScolarite: {
        type: Sequelize.STRING
      },
      couverture: {
        type: Sequelize.STRING
      }
    });
  
    return Patient;
  };
  