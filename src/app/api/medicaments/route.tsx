import type {  NextApiResponse } from 'next';
import Medicament from '../../schema/MedicamentsSchema'
import { connectDb } from '@/app/connectDb';
import { NextRequest, NextResponse } from 'next/server';

export  const  GET = async ()=> {
  await connectDb(); // Connect to the database
  try {
   const medicaments = await Medicament.find({})
   console.log('medicaments in the backend' , medicaments)
 if(!medicaments || medicaments.length === 0) {  
  return NextResponse.json({  status: 404 , message: "aucun medicament trouvé" });
 }  
    return NextResponse.json({ medicaments , status:200 , message: "medicaments trouvés" });
  
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching medications' });
  }
}
