import mongoose from 'mongoose';

const ConsultationSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  motif: String,
  resumeConsultation: String,
  consultationDocuments: {// les documents dyal l patients
    type: [String],
    required: false, // This field is not mandatory; it can be empty if there are no documents to store
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  }
});
 
export default mongoose.models.Consultation || mongoose.model('Consultation', ConsultationSchema);
