import React from "react";
import MedicationTable from "../../component/TableMedication";

const getMedicaments = async () => {
  try {
    const data = await fetch("http://localhost:3000/api/medicaments/", {
      cache: "no-store",
    });
    console.log('data inside the function ' , data)
    const res = await data.json();
    console.log("responce inside the funciton in the page", res);
    return res;
  } catch (err) {
    console.log(err);
    return { medicaments: [] }; // Return an empty array in case of error
  }
};
export default async function MedicamentPage() {
  const responce = await getMedicaments();
  console.log("responce outside  the function in medicamentPage", responce);
  const { medicaments } = (await getMedicaments()) || {};
  console.log("medications", medicaments);
  return (
    <>
      <MedicationTable medicaments={medicaments || [] } />
    </>
  );
}

//  import PatientTable from "../component/PatientTable";

// const getAllPatient = async () => {

//   try {
//     const data = await fetch(`http://localhost:3000/api/patient`, {
//       cache: "no-store",
//     });
//     const res = await data.json();
//     return res;
//   } catch (err) {
//     console.log(err);
//     return { allPatients: [] }; // Return an empty array in case of error
//   }
// };

// export default async function Home() {

//   const { allPatients } = (await getAllPatient()) || {};

//   return (
//     <>
//         {/* <div className="flex-grow p-6 "> */}
//           {/* Patient Table with a card-like container */}
//             <PatientTable data={allPatients || []} />

//         {/* </div> */}
//     </>
//   );
// }
