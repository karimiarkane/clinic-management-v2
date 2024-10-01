import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";
import { Patient } from "@/app/schema/PatientSchema";
import { connectDb } from "@/app/connectDb";
import Consultation from "@/app/schema/ConsultationSchema";

// create consultation



export const POST = async (req: NextRequest ,  { params }: { params: { id: string } } ) => {
  try {
    await connectDb();
    const formdata = await req.formData();
    const files: File[] = formdata.getAll("consultationDocuments") as unknown as File[];
    let fileNames: string[] = [];
    let filePaths: string[] = [];

    const patientId = params.id;
       const patient = await Patient.findById(patientId)
       
    if(!patient){
        console.log("Patient doesn't exists")
        return NextResponse.json({status : 409 ,  message: "Patient non trouvé" })
      }



    const fullNamePatient: string = String(patient.nom ?? '') + String(patient.prenom ?? '');



  
    

    for (let file of files) {
      const uniqueFileName = `${fullNamePatient}-consult-${files.indexOf(file) + 1}-${file.name}`;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join("uploads", uniqueFileName);
      await writeFile(path, buffer  as unknown as Uint8Array);
      fileNames.push(uniqueFileName);
      filePaths.push(path); // Keep track of the file paths for potential rollback
    }
    console.log("all files created")
    console.log("form data from the back " , formdata)

    

    try {
      const newConsultation = await Consultation.create({
        date: new Date(), // Current date
        motif: formdata.get("motif"),
        resumeConsultation: formdata.get("resumeConsultation"),
        consultationDocuments: fileNames,
        patient: patientId, // Associate the consultation with the patient by referencing their ID
      });

      


    patient.consultations.push(newConsultation._id)

    patient.save()

    console.log("consultation created")


    } catch (dbError) {
      // If patient creation fails, attempt to rollback file writes
      for (let path of filePaths) {
        await unlink(path).catch(console.error); // Log error but don't throw to ensure all files are attempted to be deleted
      }
      throw dbError; // Re-throw the database error after attempting rollback
    }

    return NextResponse.json({status : 200, message: "consultation cré correctement " });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({status : 500 ,  message: "une erreur c'est produite veuillez ressayer" });
  }
};




/*delete <consultation>*/
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const {consultationId} = await req.json();
  try {
    await connectDb();
    const patient = await Patient.findOne({ _id: id });
    const  consultation = await Consultation.findOne({ _id: consultationId });

    if (!patient) {
      return NextResponse.json({ status: 404, message: "patient non trouvé" });
    }
    if (!consultation) {
      return NextResponse.json({ status: 404, message: "consultation non trouvé" });
    }
    /*delete files from local*/
    for (let name of consultation.consultationDocuments) {
      let path = join("uploads", name);
      await unlink(path).catch(console.error); // Log error but don't throw to ensure all files are attempted to be deleted
    }
    /*delete user from db*/
    await consultation.deleteOne({ _id: consultationId });
    await Patient.findByIdAndUpdate(id, {
      $pull: { consultations: consultationId }
    });

    return NextResponse.json({ status: 200, message: "consultation supprimé" });
  } catch (err) {
    console.log("err ", err);
    return NextResponse.json({
      message: "une errcgeur c'est produite veuillez ressayer",
      status: 500,
    });
  }
}


/*update user consultation*/

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  try {
    const formDataToStore = await request.formData();
    console.log("formDataToStore", formDataToStore);
    await connectDb();
    await Consultation.findByIdAndUpdate(formDataToStore.get("id"), {
      motif: formDataToStore.get("motif"),
      resumeConsultation: formDataToStore.get("resumeConsultation"),
      // patientHistoryDocuments: fileNames
    });
    return  NextResponse.json({message : "consultation modifié " , status: 200 });
  } catch (err) {
   
    console.error("Error updating consultation: ", err);
    return NextResponse.json({
      message: "une erreur c'est produite veuillez ressayer",
      status: 500,
    });
  }
}