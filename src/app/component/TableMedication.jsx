// MedicationTable.js
'use client'
import { useState } from 'react';

const medications = [
  // Exemple de données. En réalité, cela proviendra d'une base de données ou API
  { name: 'Amoxicilline', class: 'Antibiotique', form: 'Comprimé', price: '10€' },
  { name: 'Paracétamol', class: 'Analgésique', form: 'Comprimé', price: '5€' },
  // Ajoute plus de médicaments ici
];
const form =[ "Analgésique" , "Comprimé" , "Injection" ,"applicable"]
const classMedicament=["Antibiotique" , "Analgésique" , "Antiviral" ]
export default function MedicationTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedForm, setSelectedForm] = useState('');
  const [selectedMedications, setSelectedMedications] = useState([]);


  const filteredMedications = medications.filter((med) => {
    return (
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedClass === '' || med.class === selectedClass) &&
      (selectedForm === '' || med.form === selectedForm)
    );
  });

  const handleSelect = (med) => {
    if (selectedMedications.includes(med)) {
        console.log("n9es dwa " , med)
      setSelectedMedications(selectedMedications.filter(m => m !== med));
      console.log("selectedMedications apres ma n9est" , selectedMedications)

    } else {
        console.log("zid dwa" , med)
      setSelectedMedications([...selectedMedications, med]);
      console.log("selectedMedications apres ma zedt" , selectedMedications)

    }

    console.log("selectedMedications" , selectedMedications)
    // onSelect(selectedMedications); // Appelle la fonction pour mettre à jour la sélection
  };
  console.log("selectedMedications bra" , selectedMedications)

  return (
    <div className="p-4">
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un médicament"
        className="p-2 border rounded-md mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filtres */}
      <div className="mb-4 flex space-x-4">
        <select
          className="p-2 border rounded-md"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
           <option value="">Toutes les classes</option>  
          {classMedicament.map((classe) => (
            <option value={classe}>{classe}</option>
          ))}
          {/* Ajoute plus de classes ici */}
        </select>

        <select
          className="p-2 border rounded-md"
          value={selectedForm}
          onChange={(e) => setSelectedForm(e.target.value)}
        >
            <option value="">Toutes les formes</option>
            {form.map((forme) => (
              <option value={forme}>{forme}</option>
            ))}
        
        </select>
      </div>

      {/* Tableau des médicaments */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
          <th className="py-2">Sélection</th>
            <th className="py-2">Nom</th>
            <th className="py-2">Classe</th>
            <th className="py-2">Forme</th>
            <th className="py-2">Prix</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedications.map((med, index) => (
            <tr key={index} className="text-center">
                  <td className="py-2">
                <input
                  type="checkbox"
                //   checked={selectedMedications.includes(med)}
                  onChange={() => handleSelect(med)}
                />
              </td>
              <td className="py-2">{med.name}</td>
              <td className="py-2">{med.class}</td>
              <td className="py-2">{med.form}</td>
              <td className="py-2">{med.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
