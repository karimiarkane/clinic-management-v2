import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import {  unlink } from "fs/promises";
import { Patient } from "@/app/schema/PatientSchema";
import { connectDb } from "@/app/connectDb";

import Consultation from "@/app/schema/ConsultationSchema";
/*get user and his consultation for the patientComponent*/
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    await connectDb();
    const patient = await Patient.findOne({ _id: id });
    const consultation = await Consultation.find({ patient: id });
    if (!patient ) {
      return NextResponse.json({ status: 404, message: "patient non trouvé" });
    }
    if(!consultation){
      return NextResponse.json({ status: 404, message: "consultation non trouvé" });
    }

    return NextResponse.json({
      status: 200,
      consultation,
      patient,
      message: "patient trouvé",
    });
  } catch (err) {
    console.log("err ", err);
    return NextResponse.json({
      message: "une errcgeur c'est produite veuillez ressayer",
      status: 500,
    });
  }
}

/*updatde user personnal  info */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const filePaths: string[] = [];

  try {
    const { id } = params;
console.log(filePaths)
    // const precedentData = await Patient.findOne({ _id: id });
    // const precedentFiles = precedentData.patientHistoryDocuments;
    const formDataToStore = await request.formData();
    console.log("formDataToStore", formDataToStore);
    await connectDb();
    await Patient.findByIdAndUpdate(id, {
      nom: formDataToStore.get("nom"),
      prenom: formDataToStore.get("prenom"),
      age: formDataToStore.get("age"),
      sexe: formDataToStore.get("sexe"),
      telephone: formDataToStore.get("telephone"),
      Addresse: formDataToStore.get("Addresse"),
      profession: formDataToStore.get("profession"),
      assurance: formDataToStore.get("assurance"),
      etatCivil: formDataToStore.get("etatCivil"),
      // patientHistoryDocuments: fileNames
    });

    return  NextResponse.json({message : "patient modifié " , status: 200 });
  } catch (err) {
    // for (const path of filePaths) {
    //   await unlink(path).catch(console.error);
    // };
    console.error("Error updating patient: ", err);
    return NextResponse.json({
      message: "une erreur c'est produite veuillez ressayer",
      status: 500,
    });
  }
}



/*delete <user>*/
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    await connectDb();
    const patient = await Patient.findOne({ _id: id }).populate('consultations');
    console.log("patient" , patient)
    if (!patient) {
      return NextResponse.json({ status: 404, message: "patient non trouvé" });
    }



    for (let consultation of patient.consultations) {
      // Assuming each consultation has a 'documents' field that stores document names
      for (let docName of consultation.consultationDocuments) {
        let docPath = join("uploads", docName);
        await unlink(docPath).catch(console.error); // Log error but don't throw
      }
      // Delete the consultation record
      await Consultation.deleteOne({ _id: consultation._id });
    }
  

    /*delete files from local*/
    for (let name of patient.patientHistoryDocuments) {
      let path = join("uploads", name);
      await unlink(path).catch(console.error); // Log error but don't throw to ensure all files are attempted to be deleted
    }
    /*delete user from db*/
    await Patient.deleteOne({ _id: id });
    return NextResponse.json({ status: 200, message: "patient supprimé" });
  } catch (err) {
    console.log("err ", err);
    return NextResponse.json({
      message: "une errcgeur c'est produite veuillez ressayer",
      status: 500,
    });
  }
}
