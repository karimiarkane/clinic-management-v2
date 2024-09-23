import PatientTable from "../component/PatientTable";

const getAllPatient = async () => {
  
  try {
    const data = await fetch(`http://localhost:3000/api/patient`, {
      cache: "no-store",
    });
    const res = await data.json();
    return res;
  } catch (err) {
    console.log(err);
    return { allPatients: [] }; // Return an empty array in case of error
  }
};

export default async function Home() {
 
  const { allPatients } = (await getAllPatient()) || {};



  return (
    <>
        <div className="flex-grow p-6 ">
          {/* Patient Table with a card-like container */}
          <div className="bg-[#F6F8FA] shadow-lg rounded-lg p-4">
            <PatientTable data={allPatients || []} />
          </div>
        </div>
    </>
  );
}
