"use client";
import React from "react";
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
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

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
            
            consultationId
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

  
  const hundleDeiteDocumentConsultation = async (consultationId : string  , docName: string) => {
    console.log("docName", docName);

    let confirmDelete = window.confirm(
      "tu veux vraiment supprimer ce document de cette consultation ?"
    );

    if (confirmDelete) {
      try {
        const res = await fetch(`/api/patient/${patient._id}/consultation/docierConsultation`, {
          method: "DELETE",
          body: JSON.stringify({
            documentName: docName,
            consultationId: consultationId,
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

  return (
    <>
      <div className="flex">
        <nav className="  h-full border-r-2  p-5 bg-white space-y-8  w-1/3">
          <h2 className="text-center text-lg font-semibold text-gray-700 border-b-2 p-5">
            Information Personnelles
          </h2>
          <div className="flex-col items-center justify-center  ">
            <p className="p-2">
              <span className="font-bold text-gray-700">Nom</span>:{" "}
              {patient.nom}
            </p>
            <p className="p-2">
              <span className="font-bold text-gray-700">Prénom</span>:{" "}
              {patient.prenom}
            </p>
            <p className="p-2">
              <span className="font-bold text-gray-700">Age</span>:{" "}
              {patient.age}
            </p>
            <p className="p-2">
              <span className="font-bold text-gray-700">Sexe</span>:{" "}
              {patient.sexe}
            </p>
            <p className="p-2">
              <span className="font-bold text-gray-700">Téléphone</span>:{" "}
              {patient.telephone}
            </p>
            <p className="p-2">
              <span className="font-bold text-gray-700">Adresse</span>:{" "}
              {patient.Addresse}
            </p>
            <p className="p-2">
              <span className="font-bold text-gray-700">Profession</span>:{" "}
              {patient.profession}
            </p>
            <p className="p-2">
              <span className="font-bold text-gray-700">Assurance</span>:{" "}
              {patient.assurance}
            </p>
            <p className="p-2">
              <span className="font-bold text-gray-700">État Civil: </span>{" "}
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

        <div className="w-2/3">
          <Tabs aria-label="Options" fullWidth className="pt-5 ">
            <Tab
              key="HDM Info Medicale"
              title="HDM Info Medicale"
              className="p-5  "
            >
              <Card>
                <CardBody>
                  <div className="patientDocument  mb-2">
                    <h2 className="text-center text-lg font-semibold text-gray-700 border-b-2 mb-3">
                      Docier Medicale : {patient.patientHistoryDocuments.length}{" "}
                      document
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
                      <AploadNewDocumentModal patient={patient}  fetchPath={`/api/patient/${patient._id}/documents`}  fieldName="patientHistoryDocuments"/>
                    </div>
                  </div>

                  <div className="patientMedicalInfo  mb-3">
                    <h2 className="text-center text-lg font-semibold text-gray-700 border-b-2 ">
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
                    <h2 className="text-center text-lg font-semibold text-gray-700 border-b-2 mb-3">
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
                                {/* <button className=" bg-blue-500 text-white rounded hover:bg-blue-600">
                                  View Details
                                </button> */}
                                <ShowConsultationModal patient={patient} consultation={consult}/>
                                {/* <button className=" bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                  Update
                                </button> */}
                                <EditConsultationInfo consultationInfo = {consult}  patient={patient}/>
                                <Button className=" bg-red-500 text-white rounded hover:bg-red-600 "   onClick={() => hundleDeliteConsultation(consult._id )}>
                                  Supprimer
                                </Button>
                              </div>
                            </div>

                            <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 ">
                              {consult.consultationDocuments &&
                              consult.consultationDocuments.length > 0 ? (
                                consult.consultationDocuments.map(
                                  (docName) => (
                                    <div
                                      key={docName}
                                      className="flex items-center justify-around gap-1  bg-gray-100 rounded-lg shadow hover:bg-gray-200 py-2"
                                    >
                                      <ShowDocumentModal fileName={docName} />
                                      <button
                                        onClick={() =>
                                          hundleDeiteDocumentConsultation(consult._id ,  docName)
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
                                  )
                                )
                              ) : (
                                <p>cette consultation n&apos;a aucun document </p>
                              )}
                            </div>
                            <div className="flex justify-end mt-2">
                              <AploadNewDocumentModal patient={patient} consultation={consult}  fetchPath={`/api/patient/${patient._id}/consultation/docierConsultation`} fieldName="consultationDocuments"  />
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
          </Tabs>
        </div>
      </div>
    
    </>
  );
};

export default PatientComponent;
