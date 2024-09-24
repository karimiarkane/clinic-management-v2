/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

/* eslint-disable react/prop-types */

const CMHForm = ({ formData }) => {
  console.log("formdata ", formData);
  const hwa = document.querySelector("#this");

  const Analyse = [
    "Biochimie",
    "Hématologie",
    "Hormonologie",
    "Immunologie",
    "Microbiologie",
    "Parasitologie",
    "Sérologie",
  ];
  const imagingLabels = [
    "Radiologie",
    "Mammographie",
    "Échographie",
    "Echo-Doppler",
    "Explorations Cardiaques",
  ];
  const consultationLabels = [
    "Cardiologie / Rythmologie",
    "Médecine Interne",
    "Médecine Esthétique",
    "Orthopédie",
    "Sénologie",
    "Urologie",
  ];
  const soinInfirmiersLabels = [
    "Prélèvements",
    "Injections / Perfusion",
    "Pansement",
    "Sutures et Ablation de fils de suture",
    "Pose de sondes vésicales",
  ];

  const handleChange = (event) => {
    // Handle the change event
    console.log(event.target.checked, event.target.value);
  };

  return (
    <div>
      <div id="this" className="w-[210mm] mx-auto p-8">
        {/* Header */}
        <div className="flex justify-center items-center mb-4">
          <div className="flex items-center">
            <Image
              src="/cropped-logo-CMH-Bilan-de-sante-300.png"
              alt="CMH Logo"
              width={160} // Adjusted width in pixels
              height={128} // Adjusted height in pixels
              className="h-32 w-40"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-red-500">
                CENTRE MEDICAL HYDRA
              </h1>
              <p className="text-gray-700">
                2 Rue Abberrezak Belidem, 16035 Hydra Alger
              </p>
              <p>Tel: +213(0)21 483 206 / +213(0)551 660 003</p>
              <p>E-mail: contact@cmhydra.com | www.cmhydra.com</p>
            </div>
          </div>
        </div>
        {/* Main Form Section */}
        <div className="">
          <h1 className="pl-[40%] text-2xl">Fiche de renseignement</h1>
          <div className="flex mt-2">
            {/* Left Sidebar (Services) */}
            <div className="w-1/3 pr-4 border-r">
              {/* Laboratoire Section */}
              <div className="mb-6">
                <h2 className="font-bold text-blue-700 text-lg">
                  Laboratoire D'Analyses
                </h2>
                <ul className="text-sm space-y-2">
                  {Analyse.map((label, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        id={`analyse-${index}`}
                        onChange={handleChange}
                        value={label}
                      />
                      <label htmlFor={`analyse-${index}`} className="cursor-pointer"> {label}</label>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Imagerie Médicale Section */}
              <div className="mb-6">
                <h2 className="font-bold text-blue-700 text-lg">
                  Imagerie Médicale
                </h2>
                <ul className="text-sm space-y-2">
                  {imagingLabels.map((label, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        id={`imaging-${index}`}
                        onChange={handleChange}
                        value={label}
                      />
                      <label htmlFor={`imaging-${index}`} className="cursor-pointer"> {label}</label>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Other Sections (Consultation & Soin Infirmiers) */}
              <div className="mb-6">
                <h2 className="font-bold text-blue-700 text-lg">
                  Consultation Spécialisée
                </h2>
                <ul className="text-sm space-y-2">
                  {consultationLabels.map((label, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        id={`consultation-${index}`}
                        onChange={handleChange}
                        value={label}
                      />
                      <label htmlFor={`consultation-${index}`} className="cursor-pointer"> {label}</label>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-bold text-blue-700 text-lg">
                  Soin Infirmiers
                </h2>
                <ul className="text-sm space-y-2">
                  {soinInfirmiersLabels.map((label, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        id={`soin-${index}`}
                        onChange={handleChange}
                        value={label}
                      />
                      <label htmlFor={`soin-${index}`} className="cursor-pointer"> {label}</label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-600 text-red-100 py-2 px-6 text-center rounded-3xl inline-block font-semibold mt-5">
                <h2 className="font-extrabold">DEPISTAGE</h2>
                <h2 className="font-extrabold">COVID 19 </h2>
                <p className="font-thin">PCR/Sérologie</p>
                <p className="font-thin">Tests Antigéniques</p>
              </div>
            </div>

            {/* Right Column (Main Form) */}
            <div className="w-2/3 pl-4">
  <form className="">
    <div className="mb-4">
      <label className="block font-semibold cursor-pointer">Date:</label>
      <input
        type="text"
        className="block border-b border-gray-400 cursor-pointer"
        defaultValue={formData.date}
      />
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block font-semibold cursor-pointer">Nom:</label>
        <input
          type="text"
          className="block border-b border-gray-400 cursor-pointer"
          defaultValue={formData.nom}
        />
      </div>
      <div>
        <label className="block font-semibold cursor-pointer">Prénom:</label>
        <input
          type="text"
          className="block border-b border-gray-400 cursor-pointer"
          defaultValue={formData.prenom}
        />
      </div>
    </div>
    <div className="mb-4">
      <label className="block font-semibold cursor-pointer">
        Date de naissance:
      </label>
      <input
        type="text"
        className="block border-b border-gray-400 cursor-pointer"
        defaultValue={formData.dob}
      />
    </div>
    {/* Other Fields */}
    <div className="mb-4">
      <label className="block font-semibold cursor-pointer">
        Motif de consultation:
      </label>
      <input
        type="text"
        className="block border-b mb-2 border-gray-400 cursor-pointer"
        defaultValue={formData.motif}
      />
   
    </div>
    <div className="mb-4">
      <label className="block font-semibold cursor-pointer">ATCD Médicaux:</label>
      <input
        type="text"
        className="block border-b border-gray-400 cursor-pointer"
        defaultValue={formData.medicalHistory}
      />
    </div>
    <div className="mb-4">
      <label className="block font-semibold cursor-pointer">
        ATCD Chirurgicaux:
      </label>
      <input
        type="text"
        className="block border-b border-gray-400 cursor-pointer"
        defaultValue={formData.surgicalHistory}
      />
    </div>
    <div className="mb-4">
      <label className="block font-semibold cursor-pointer">Allergie(s):</label>
      <input
        type="text"
        className="block border-b border-gray-400 cursor-pointer"
        defaultValue={formData.allergies}
      />
    </div>
    <div className="mb-4">
      <label className="block font-semibold cursor-pointer">
        Traitement(s) en cours:
      </label>
      <input
        type="text"
        className="block border-b border-gray-400 cursor-pointer"
        defaultValue={formData.treatment}
      />
    </div>
  </form>
</div>

            {/* <div className="w-2/3 pl-4">
              <form className="">
                <div className="mb-4">
                  <label className="block font-semibold cursor-pointer">Date:</label>
                  <span className="block border-b border-gray-400 ">
                    {formData.date}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-semibold ">Nom:</label>
                    <span className="block border-b border-gray-400 ">
                      {formData.nom}
                    </span>
                  </div>
                  <div>
                    <label className="block font-semibold ">Prénom:</label>
                    <span className="block border-b border-gray-400 ">
                      {formData.prenom}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold ">
                    Date de naissance:
                  </label>
                  <span className="block border-b border-gray-400 ">
                    {formData.dob}
                  </span>
                </div>
                {/* Other Fields */}
            {/*    <div className="mb-4">
                  <label className="block font-semibold ">
                    Motif de consultation:
                  </label>
                  <span className="block border-b mb-2 border-gray-400 ">
                    {formData.motif}
                  </span>
                  <span className="block border-b m border-gray-400 ">
                    {formData.motif}
                  </span>
                  <span className="block border-b border-gray-400 ">
                    {formData.motif}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold ">ATCD Médicaux:</label>
                  <span className="block border-b border-gray-400 ">
                    {formData.medicalHistory}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold ">
                    ATCD Chirurgicaux:
                  </label>
                  <span className="block border-b border-gray-400 ">
                    {formData.surgicalHistory}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold ">Allergie(s):</label>
                  <span className="block border-b border-gray-400 ">
                    {formData.allergies}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold ">
                    Traitement(s) en cours:
                  </label>
                  <span className="block border-b border-gray-400 ">
                    {formData.treatment}
                  </span>
                </div>
              </form>
            </div> */}
          </div>
        </div>
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="mt-4 text-gray-700 font-bold">
            <span className="text-blue-500 text-2xl">C</span>
            <span className="text-2xl text-red-500">M</span>
            <span className="text-2xl text-blue-500">H</span> PARTENAIRE DE
            VOTRE SANTÉ
          </p>
        </div>
      </div>
    </div>
  );
};

export default CMHForm;