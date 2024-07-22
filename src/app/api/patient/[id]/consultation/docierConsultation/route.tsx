import { Patient } from "@/app/schema/PatientSchema";
import { NextRequest ,NextResponse } from "next/server";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";
import { connectDb } from "@/app/connectDb";
import Consultation from "@/app/schema/ConsultationSchema";




/* delete consultation document*/
export async function DELETE(request: NextRequest){
    try {
        const { consultationId, documentName } = await request.json();
        await connectDb();
        console.log('consultationId ' , consultationId)
        console.log('documentName ' , documentName)
        // const patient = await Patient.findOne({_id : patientId})
        // if(!patient){
        //     return NextResponse.json({status : 404, message : 'patient non trouvé'})
        //   }          
          const path = join("public", documentName);
          console.log("path to delete", path)
          await unlink(path).catch(console.error);

          await Consultation.updateOne(
            { _id: consultationId }, 
            { $pull: { consultationDocuments: documentName } }
          ); 
         return  NextResponse.json({status : 200 , message : 'document supprimée'})
    }catch(err){
        console.log("err" , err)
        return NextResponse.json({status : 500 , message : "une erreur c/'est produite veuillez réassayer"})
    }

    
}




/* add document */
export async function POST(request: NextRequest) {

  try {
    const  formDataRecieved= await request.formData();
    const id =  formDataRecieved.get("id");
    const precedentData = await Patient.findOne({ _id: id });
    const consultationId = formDataRecieved.get("consultationId")
    const consultaion = await Consultation.findById(consultationId);
    if(!precedentData) {
      return NextResponse.json({ status : 400  , message: "Patient non trouvé" });
    }
    const precedentFiles = consultaion.consultationDocuments
    
    const newFiles = formDataRecieved.getAll("consultationDocuments") as unknown as File[];
    if(!newFiles.length){
      return NextResponse.json({ status : 400, message: "Aucun document n'a été ajouté" });
    }
    console.log("newFiles from the back", newFiles)
    
   // const files: File[] = [...precedentFiles, ...newFiles];

    const fullNamePatient: string = String(precedentData.get("nom") ?? '') + String(precedentData.get("prenom") ?? '');

    // let fileOrder = precedentFiles.length +1
    // console.log("fileorder", fileOrder)
    let fileOrders: number[] = [];

    for (const oneFileName of precedentFiles) {
      const parts = oneFileName.split("-");
      console.log("parts", parts)
        const fileOrder = parseInt(parts[2], 10); // Parse the file order to an integer
          fileOrders.push(fileOrder);
      
    }
    console.log("fileOrders", fileOrders);
    
    let maxFileOrder = Math.max(...fileOrders); // Find the maximum file order
    console.log("Max file order:", maxFileOrder);
    let StartNewFileOrder = maxFileOrder +1 ; // 
      

      // Perform any operation with each `file` here
    

   

    let fileNames: string[] = [];

    for (let index = 0; index < newFiles.length; index++) {
        const file = newFiles[index];
        const uniqueFileName = `${fullNamePatient}-consult-${StartNewFileOrder}-${file.name}`;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const path = join("public", uniqueFileName);
        await writeFile(path, buffer);
    //     const path = join("public", uniqueFileName);
    //     const fileUrl = URL.createObjectURL(file);
    //     console.log("fileUrl" , fileUrl)
    //     const readStream = createReadStream(fileUrl);
    //     console.log("readStream", readStream)
    //    const writeStream = createWriteStream(path);
    //      console.log("writeStream", writeStream)
    // await pipeline(readStream, writeStream);    
        fileNames.push(uniqueFileName);
        StartNewFileOrder++;
    }

  
    await connectDb();
    await Consultation.updateOne(
        { _id: consultationId }, 
        { $push: { consultationDocuments: { $each: fileNames } } }
      );

    return  NextResponse.json({message : 'document ajouté ',  status: 200 });
  } catch (err) {  
   console.error("Error updating patient: ", err);
    return   NextResponse.json({message : 'une erreur c\'est produite veuillez ressayer',  status: 500 });
  }
}


/*update consultation*/
