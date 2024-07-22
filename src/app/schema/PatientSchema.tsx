import mongoose from "mongoose";

// const patientRecordSchema = new mongoose.Schema({
//   date: { type: Date, default: Date.now },
//   diagnosis: { type: String, required: true },
//   remarks: { type: String },
// });

const patientSchema = new mongoose.Schema({
  prenom: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  sexe: {
    type: String,
    required: true,
    enum: ["Male", "Femme"],
  },
  Addresse : {
    type: String,
    required: true,
  },
  etatCivil:{
    type: String,
    required: true,
    enum: ["Veuf", "Marié", "Célibataire","Divorcé"]
  },
  telephone: {
    type: String,
    required: true,
  },
  profession: String,
  assurance: String,


 /*informations medical */
  patientHistoryDocuments: {// les documents dyal l patients
    type: [String],
    required: false, // This field is not mandatory; it can be empty if there are no documents to store
  },
  informationsUtiles: String,
  antecedentsFamiliaux: String,
  antecedentsPersonnels: String,

  consultations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultation'
    } ],

});

export const Patient = mongoose.models.Patient ||  mongoose.model("Patient", patientSchema);