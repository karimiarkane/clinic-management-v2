import { createContext, useContext, useState } from 'react';

const MedicationContext = createContext();

export const MedicationProvider = ({ children }) => {
  const [selectedMedications, setSelectedMedications] = useState([]);

  return (
    <MedicationContext.Provider value={{ selectedMedications, setSelectedMedications }}>
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedications = () => useContext(MedicationContext);
