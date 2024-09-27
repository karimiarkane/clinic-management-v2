'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useMedications } from '../context/MedicationContext';


const CreateConsultTab = ({patient}) => {
  const { selectedMedications ,setSelectedMedications } = useMedications();
    const [disableButton , setDisableButton] = useState(false)
    const router = useRouter()
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState(""); 
    const [formData, setFormData] = useState({
      motif: "",
      resumeConsultation: "",
      consultationDocuments: [],
      Medicaments: [], 
      Analyses: [],
    });
    const handleChange = (e) => {
      const { name, value } = e.currentTarget;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    const handleFileChange = (e) => {
      // Assuming you're using the same state structure
      const { name, files } = e.currentTarget;
      const selectedfilesUrls = [];
      const selectedfiles = Array.from(files); // convert files object to an array of fileq
      for (let i = 0; i < selectedfiles.length; i++) {
        const file = files[i];
        const fileUrl = URL.createObjectURL(file); // to show it in the front before applading
        selectedfilesUrls.push(fileUrl);
      }
      console.log("selectedfilesUrls : ", selectedfilesUrls);
      setFormData((prevState) => ({
        ...prevState,
        [name]: selectedfiles,
      }));
    };  
    useEffect(() => {
    
        setSuccessMsg("");
        setErrMsg("");
        setDisableButton(false)
      
    }, []);
  
    const handleSubmit = async (e) => {
      setDisableButton(true)
      if(disableButton) return
      setErrMsg("");
      setSuccessMsg("");
      e.preventDefault();
      console.log("formData mojamaa : ", formData);
      const formDataToSend = new FormData();
  
      formDataToSend.append("motif", formData.motif);
      formDataToSend.append("resumeConsultation", formData.resumeConsultation);
      formDataToSend.append("Medicaments", JSON.stringify(formData.Medicaments));
      formDataToSend.append("Analyses", JSON.stringify(formData.Analyses));
     
      if (
        formData.consultationDocuments &&
        formData.consultationDocuments.length
      ) {
        formData.consultationDocuments.forEach((file) => {
          formDataToSend.append("consultationDocuments", file);
        });
      }
  
      console.log("formDataToSend : ");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
      try {
        const res = await fetch(`http://localhost:3000/api/patient/${patient._id}/consultation`, {
          method: "POST",
          body: formDataToSend,
        });
        const resback = await res.json();
        console.log("res from the back in the front", resback);
        if (resback.status != 200) {
          setErrMsg(resback.message);
        } else {
          setSuccessMsg(resback.message);
          setFormData({
              motif: "",
      resumeConsultation: "",
      consultationDocuments: [],
      Medicaments: [],
      Analyses: [],
  
          });
          router.refresh();
        }
      } catch (error) {
        console.error("error fetch front", error);
        setErrMsg(error.message);
      }
      // setErrMsg("")
      // setSuccessMsg("")
  
      
    };
    const handleAddMedication = () => {
      // Navigate to the medication selection route
      router.push('/Home/Medicaments');
    };
  return (

<>
<form id="myform" className='border-solid border-4 border-green-700 p-2' onSubmit={handleSubmit}>
                
                      <div className="">
                        <label htmlFor="motif" className=" text-gray-700 font-bold">
                          Motif :
                        </label>
                        <textarea
                           id="motif"
                           name="motif"
                           onChange={handleChange}
                           required
                           value={formData.motif}
                           className="block w-full rounded-md border-0 p-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                         ></textarea>           
                      </div>
                      <div className="">
                        <label htmlFor="resumeConsultation" className="text-gray-700 font-bold">
                        Resumé de la consultation:
                        </label>
                        <textarea
                           id="resumeConsultation"
                           name="resumeConsultation"
                           onChange={handleChange}
                           required
                           value={formData.resumeConsultation}
                           className="block w-full rounded-md border-0 p-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                         ></textarea>




                       
                      </div>
                        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Medicaments
          </label>

          {/* Display selected medications */}
          {/* <div className="border rounded p-2 mb-2">
            {selectedMedications.length > 0 && (
              <ul>
                {selectedMedications.map((med, index) => (
                  <li key={index}>
                    <p>{med}</p>
                    <input type="text" className="text" />
                  </li>

                ))}
              </ul>
            ) }
          </div> */}

          {/* Button to navigate to medication table */}
          <button
            type="button"
            onClick={handleAddMedication}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Medication
          </button>
        </div>          
{/* document */}
                      <div className="py-3 flex gap-x-4 items-center">
                        <label htmlFor="consultationDocuments" className="text-gray-600">
                          Dossier de Consultation :
                        </label>
                        <input
                          type="file"
                          name="consultationDocuments"
                          onChange={handleFileChange}
                          multiple
                          id="consultationDocuments"
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>
                 

                  {successMsg && (
                    <div className="text-green-500">{successMsg}</div>
                  )}
                  {errMsg && <div className="text-red-500">{errMsg}</div>}
                </form>
                <button form="myform" type="submit" disabled={disableButton}  className="px-4 py-2 text-blue-700 rounded-2xlP   duration-150 hover:text-white hover:bg-indigo-500 active:bg-indigo-700">
                  Ajouter
                </button>
                
</>  )
}

export default CreateConsultTab