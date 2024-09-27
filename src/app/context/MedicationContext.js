'use client'
import { createContext, useContext, useState } from 'react';

// Create the context
const MedicationContext = createContext();

// Create a provider component
export const MedicationProvider = ({ children }) => {
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [patientId, setPatientId] = useState(null);  // For storing the current patient ID
  const [activeTab, setActiveTab] = useState("Consultation");  // For storing the active tab


  return (
    <MedicationContext.Provider value={{ selectedMedications, setSelectedMedications ,patientId , setPatientId , activeTab , setActiveTab }}>
      {children}
    </MedicationContext.Provider>
  );
};

// Custom hook to use the context
export const useMedications = () => {
  return useContext(MedicationContext);
};
