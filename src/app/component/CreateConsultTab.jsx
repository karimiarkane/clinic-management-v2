"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMedications } from "../context/MedicationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus } from "@fortawesome/free-solid-svg-icons";

const CreateConsultTab = ({ patient }) => {
  const {
    selectedMedications,
    setSelectedMedications,
    setCurrentPatient,
    currentPatient,
    setSelectedAnalyse,
    selectedAnalyse,
    setConsultationDetails,
    consultationDetails
  } = useMedications();
  const [disableButton, setDisableButton] = useState(false);
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  // const [formData, setFormData] = useState({
  //   motif: "",
  //   resumeConsultation: "",
  //   symptomes: "",
  //   consultationDocuments: [],
  //   Medicaments: [],
  //   Analyses: [],
  // });
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setConsultationDetails((prevState) => ({
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
    setConsultationDetails((prevState) => ({
      ...prevState,
      [name]: selectedfiles,
    }));
  };


  useEffect(() => {
    setSuccessMsg("");
    setErrMsg("");
    setDisableButton(false);
  }, []);

  const handleSubmit = async (e) => {
    setDisableButton(true);
    if (disableButton) return;
    setErrMsg("");
    setSuccessMsg("");
    e.preventDefault();
    console.log("formData mojamaa : ", consultationDetails);
    const formDataToSend = new FormData();

    formDataToSend.append("motif", consultationDetails.motif);
    formDataToSend.append("resumeConsultation", consultationDetails.resumeConsultation);
    formDataToSend.append("symptomes", consultationDetails.symptomes);
    formDataToSend.append("Medicaments", JSON.stringify(selectedMedications));
    formDataToSend.append("Analyses", JSON.stringify(selectedAnalyse));

    if (
      consultationDetails.consultationDocuments &&
      consultationDetails.consultationDocuments.length
    ) {
      consultationDetails.consultationDocuments.forEach((file) => {
        formDataToSend.append("consultationDocuments", file);
      });
    }

    console.log("formDataToSend : ");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
    try {
      const res = await fetch(
        `http://localhost:3000/api/patient/${patient._id}/consultation`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      const resback = await res.json();
      console.log("res from the back in the front", resback);
      if (resback.status != 200) {
        setErrMsg(resback.message);
        router.refresh()
      } else {
        setSuccessMsg(resback.message);
        setConsultationDetails({
          motif: "",
    resumeConsultation: "",
    symptomes: "",
    consultationDocuments: [],
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
    setCurrentPatient(patient);
    // Navigate to the medication selection route

    router.push("/Home/Medicaments");
  };
  const handleAddAnalyse = () => {
    setCurrentPatient(patient);
    // Navigate to the medication selection route

    router.push("/Home/Analyse");
  };

  const handleDeliteOneSelectedMedication = (medId) => {
    setSelectedMedications((prevState) =>
      prevState.filter((med) => med.medication._id !== medId)
    );
    console.log("selectedmedication", setSelectedMedications);
  };

  
  const handleDeliteOneSelectedAnal = (analId) => {
    setSelectedAnalyse((prevState) =>
      prevState.filter((anal) => anal._id !== analId)
    );
  };
  
  const handleInputConsumptionChange = (medId, value) => {
    console.log("input change");
    setSelectedMedications((prevState) =>
      prevState.map((med) =>
        med.medication._id === medId ? { ...med, consumption: value } : med
      )
    );
  };
  return (
    <>
      <form id="myform" className=" p-2" onSubmit={handleSubmit}>
        <div className="motif">
          <label htmlFor="motif" className=" text-gray-700 font-bold">
            Motif :
          </label>
          <textarea
            id="motif"
            name="motif"
            onChange={handleChange}
            value={consultationDetails.motif}
            className="block w-full rounded-md border-0 p-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
          ></textarea>
        </div>
        <div className="symptomes">
          <label htmlFor="symptomes" className="text-gray-700 font-bold ">
            Symptomes :
          </label>
          <textarea
            id="symptomes"
            name="symptomes"
            onChange={handleChange}
            value={consultationDetails.symptomes}
            className="block w-full rounded-md border-0 p-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
        <div className="resume">
          <label
            htmlFor="resumeConsultation"
            className="text-gray-700 font-bold "
          >
            Resumé de la consultation:
          </label>
          <textarea
            id="resumeConsultation"
            name="resumeConsultation"
            onChange={handleChange}
            value={consultationDetails.resumeConsultation}
            className="block w-full rounded-md border-0 p-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>

        <div className="medicament">
          <div className="">
            <label className="text-gray-700 font-bold">Medicaments :</label>
            <button
              type="button"
              onClick={handleAddMedication}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1.5 m-2 rounded focus:outline-none focus:shadow-outline"
            >
              <FontAwesomeIcon icon={faPlus} className="mx-2" />
              ajouter medicament
            </button>
          </div>
          {selectedMedications.map((med, index) => (
            <div
              key={med.medication._id}
              className="flex items-start mb-2 p-1 bg-gray-100 rounded-lg shadow-sm"
            >
              <FontAwesomeIcon
                icon={faX}
                onClick={() =>
                  handleDeliteOneSelectedMedication(med.medication._id)
                }
                className="cursor-pointer mr-2 text-red-600 border-solid border-4 p-1"
              />
              <div className="flex-1">
                <label
                  className="block text-gray-800 font-medium mb-1"
                  htmlFor={med.medication._id}
                >
                  {med.medication.NOM_DE_MARQUE}
                </label>
                <textarea
                  id={med.medication._id}
                  value={med.consumption || ""}
                  onChange={(e) =>
                    handleInputConsumptionChange(
                      med.medication._id,
                      e.target.value
                    )
                  }
                  placeholder="Detaille de consommation"
                  className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="analyse">
          <div className="">
            <label className="text-gray-700 font-bold">Analyse :</label>
            <button
              type="button"
              onClick={handleAddAnalyse}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1.5 m-2 rounded focus:outline-none focus:shadow-outline"
            >
              <FontAwesomeIcon icon={faPlus} className="mx-2" />
              ajouter analyse
            </button>
          </div>
          {selectedAnalyse.map((anal, index) => (
            <div
              key={anal._id}
              className="flex items-start mb-2 p-1 bg-gray-100 rounded-lg shadow-sm"
            >
              <FontAwesomeIcon
                icon={faX}
                onClick={() => handleDeliteOneSelectedAnal(anal._id)}
                className="cursor-pointer mr-2 text-red-600 border-solid border-4 p-1"
              />
              <div className="flex-1">
                <label
                  className="block text-gray-800 font-medium mb-1"
                  htmlFor={anal._id}
                >
                  {anal.nom}
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="dossierDeConsultation">
          <label
            htmlFor="consultationDocuments"
            className="text-gray-700 font-bold "
          >
            Dossier de Consultation :
          </label>

          <div class="flex items-center justify-around m-2">
            <label class="flex flex-col items-center px-2 py-4  bg-blue-500 text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600">
              <FontAwesomeIcon icon={faPlus} />
              <span class="mt-2 text-base leading-normal">
                importer les fichiers
              </span>
              <input
                type="file"
                name="consultationDocuments"
                onChange={handleFileChange}
                multiple
                id="consultationDocuments"
                className="hidden pr-12 pl-3 py-1.5 text-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-600"
              />{" "}
            </label>
            {/* {formData.consultationDocuments.map((file, index) => (
    <span key={index} id="fileName" className="ml-4 text-gray-600">{file.name}</span>

    ))} */}
            <ul className="mt-4 w-full max-w-md p-4">
              {consultationDetails.consultationDocuments.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2 shadow-sm text-gray-700"
                >
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {successMsg && <div className="text-green-500">{successMsg}</div>}
        {errMsg && <div className="text-red-500">{errMsg}</div>}
      </form>
      <div className="border-2 border-solid flex justify-end">
        <button
          form="myform"
          type="submit"
          disabled={disableButton}
          className=" px-4 py-2  rounded-2xlP m-3 text-white bg-blue-700"
        >
          Ajouter
        </button>
      </div>
    </>
  );
};

export default CreateConsultTab;
