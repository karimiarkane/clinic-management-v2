/* eslint-disable react/no-unescaped-entities */
import { useRef } from "react";
import Image from "next/image";
import html2pdf from "html2pdf.js";
import { Button } from "@nextui-org/react";
import { useMedications } from "../context/MedicationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
/* eslint-disable react/prop-types */

const CMHForm2 = ({ patient }) => {
  const route = useRouter();
  const componentRef = useRef(null);
  const {
    selectedMedications,
    setSelectedMedications,
    setCurrentPatient,
    currentPatient,
  } = useMedications();

  // console.log("hwa" , hwaa)
  const handlePrintClick = () => {
    if (componentRef.current) {
      html2pdf().from(componentRef.current).save();
    }
  };

  const handleInputConsumptionChange = (medId, value) => {
    console.log("input change");
    setSelectedMedications((prevState) =>
      prevState.map((med) =>
        med.medication._id === medId ? { ...med, consumption: value } : med
      )
    );
  };

  const handleDeliteOneSelectedMedication = (medId) => {
    setSelectedMedications((prevState) =>
      prevState.filter((med) => med.medication._id !== medId)
    );
    console.log("selectedmedication", setSelectedMedications);
  };

  const handleAddMedication = () => {
    router.push("/Home/Medicaments");
  };

  return (
    <div>
      <div className="flex justify-end"><Button onClick={handlePrintClick} className="mb-2" >enregister</Button></div>

      <div
        ref={componentRef}
        id="pdf-content"
        className="w-[210mm] mx-auto p-8"
      >
        {/* Header */}
        <div className="flex justify-center items-center mb-4">
          <div className=" w-3/4   flex justify-between items-center">
            <Image
              src="/cropped-logo-CMH-Bilan-de-sante-300.png"
              alt="CMH Logo"
              width={160} // Adjusted width in pixels
              height={128} // Adjusted height in pixels
              className="h-32 w-40"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-red-500">
                CENTRE MEDICAL HYDRA
              </h1>
              <p className="text-gray-700">
                2 Rue Abberrezak Belidem, 16035 Hydra Alger
              </p>
              <p>Tel: +213(0)21 483 206 / +213(0)551 660 003</p>
              <p>E-mail: contact@cmhydra.com | www.cmhydra.com</p>
            </div>
          </div>
        </div>

        {/* identification */}
        <div className="flex justify-between mb-4">
          <p className="">
            Date:{" "}
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <div>
            Patient :{patient.nom} {patient.prenom}
          </div>
          <div>Age :{patient.age}</div>
        </div>
        {/* medication*/}
        <div className="medicament">
          <div className="">
        {/* already selected medication*/}
          

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
      </div>
    </div>
  );
};

export default CMHForm2;
