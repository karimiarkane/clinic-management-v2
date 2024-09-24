import React from 'react'
import DoctorInfoForm from "../../component/DoctorInfoForm"
import mongoose from 'mongoose'

const  getDoctor = async ()=>{  
    try{
        const data = await fetch(`http://localhost:3000/api/medecin`,{cache: "no-store"}) 
        const res = await data.json()
        // console.log("res" , res)
        return res
  }catch(err){
    console.log(err)
  }
  }


const page = async () => {
    const doctor = await getDoctor()
    // console.log("doctor", doctor)
 const   infoDoctor={
        nom : "iarkane",
        prenom : "karim",
        Addresse : "Ain Benian Alger",
        contact : "0558000466",
        specialite : "Dentiste"
    }
  return (
    <>
    <DoctorInfoForm infoDoctor={infoDoctor} />
    </>
  )
}

export default page