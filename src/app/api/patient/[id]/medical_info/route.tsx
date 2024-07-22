import { NextRequest, NextResponse } from "next/server";
import { Patient } from "@/app/schema/PatientSchema";
import { connectDb } from "@/app/connectDb";

/*updatde user medical  info */
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
  
    try {
      const { id } = params;

      const formDataToStore = await request.formData();
      console.log("formDataToStore", formDataToStore);
      await connectDb();
      await Patient.findByIdAndUpdate(id, {
        antecedentsPersonnels: formDataToStore.get("antecedentsPersonnels"),
        antecedentsFamiliaux: formDataToStore.get("antecedentsFamiliaux"),
        informationsUtiles: formDataToStore.get("informationsUtiles"),
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