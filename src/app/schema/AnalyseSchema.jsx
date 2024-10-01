const mongoose = require('mongoose');
const analyseSchema = new mongoose.Schema({
  nom: String,
});

const Analyse = mongoose.models.Analyse || mongoose.model('Analyse', analyseSchema);
export default Analyse;