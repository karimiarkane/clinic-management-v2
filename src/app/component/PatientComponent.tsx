"use client";
import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import EditPersonnalInfoModal from "./EditPersonnalInfoModal";
import EditMedicalInfoModal from "./EditMedicalInfoModal";
import AploadNewDocumentModal from "./AploadNewDocumentModal";
import AddConsultationModal from "./AddConsultationModal";
import EditConsultationInfo from "./EditConsultationInfo";
import ShowConsultationModal from "./ShowConsultationModal";
import mongoose from "mongoose";
import ShowDocumentModal from "./ShowDocumentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Consultation from './ConsultationTab'
import DossierMedicalTab from "./DossierMedicalTab"
import InfoPersoTab from './InfoPersoTab'
import InfoMedTab from './InfoMedTab'
import CreateConsultTab from './CreateConsultTab'
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
        <FontAwesomeIcon icon={faPlus}   size="1x"
        color="#1e71b8"
        className="mr-2"/>
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

  const router = useRouter();

  const hundleDeliteClick = async (docName: string) => {
    console.log("docName", docName);

    let confirmDelete = window.confirm(
      "tu veux vraiment supprimer ce document de ce patient ?"
    );

    if (confirmDelete) {
      try {
        const res = await fetch(`/api/patient/${patient._id}/documents`, {
          method: "DELETE",
          body: JSON.stringify({
            documentName: docName,
            patientId: patient._id,
          }),
        });
        const data = await res.json();
        if (data.status === 200) {
          window.alert("Document supprimé");
          router.refresh();
        } else {
          window.alert("Erreur lors de la suppression de l'utilisateur");
        }
      } catch (err) {
        console.log("error deleting document : ", err);
      }
    }
  };

  const hundleDeliteConsultation = async (consultationId: string) => {
    let confirmDelete = window.confirm(
      "tu veux vraiment supprimer cette consultation ?"
    );

    if (confirmDelete) {
      try {
        const res = await fetch(`/api/patient/${patient._id}/consultation`, {
          method: "DELETE",
          body: JSON.stringify({
            consultationId,
          }),
        });
        const data = await res.json();
        if (data.status === 200) {
          window.alert("consultation supprimé");
          router.refresh();
        } else {
          window.alert("Erreur lors de la suppression de l'utilisateur");
        }
      } catch (err) {
        console.log("error deleting document : ", err);
      }
    }
  };

  const hundleDeiteDocumentConsultation = async (
    consultationId: string,
    docName: string
  ) => {
    // console.log("docName", docName);

    let confirmDelete = window.confirm(
      "tu veux vraiment supprimer ce document de cette consultation ?"
    );

    if (confirmDelete) {
      try {
        const res = await fetch(
          `/api/patient/${patient._id}/consultation/docierConsultation`,
          {
            method: "DELETE",
            body: JSON.stringify({
              documentName: docName,
              consultationId: consultationId,
            }),
          }
        );
        const data = await res.json();
        if (data.status === 200) {
          window.alert("Document supprimé");
          router.refresh();
        } else {
          window.alert("Erreur lors de la suppression de l'utilisateur");
        }
      } catch (err) {
        console.log("error deleting document : ", err);
      }
    }
  };

 

  return (
    <>
      <div className="flex  min-h-screen bg-[#F6F8FA]">
        {/* information personelle */}

        {/* <div className="border-r-2  p-5  bg-[#1d3e8e] space-y-8  w-1/4">
          <nav className="     ">
            <div className="flex justify-between border-b items-center">
              <h2
              // className="text-center text-lg font-semibold text-gray-700  p-5"
              className="text-center text-lg font-ethnocentric text-[#edffec] p-5"
              >
                Information Personnelles
              </h2>
             <div>
             <Link href="/">
             <FontAwesomeIcon size="2xl" color="#edffec" icon={faArrowLeft} />
              </Link>
             </div>
            </div>
            <div className="flex-col items-center justify-center text-[#edffec]">
              <p className="p-2">
                <span className="font-bold ">Nom</span>:{" "}
                {patient.nom}
              </p>
              <p className="p-2 text-century-gothic">
                <span className="font-bold ">Prénom</span>:{" "}
                {patient.prenom}
              </p>
              <p className="p-2 text-century-gothic">
                <span className="font-bold ">Age</span>:{" "}
                {patient.age}
              </p>
              <p className="p-2 text-century-gothic">
                <span className="font-bold ">Sexe</span>:{" "}
                {patient.sexe}
              </p>
              <p className="p-2 text-century-gothic ">
                <span className="font-bold ">Téléphone</span>:{" "}
                {patient.telephone}
              </p>
              <p className="p-2 text-century-gothic">
                <span className="font-bold *">Adresse</span>:{" "}
                {patient.Addresse}
              </p>
              <p className="p-2 text-century-gothic">
                <span className="font-bold ">Profession</span>:{" "}
                {patient.profession}
              </p>
              <p className="p-2 text-century-gothic">
                <span className="font-bold ">Assurance</span>:{" "}
                {patient.assurance}
              </p>
              <p className="p-2 text-century-gothic">
                <span className="font-bold ">État Civil: </span>{" "}
                {patient.etatCivil}
              </p>
              <div className="flex justify-end">
                <EditPersonnalInfoModal
                  patientPersonnalInfo={{
                    id: patient._id,
                    nom: patient.nom,
                    prenom: patient.prenom,
                    age: patient.age,
                    sexe: patient.sexe,
                    telephone: patient.telephone,
                    Addresse: patient.Addresse,
                    profession: patient.profession,
                    assurance: patient.assurance,
                    etatCivil: patient.etatCivil,
                  }}
                />
              </div>
            </div>
          </nav>
        </div> */}

        <div className="w-1/5">
          <div className="NameAndReturn flex justify-around items-center">
          
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
          </div>
          <div className="card bg-white p-6 rounded-lg shadow-lg  border-solid border-2">
            <div className=" mridicon text-center  ">
              <FontAwesomeIcon
                icon={faHospitalUser}
                color="#1e71b8"
                size="4x"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-center">
              {patient.nom} {patient.prenom}
            </h3>
            <p className="text-center text-gray-500">{patient.telephone}</p>
            <div className=" tabs flex flex-col items-center ">
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
          *{" "}
          {/* <div className=" tabs flex flex-col items-center ">
            {tabs.map((tab, index) => {
              return (
                <div
                  key={index}
                  className="border-solid border-2 w-3/4 p-3 mt-1  flex items-center  cursor-pointer "
                  onClick={() => setSelectedTab(tab.key)}
                >
                  {tab.icon}
                  {tab.title}
                </div>
              );
            })}
          </div> */}
          *{" "}
        </div>

        <div className="w-3/4  bg-[#F6F8FA] ">
{selectedTab == "Consultation" && (
  <Consultation consultation = {consultation} patient = {patient}/>)}
{selectedTab == "Nouvelle consult" && (
  <CreateConsultTab patient={patient} />)}
  {selectedTab == "Ordonnace" && (
  <div>ordonnace</div>)}
  {selectedTab == "ScannerEtRadio" && (
  <div>ScannerEtRadio</div>)}
  {selectedTab == "Dossier Medicale" && (
  <DossierMedicalTab patient={patient} />)}
  {selectedTab == "Information Personnelle" && (
  <InfoPersoTab patient={patient} />)}
  {selectedTab == "Informations Medicales" && (
  <InfoMedTab patient={patient} />)}



          {/* <Tabs aria-label="Options" fullWidth className="pt-5 ">
            <Tab
              key="HDM Info Medicale"
              title="HDM Info Medicale"
              className="p-5  "
            >
              <Card className="bg-white border rounded-lg shadow-md">
                <CardBody>
                  <div className="patientDocument  mb-2">
                    <h2 className="text-center text-lg font-semibold text-[#1e71b8] border-b-2 mb-3">
                      Dossier Medicale :{" "}
                      {patient.patientHistoryDocuments.length} document
                    </h2>

                    <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 ">
                      {patient.patientHistoryDocuments &&
                      patient.patientHistoryDocuments.length > 0 ? (
                        patient.patientHistoryDocuments.map((docName) => (
                          <div
                            key={docName}
                            className="flex items-center justify-around gap-1  bg-gray-100 rounded-lg shadow hover:bg-gray-200 py-2"
                          >
                            <ShowDocumentModal fileName={docName} />
                            <button
                              onClick={() => hundleDeliteClick(docName)}
                              className="text-gray-600 hover:text-red-600"
                            >
                              {" "}
                              <FontAwesomeIcon icon={faTrash} size="1x" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p>ce patient n&apos;a aucun document </p>
                      )}
                    </div>
                    <div className="flex justify-end mt-2">
                      <AploadNewDocumentModal
                        patient={patient}
                        fetchPath={`/api/patient/${patient._id}/documents`}
                        fieldName="patientHistoryDocuments"
                      />
                    </div>
                  </div>

                  <div className="patientMedicalInfo  mb-3">
                    <h2 className="text-center text-lg font-semibold text-[#1e71b8] border-b-2 ">
                      Information Medicale
                    </h2>
                    <div className="flex-col items-center justify-center  ">
                      <p className="p-1">
                        <span className="font-bold text-gray-700">
                          antecedentsPersonnels
                        </span>
                        : {patient.antecedentsPersonnels}
                      </p>
                      <p className="p-1">
                        <span className="font-bold text-gray-700">
                          antecedentsFamiliaux
                        </span>
                        : {patient.antecedentsFamiliaux}
                      </p>
                      <p className="p-1">
                        <span className="font-bold text-gray-700">
                          informationsUtiles
                        </span>
                        : {patient.informationsUtiles}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <EditMedicalInfoModal
                        patientMedicalInfo={{
                          id: patient._id,
                          antecedentsPersonnels: patient.antecedentsPersonnels,
                          antecedentsFamiliaux: patient.antecedentsFamiliaux,
                          informationsUtiles: patient.informationsUtiles,
                        }}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Consultation" title="Consultation">
              <Card>
                <CardBody>
                  <div className="patientDocument  mb-2">
                    <h2 className="text-center text-lg font-semibold text-[#1e71b8] border-b-2 mb-3">
                      consultation: Medicales : {consultation.length}{" "}
                      consultation
                    </h2>

                    <div className="  ">
                      {consultation && consultation.length > 0 ? (
                        consultation.map((consult) => (
                          <div
                            key={consult._id}
                            className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
                          >
                            <div className="flex justify-between">
                              <div className="motif and date">
                                <h2 className="text-2xl font-semibold mb-2">
                                  {" "}
                                  Motif : {consult.motif}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                  Date:{" "}
                                  {new Date(consult.date).toLocaleDateString(
                                    "en-GB",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    }
                                  )}
                                </p>
                              </div>

                              <div className="buttons flex  items-center gap-1">
                                
                                <ShowConsultationModal
                                  patient={patient}
                                  consultation={consult}
                                />
                               
                                <EditConsultationInfo
                                  consultationInfo={consult}
                                  patient={patient}
                                />
                                <Button
                                  className=" bg-red-500 text-white rounded hover:bg-red-600 "
                                  onClick={() =>
                                    hundleDeliteConsultation(consult._id)
                                  }
                                >
                                  Supprimer
                                </Button>
                              </div>
                            </div>

                            <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 ">
                              {consult.consultationDocuments &&
                              consult.consultationDocuments.length > 0 ? (
                                consult.consultationDocuments.map((docName) => (
                                  <div
                                    key={docName}
                                    className="flex items-center justify-around gap-1  bg-gray-100 rounded-lg shadow hover:bg-gray-200 py-2"
                                  >
                                    <ShowDocumentModal fileName={docName} />
                                    <button
                                      onClick={() =>
                                        hundleDeiteDocumentConsultation(
                                          consult._id,
                                          docName
                                        )
                                      }
                                      className="text-gray-600 hover:text-red-600"
                                    >
                                      {" "}
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        size="1x"
                                      />
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <p>
                                  cette consultation n&apos;a aucun document{" "}
                                </p>
                              )}
                            </div>
                            <div className="flex justify-end mt-2">
                              <AploadNewDocumentModal
                                patient={patient}
                                consultation={consult}
                                fetchPath={`/api/patient/${patient._id}/consultation/docierConsultation`}
                                fieldName="consultationDocuments"
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>ce patient n&apos;a aucun consultation </p>
                      )}
                    </div>
                    <div className="flex justify-end mt-2">
                      <AddConsultationModal patient={patient} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs> */}
        </div>
      </div>
    </>
  );
};

export default PatientComponent;
