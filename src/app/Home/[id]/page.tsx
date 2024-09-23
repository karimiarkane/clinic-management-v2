import PatientComponent from "@/app/component/PatientComponent"
import { headers } from "next/headers"


const  getPatient = async (id : string)=>{  
  try{
      const data = await fetch(`http://localhost:3000/api/patient/${id}`,{cache: "no-store"}) 
      const res = await data.json()
      return res
}catch(err){
  console.log(err)
}
}


const Page =  async ({params } : {params : {id : string}}  )  => {

const headersList = headers()
console.log("headersList", headers)
  const responce = await getPatient(params.id)
  // console.log("the patient object sent to the patient", responce)

  const {patient  , consultation} : {patient : any , consultation : any}= responce
  return (
<>
<PatientComponent  patient={patient} consultation={consultation} />

</>


)
}

export default Page