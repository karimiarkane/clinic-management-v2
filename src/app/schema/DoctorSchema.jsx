import mongoose from 'mongoose'

const DoctorSchema = new mongoose.Schema({
    nom : String,
    prenom : String,
    contact : String,
    Addresse : String,
    specialite : String,
})

export const Doctor = mongoose.models.Doctor  || mongoose.model("Doctor",DoctorSchema)