"use client";
import React, { useState } from "react";

import mongoose from "mongoose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Consultation from "./ConsultationTab";
import DossierMedicalTab from "./DossierMedicalTab";
import InfoPersoTab from "./InfoPersoTab";
import InfoMedTab from "./InfoMedTab";
import CreateConsultTab from "./CreateConsultTab";
import CMHForm from "./CMHForm";


import {
  faArrowLeft,
  faHospitalUser,
  faFolder,
  faPersonCircleQuestion,
  faPersonCirclePlus,
  faNotesMedical,
  faFileInvoice,
  faFileMedical,
  faFileWaveform,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PatientComponentProps = {
  patient: {
    _id: string;
    prenom: string;
    nom: string;
    age: number;
    sexe: string;
    Addresse: string;
    etatCivil: string;
    telephone: string;
    profession: string;
    assurance: string;
    /*informations medical */
    patientHistoryDocuments: string[];

    informationsUtiles: string;
    antecedentsFamiliaux: string;
    antecedentsPersonnels: string;
    consultations: [
      {
        type: mongoose.Schema.Types.ObjectId;
        ref: "Consultation";
      }
    ];
  };

  consultation: [
    {
      _id: string;
      date: string;
      motif: string;
      resumeConsultation: string;
      consultationDocuments: string[];
      patient: {
        type: mongoose.Schema.Types.ObjectId;
        ref: "Patient";
      };
    }
  ];
};
const PatientComponent: React.FC<PatientComponentProps> = ({
  patient,
  consultation,
}: PatientComponentProps) => {
  const [selectedTab, setSelectedTab] = useState("Consultation");
  const formData = {
    date: "2023-10-01",
    nom: "Doe",
    prenom: "John",
    dob: "1990-01-01",
    motif: "Routine Checkup",
    medicalHistory: "Hypertension, Diabetes",
    surgicalHistory: "Appendectomy in 2010",
    allergies: "Penicillin",
    treatment: "Metformin, Lisinopril",
  };
  const tabs = [
    {
      key: "Consultation",
      title: "Consultation",
      icon: (
        <FontAwesomeIcon
          icon={faNotesMedical}
          size="1x"
          color="#1e71b8"
          className="mr-2"
        />
      ),
    },
    {
      key: "Nouvelle consult",
      title: "Ajouter Consultation",
      icon: (
        <FontAwesomeIcon
          icon={faPlus}
          size="1x"
          color="#1e71b8"
          className="mr-2"
        />
      ),
    },
    {
      key: "Information Personnelle",
      title: "Info Personnelles",
      icon: (
        <FontAwesomeIcon
          icon={faPersonCircleQuestion}
          size="1x"
          color="#1e71b8"
          className="mr-2"
        />
      ),
    },
    {
      key: "Informations Medicales",
      title: "Info Medicales",
      icon: (
        <FontAwesomeIcon
          icon={faPersonCirclePlus}
          size="1x"
          color="#1e71b8"
          className="mr-2"
        />
      ),
    },
    {
      key: "Dossier Medicale",
      title: "Dossier Medicale",
      icon: (
        <FontAwesomeIcon
          icon={faFolder}
          size="1x"
          color="#1e71b8"
          className="mr-2"
        />
      ),
    },
    {
      key: "ScannerEtRadio",
      title: "Scanner/Radio",
      icon: (
        <FontAwesomeIcon
          icon={faFileWaveform}
          size="1x"
          color="#1e71b8"
          className="mr-2"
        />
      ),
    },
    {
      key: "Ordonnace",
      title: " Ordonnace",
      icon: (
        <FontAwesomeIcon
          icon={faFileMedical}
          size="1x"
          color="#1e71b8"
          className="mr-2"
        />
      ),
    },
  ];


  return (
    <>
    <div className="flex h-full  justify-between   ">
         {/* <div className="NameAndReturn flex justify-around items-center">
          
            <div>
              <Link href="/">
                <FontAwesomeIcon
                  size="2x"
                  color="#1e71b8"
                  icon={faArrowLeft}
                />
              </Link>
            </div>
            <h2 className="text-center text-lg font-ethnocentric p-5">
              {patient.nom} {patient.prenom}
            </h2>
          </div>  */}
 <div
          style={{ width: "23%" }}
          className="card  bg-white p-6 rounded-lg shadow-lg  border-solid border-2 h-full"
        >
          <div className=" mridicon text-center  ">
            <FontAwesomeIcon icon={faHospitalUser} color="#1e71b8" size="4x" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-center">
            {patient.nom} {patient.prenom}
          </h3>
          <p className="text-center text-gray-500">{patient.telephone}</p>
          <div className="mt-6 tabs flex flex-col items-center ">
            {tabs.map((tab, index) => {
              return (
                <div
                  key={index}
                  className="border-solid border-2 w-11/12 p-2 mt-1  flex items-center  cursor-pointer rounded-md bg-[#E3E5E6]"
                  onClick={() => setSelectedTab(tab.key)}
                >
                  {tab.icon}
                  {tab.title}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-3/4 bg-white h-full    overflow-y-auto ">
          {selectedTab == "Consultation" && (
            <Consultation consultation={consultation} patient={patient} />
          )}
          {selectedTab == "Nouvelle consult" && (
            <CreateConsultTab patient={patient} />
          )}
          {selectedTab == "Ordonnace" && <div>ordonnace</div>}
          {selectedTab == "ScannerEtRadio" && <CMHForm formData={formData}/>}
          {selectedTab == "Dossier Medicale" && (
            <DossierMedicalTab patient={patient} />
          )}
          {selectedTab == "Information Personnelle" && (
            <InfoPersoTab patient={patient} />
          )}
          {selectedTab == "Informations Medicales" && (
            <InfoMedTab patient={patient} />
          )}
        </div>    
      </div>
    </>
  );
};

export default PatientComponent;
