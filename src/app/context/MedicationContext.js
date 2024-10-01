'use client'
import { createContext, useContext, useState } from 'react';

// Create the context
const MedicationContext = createContext();

// Create a provider component
export const MedicationProvider = ({ children }) => {
  const [selectedMedications, setSelectedMedications] = useState([]);
  // const [patientId, setPatientId] = useState(null);  // For storing the current patient ID
  const [currentPatient , setCurrentPatient] = useState()
  const [activeTab, setActiveTab] = useState("Consultation"); 
  const [selectedAnalyse , setSelectedAnalyse] = useState([]) // For storing the active tab
  const [consultationDetails , setConsultationDetails] = useState({
    motif: "",
    resumeConsultation: "",
    symptomes: "",
    consultationDocuments: [],
  })


  return (
    <MedicationContext.Provider value={{setConsultationDetails , consultationDetails,  setSelectedAnalyse , selectedAnalyse,  selectedMedications, setSelectedMedications ,currentPatient , setCurrentPatient , activeTab , setActiveTab }}>
      {children}
    </MedicationContext.Provider>
  );
};

// Custom hook to use the context
export const useMedications = () => {
  return useContext(MedicationContext);
};
