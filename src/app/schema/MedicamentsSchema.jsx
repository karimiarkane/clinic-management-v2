const mongoose = require('mongoose');

const medicamentSchema = new mongoose.Schema({
  DENOMINATION_COMMUNE_INTERNATIONALE: String,
  FORME: String,
  DOSAGE: String,
  NOM_DE_MARQUE: String,
});

const Medicament = mongoose.models.Medicament || mongoose.model('Medicament', medicamentSchema);

export default Medicament;