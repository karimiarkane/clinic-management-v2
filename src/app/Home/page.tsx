
import Sidebar from "@/app/component/SideBar"
import PatientTable from "../component/PatientTable"

const getAllPatient = async () =>{
  try{
      const data = await fetch(`http://localhost:3000/api/patient`,{cache: "no-store"}) 
      const res = await data.json()
      return res
    }
      catch(err){
      console.log(err)
    }
}



export default async function Home() {



const {allPatients} = await getAllPatient()
console.log("allPatients" , allPatients)


const navigation = [
  {
      href: '/Home',
      name: 'Patients'
  },


]

  return (
    <>
<div className="flex min-h-screen">
  <Sidebar navigationItem = {navigation} />
  <div className="flex-grow">
    <PatientTable data={allPatients}/>
  </div>
</div>

   

    </>
  );
}
