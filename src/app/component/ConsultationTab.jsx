
import { Button } from "@nextui-org/react";
import AploadNewDocumentModal from "./AploadNewDocumentModal";
import AddConsultationModal from "./AddConsultationModal";
import EditConsultationInfo from "./EditConsultationInfo";
import ShowConsultationModal from "./ShowConsultationModal";
import ShowDocumentModal from "./ShowDocumentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";



const Consultation =   ({consultation ,patient }) => {
  const hundleDeliteConsultation = async (consultationId) => {
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
    consultationId,
    docName
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
                    {/* <div className="flex justify-end mt-2">
                      <AddConsultationModal patient={patient} />
                    </div> */}
                  </div>
              
    
    </>
  )
}

export default Consultation