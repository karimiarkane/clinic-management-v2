import type {  NextApiResponse } from 'next';
import Medicament from '../../schema/MedicamentsSchema'
import { connectDb } from '@/app/connectDb';
import { NextRequest, NextResponse } from 'next/server';


// export  const  GET = async (req: NextRequest, res: NextApiResponse)=> {
//   await connectDb(); // Connect to the database
//   const page = parseInt(req.nextUrl.searchParams.get("page") || '1'); // Get the current page from query params
//   console.log("page", page) // Get the current page from query params
//   const limit = 6; // Number of medications per page
  
//   const skip = (page - 1) * limit; // Calculate the number of documents to skip

//   const searchTerm = req.nextUrl.searchParams.get("searchTerm") ; // Get the current page from query params
//   console.log("searchTerm", searchTerm) // Get the current page from query params


//   try {
//     //  Fetch the medications with pagination and search
//     const regex = new RegExp(searchTerm || '', 'i'); // Create a case-insensitive regex
//     console.log("regex", regex);

//      const medicaments = await Medicament.find({
//          DENOMINATION_COMMUNE_INTERNATIONALE : { $regex: regex  }, // Case-insensitive search
//      }).skip(skip).limit(limit);
// // const medicaments = await Medicament.find({
// //     })

//     console.log("medicaments in the back after find ({})"  , medicaments) //

//     // Get the total number of medications for pagination
//     const totalMedicaments = await Medicament.countDocuments({
//       DENOMINATION_COMMUNE_INTERNATIONALE: { $regex: regex },
//     });
//     // const totalMedicaments = await Medicament.countDocuments({
//     // });
    
//     return NextResponse.json({ medicaments, totalMedicaments, });
  
//   } catch (error) {
//     return NextResponse.json({ error: 'Error fetching medications' });
//   }
// }

export  const  GET = async (req: NextRequest, res: NextApiResponse)=> {
  await connectDb(); // Connect to the database
  try {
   const medicaments = await Medicament.find({})
 
    // console.log("medicaments in the back after find ({})"  , medicaments ) //
    
    return NextResponse.json({ medicaments });
  
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching medications' });
  }
}
