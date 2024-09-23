import { connectDb } from "@/app/connectDb";
import { Patient } from "@/app/schema/PatientSchema";
import { writeFile, unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
/*create patient*/
export const POST = async (req: NextRequest) => {
  try {
    await connectDb();
    const formdata = await req.formData();
    console.log("formdata recieved in the back from add user modal", formdata)
    const files: File[] = formdata.getAll("patientHistoryDocuments") as unknown as File[];
    const fullNamePatient: string = String(formdata.get("nom") ?? '') + String(formdata.get("prenom") ?? '');
    let fileNames: string[] = [];
    let filePaths: string[] = [];

    const existingPatient = await Patient.findOne({nom: formdata.get("nom"), prenom: formdata.get("prenom") });
    if(existingPatient){
      console.log("Patient already exists")
      return NextResponse.json({status : 409 ,  message: "Patient existe déja" })
    }
    

    for (let file of files) {
      const uniqueFileName = `${fullNamePatient}-${files.indexOf(file) + 1}-${file.name}`;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join("uploads", uniqueFileName);
      await writeFile(path, buffer as unknown as Uint8Array);
      fileNames.push(uniqueFileName);
      filePaths.push(path); // Keep track of the file paths for potential rollback
    }

    console.log("all files created")
    console.log("form data from the back " , formdata)
    if(!formdata.get("nom") || !formdata.get("prenom") || !formdata.get("age") || !formdata.get("sexe")  || !formdata.get("telephone") || !formdata.get("Addresse")|| !formdata.get("etatCivil")|| !formdata.get("profession")|| !formdata.get("assurance")|| !formdata.get("informationsUtiles") || !formdata.get("antecedentsFamiliaux") || !formdata.get("antecedentsPersonnels") ){
      return NextResponse.json({status : 400 ,  message: "veuillez remplir tous les champs" })
    }

    try {
      await Patient.create({
        nom: formdata.get("nom"),
        prenom: formdata.get("prenom"),
        age: formdata.get("age"),
        sexe: formdata.get("sexe"),
        telephone: formdata.get("telephone"),
        Addresse: formdata.get("Addresse"),
        etatCivil: formdata.get("etatCivil"),
        profession: formdata.get("profession"),
        assurance: formdata.get("assurance"),
        informationsUtiles: formdata.get("informationsUtiles"),
        antecedentsFamiliaux: formdata.get("antecedentsFamiliaux"),
        antecedentsPersonnels: formdata.get("antecedentsPersonnels"),
        patientHistoryDocuments: fileNames,
        antecedentsChirurgicaux: formdata.get("antecedentsChirurgicaux"),
        TraitementsEnCours:formdata.get("TraitementsEnCours"),
        Allergies :formdata.get("allergies"),
      });
      console.log("patient created")
    } catch (dbError) {
      // If patient creation fails, attempt to rollback file writes
      for (let path of filePaths) {
        await unlink(path).catch(console.error); // Log error but don't throw to ensure all files are attempted to be deleted
      }
      throw dbError; // Re-throw the database error after attempting rollback
    }

    return NextResponse.json({status : 200, message: "patient cré correctement " });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({status : 500 ,  message: "une erreur c'est produite veuillez ressayer" });
  }
};

/* get all patients to liste them in the dashboard*/
export const GET = async (req: NextRequest) => {
  try {
    await connectDb();
     const allPatients = await  Patient.find({})
     if(!allPatients || allPatients.length === 0){
      return NextResponse.json({status : 404, message : 'patients non trouvés'})
    }
     return NextResponse.json({status : 200, allPatients ,  message : 'patients trouvés'})
    } catch (dbError) {
        return NextResponse.json({status :500, message : 'une erreur c\'est produite veuillez ressayer'});      
    }

}