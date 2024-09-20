
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
      return { allPatients: [] }; // Return an empty array in case of error

    }
}



export default async function Home() {



const {allPatients} = await getAllPatient() || {}


console.log("allPatients" , allPatients)


const navigation = [
  {
      href: '/Home',
      name: 'Patients'
  },


]

  return (
    <>
{/* <div className="flex min-h-screen">
  <Sidebar navigationItem = {navigation} />
  <div className="flex-grow ">
    <PatientTable  data={allPatients || []}/>
  </div>
</div> */}
 <div className="flex min-h-screen bg-[#edffec]">
        {/* Sidebar with a fixed width and height */}
        <Sidebar navigationItem={navigation}  />

        {/* Main content area */}
        <div className="flex-grow p-6">
          {/* Patient Table with a card-like container */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <PatientTable data={allPatients || []} />
          </div>
        </div>
      </div>

   

    </>
  );
}
