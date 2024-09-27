
'use client'
import { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useMedications } from '../context/MedicationContext';
import { useRouter } from 'next/navigation';

export default function MedicationTable() {

  const [medicaments, setMedicaments] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const {selectedMedications , setSelectedMedications ,patientId  } = useMedications()
  const router = useRouter()


    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();// State for the search input

  useEffect(() => {
    console.log("3awd b3et fetch")
    fetchMedicaments(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const fetchMedicaments = async (page, search) => {
    setLoading(true);
    const res = await fetch(`/api/medicaments?page=${page}&search=${search}`); // Pass search term in the query
    console.log("res" , res)
    const data = await res.json();
    console.log("data" , data)

    setMedicaments(data.medicaments);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

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


  const handleFillingSearchInput = (e) =>  {
    console.log('handle search change')
    setSearchTerm(e.target.value); // Update the search term
    setCurrentPage(1); // Reset to the first page when searching
    console.log("search term after ma bdelt fih" , searchTerm)
    console.log("current page afterma bdelt fih" , currentPage)

  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }









  // const medications = [
  //   // Exemple de données. En réalité, cela proviendra d'une base de données ou API
  //   { name: 'Amoxicilline', class: 'Antibiotique', form: 'Comprimé', price: '10€' },
  //   { name: 'Paracétamol', class: 'Analgésique', form: 'Comprimé', price: '5€' },
  //   // Ajoute plus de médicaments ici
  // ];
  // const form =[ "Analgésique" , "Comprimé" , "Injection" ,"applicable"]
  // const classMedicament=["Antibiotique" , "Analgésique" , "Antiviral" ]
  // const [selectedClass, setSelectedClass] = useState('');
  // const [selectedForm, setSelectedForm] = useState('');







  // const filteredMedications = medications.filter((med) => {
  //   return (
  //     med.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (selectedClass === '' || med.class === selectedClass) &&
  //     (selectedForm === '' || med.form === selectedForm)
  //   );
  // });

  const handleSelect = (med) => {
    if (selectedMedications.includes(med)) {
        console.log("n9es dwa " , med)
      setSelectedMedications(selectedMedications.filter(m => m !== med));
      // console.log("selectedMedications apres ma n9est" , selectedMedications)

    } else {
        console.log("zid dwa" , med)
      setSelectedMedications([...selectedMedications, med]);
      // console.log("selectedMedications apres ma zedt" , selectedMedications)

    }

    console.log("selectedMedications" , selectedMedications)
    onSelect(selectedMedications); // Appelle la fonction pour mettre à jour la sélection
  };
  console.log("selectedMedications bra" , selectedMedications)
  const handleConfirmSelection = () => {
    // Navigate back to the prescription form
    console.log("patient id after selection medication " , patientId)
    router.push(`/Home/${patientId}/`);
  };


  return (

    <div className="p-4 bg-white">
      {/* Barre de recherche */}
      <div className='flex justify-center'>
       { <div className=''>
            <Button className="py-2 px-4 font-medium text-white bg-[#1e71b8]  rounded-md" onPress={onOpen}>Ajouter un medicament</Button>
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
                  <form id="myform" onSubmit={handleSubmit}>
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
        </Modal>
        </div> }
        <input
          type="search"
          placeholder="Rechercher un médicament"
          className="p-2 border rounded-md mb-4 w-full bg-[#f0f0f0] focus:bg-white"
          value={searchTerm}
          onChange={handleFillingSearchInput}
        />
      </div>
      {/* add button  */}
 
   
  

      {/* Filtres */}
      {/* <div className="mb-4 flex space-x-4">
        <select
          className="p-2 border rounded-md"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
           <option value="">Toutes les classes</option>  
          {classMedicament.map((classe , index) => (
            <option key={index} value={classe}>{classe}</option>
          ))}
          {/* Ajoute plus de classes ici */}
        {/* </select>

        <select
          className="p-2 border rounded-md"
          value={selectedForm}
          onChange={(e) => setSelectedForm(e.target.value)}
        >
            <option value="">Toutes les formes</option>
            {form.map((forme , index) => (
              <option key={index} value={forme}>{forme}</option>
            ))}
        
        </select>
      </div> */} 

      {/* Tableau des médicaments */}
      {/* <table className="min-w-full bg-white">
        <thead>
          <tr>
          <th className="py-2">Sélection</th>
            <th className="py-2">DCM</th>
            <th className="py-2">FORME</th>
            <th className="py-2">DOSAGE</th>
            <th className="py-2">NOM_DE_MARQUE</th>
          </tr>
        </thead>
        <tbody>
          {medicaments.map((med, index) => (
            <tr key={index} className="text-center">
                  <td className="py-2">
                <input
                  type="checkbox"
                //   checked={selectedMedications.includes(med)}
                  onChange={() => handleSelect(med)}
                />
              </td>
              <td className="py-2">{med.DENOMINATION_COMMUNE_INTERNATIONALE}</td>
              <td className="py-2">{med.FORME}</td>
              <td className="py-2">{med.DOSAGE}</td>
              <td className="py-2">{med.NOM_DE_MARQUE}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        type="button"
        onClick={handleConfirmSelection}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
      >
        Confirm Selection
      </Button> */}
    </div>
  );
}
