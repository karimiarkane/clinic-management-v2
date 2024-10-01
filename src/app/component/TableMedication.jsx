// /* eslint-disable react-hooks/exhaustive-deps */
// // MedicationTable.js
"use client";
import { useState, useEffect } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useMedications } from "../context/MedicationContext";
import { useRouter } from "next/navigation";

// const medications = [
//   // Exemple de données. En réalité, cela proviendra d'une base de données ou API
//   { name: 'Amoxicilline', class: 'Antibiotique', form: 'Comprimé', price: '10€' },
//   { name: 'Paracétamol', class: 'Analgésique', form: 'Comprimé', price: '5€' },
//   // Ajoute plus de médicaments ici
// ];
// const form =[ "Analgésique" , "Comprimé" , "Injection" ,"applicable"]
// const classMedicament=["Antibiotique" , "Analgésique" , "Antiviral" ]
export default function MedicationTable({ medicaments }) {
  const router = useRouter();
  const { selectedMedications, setSelectedMedications, currentPatient } =
    useMedications();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedications, setFilteredMedications] = useState(medicaments);
  const [formData, setFormData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // const [currentItems, setCurrentItems] = useState()
  
  //    const [selectedClass, setSelectedClass] = useState('');
  // const [selectedForm, setSelectedForm] = useState('');


  // useEffect(() => {
  //   const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term.trim() !== '');
  //   // console.log("searchTerms", searchTerms)
  //   const filtered = data.filter((patient : Patient)  => {
  //       const patientFullName = `${patient.nom.toLowerCase()} ${patient.prenom.toLowerCase()}`;
  //       return searchTerms.every(term => patientFullName.includes(term));
  //  } );
  //   setFilteredPatients(filtered);
  //   // console.log('filtered' , filtered);
  //   setCurrentPage(1); // Reset to the first page after filtering
  // }, [searchTerm, data]);
  







  useEffect(() => {
    const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term.trim() !== '');
    // return searchTerms.every(term => patientFullName.includes(term))
    const filteredMedications = medicaments.filter((med) => {
      return searchTerms.every(term =>  med.DENOMINATION_COMMUNE_INTERNATIONALE.toLowerCase().includes(term));
    });
    setFilteredMedications(filteredMedications);
    // console.log('filtered' , filtered);
    setCurrentPage(1); // Reset to the first page after filtering
    
  }, [searchTerm, medicaments]);

  useEffect(() => {
    setFilteredMedications(medicaments);
  }, [medicaments]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredMedications.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(filteredMedications.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelect = (med) => {
    if (
      selectedMedications.some(
        (selected) => selected.medication._id === med._id
      )
    ) {
      setSelectedMedications(
        selectedMedications.filter(
          (selected) => selected.medication._id !== med._id
        )
      );
    } else {
      setSelectedMedications([
        ...selectedMedications,
        { medication: med, consumption: "" },
      ]);
    }
  };

  const handleSubmitNewMed = () => {
    // Ajouter le nouveau médicament à la liste et fermer la modal
    console.log("submit new medication");
    // const newMedication = { name: 'Nouveau médicament', class: 'Nouvelle catégorie', form: 'Nouvelle formulation', price: 'Nouveau prix' };
    // setMedicaments([...medicaments, newMedication]);
    onClose();
  };
  const handleConfirmSelectionClick = () => {
    console.log("selected medication", selectedMedications);
    router.push(`/Home/${currentPatient._id}`);
  };

  return (
    <div className="p-4 bg-white">
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un médicament"
        className="p-2 border rounded-md mb-4 w-full bg-[#f0f0f0] focus:bg-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* add button  */}
      <>
        {/* <Button className="py-2 px-4 font-medium text-white bg-[#1e71b8]  rounded-full" onPress={onOpen}>Ajouter un medicament</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="5xl"
        className="border-solid border-2"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Ajout du medicament
              </ModalHeader>
              <ModalBody>
                <form id="myform" onSubmit={handleSubmitNewMed}>
                  <div className="flex  justify-around items-center ">
                    <div className="  infoPersonnelle w-2/5 border-r">
                      <div className="py-1 flex gap-x-4 items-center">
                        <label htmlFor="nom" className="text-gray-600">
                          Nom:
                        </label>
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          id="nom"
                          required
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>
                      <div className="py-1 flex gap-x-4 items-center">
                        <label htmlFor="nom" className="text-gray-600">
                          Classe:
                        </label>
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          id="nom"
                          required
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>
                      <div className="py-1 flex gap-x-4 items-center">
                        <label htmlFor="nom" className="text-gray-600">
                          Forme:
                        </label>
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          id="nom"
                          required
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>

                    </div>


                  </div>

                  {successMsg && (
                    <div className="text-green-500">{successMsg}</div>
                  )}
                  {errMsg && <div className="text-red-500">{errMsg}</div>}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Annuler
                </Button>

                <button form="myform" type="submit" disabled={disableButton}  className="px-4 py-2 text-blue-700 rounded-2xlP   duration-150 hover:text-white hover:bg-indigo-500 active:bg-indigo-700">
                  Ajouter
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
      </>
      <Button
        onPress={handleConfirmSelectionClick}
        onClick={handleConfirmSelectionClick}
      >
        confirmer
      </Button>

      {/* Filtres */}
      <div className="mb-4 flex space-x-4">
        {/* <select
          className="p-2 border rounded-md"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
           <option value="">Toutes les classes</option>  
          {classMedicament.map((classe , index) => (
            <option key={index} value={classe}>{classe}</option>
          ))}
           Ajoute plus de classes ici 
        </select> 

         <select
          className="p-2 border rounded-md"
          value={selectedForm}
          onChange={(e) => setSelectedForm(e.target.value)}
        >
            <option value="">Toutes les formes</option>
            {form.map((forme , index) => (
              <option key={index} value={forme}>{forme}</option>
            ))}
        
        </select> */}
        {/* Filtres */}
      </div>

      {/* Tableau des médicaments */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Sélection</th>
            <th className="py-2">DCI</th>
            <th className="py-2">Marque</th>
            <th className="py-2">FORME</th>
            <th className="py-2">DOSAGE</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((med, index) => (
            <tr key={index} className="text-center ">
              <td className="py-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedMedications.some(
                    (selected) => selected.medication._id === med._id
                  )}
                  onChange={() => handleSelect(med)}
                />
              </td>
              <td className="py-2">
                {med.DENOMINATION_COMMUNE_INTERNATIONALE}
              </td>
              <td className="py-2">{med.NOM_DE_MARQUE}</td>
              <td className="py-2">{med.FORME}</td>
              <td className="py-2">{med.DOSAGE}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
