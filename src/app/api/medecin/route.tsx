import { connectDb } from "@/app/connectDb";
import { Doctor } from "@/app/schema/DoctorSchema";
import { writeFile, unlink } from "fs/promises";
import {  NextResponse } from "next/server";
import { join } from "path";

/*create or update doctor*/
export const POST  = async (req : Request) => {
    console.log("we are in create or update docor")
  try {
    await connectDb();
    const formdata = await req.json();
    console.log("formdata recieved in the back from add medecin info modal", formdata)
  

    const existingDoctors = await Doctor.findOne();
    if(!existingDoctors || existingDoctors.length === 0){
      console.log("doctor dont  exists")
      try{
        Doctor.create({
            nom: formdata.nom,
            prenom: formdata.prenom,
            contact : formdata.contact,
            specialite : formdata.specialite,   
            Addresse: formdata.Addresse,
           
        })
        return NextResponse.json({status : 200 ,  message: " Médecin cré avec succès" })
      }catch(erreur) {
        console.error("Error creating doctor: ", erreur);
        return NextResponse.json({
          message: "une erreur c'est produite veuillez réessayer",
          status: 500,
        });
    }
}else{
    console.log("doctor already exists")
    try{
      Doctor.updateOne({_id : existingDoctors._id}, {
        $set : {
            nom: formdata.nom,
            prenom: formdata.prenom,
            contact : formdata.contact,
            specialite : formdata.specialite,   
            Addresse: formdata.Addresse,        
        }
      })
      return NextResponse.json({status : 200 ,  message: "Médecin mis à jour avec succès" })
    }catch(erreur) {
      console.error("Error updating doctor: ", erreur);
      return NextResponse.json({
        message: "une erreur c'est produite veuillez réessayer",
        status: 500,
      });
    }
}
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({status : 500 ,  message: "une erreur c'est produite veuillez ressayer" });
  }
};

/* get the info of the doctor*/
export const GET = async () => {
    // console.log("we are in get doctor info")
  try {
    await connectDb();
     const doctor = await  Doctor.find({})
     if(!doctor || doctor.length === 0){
      return NextResponse.json({status : 404, message : 'Docteur n existe pas'})
    }
     return NextResponse.json({status : 200, doctor ,  message : 'doctor trouvés'})
    } catch (dbError) {
        return NextResponse.json({status :500, message : 'une erreur c\'est produite veuillez ressayer'});      
    }

}