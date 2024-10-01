import React from 'react'
import {useMedications} from '../context/MedicationContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
const PrescriptionTab = () => {
    const {selectedMedications , setSelectedMedications} = useMedications()
  return (
<>

{selectedMedications.map((med, index) => {
            return (
              <div key={med.medication._id}  className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faX}
                  onClick={() =>
                    handleDeliteOneSelectedMedication(med.medication._id)
                  }
                  className="cursor-pointer mr-2"
                />
                <p className="mr-2">{med.medication.NOM_DE_MARQUE}</p>
                <input
                  type="text"
                //   value={med.consumption}
                  // onChange={(e) =>
                  //   handleInputConsumptionChange(
                  //     med.medication._id,
                  //     e.target.value
                  //   )
                  // }
                //   placeholder="Enter consumption instructions"
                />
              </div>
            );
          })}

</>

  )
}

export default PrescriptionTab