import React from 'react'
import MedicationTable from  '../../component/TableMedication'


const  getMedicaments = async ()=>{  
  try{
      const data = await fetch(`http://localhost:3000/api/medicaments/`,{cache: "no-store"}) 
      const res = await data.json()
      return res
}catch(err){
  console.log(err)
};
}
const page = async () => {
const {medicaments}= await getMedicaments()
console.log("medications" , medicaments)
  return (
<>
<MedicationTable medicaments={medicaments}/>
</>  )
}

export default page