import type {  NextApiResponse } from 'next';
import { connectDb } from '@/app/connectDb';
import { NextRequest, NextResponse } from 'next/server';
import Analyse from '../../schema/AnalyseSchema'

export  const  GET = async ()=> {
  await connectDb(); // Connect to the database
  try {
   const analyses = await Analyse.find({})
   console.log('analyse in the backend' , analyses)
 if(!analyses || analyses.length === 0) {  
  return NextResponse.json({ status: 404 , message: "aucun analyse trouvé" });
 }  
    return NextResponse.json({ analyses , status:200 , message: "analyses trouvés" });
  
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching medications' });
  }
}
