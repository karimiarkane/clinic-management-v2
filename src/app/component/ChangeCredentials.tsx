"use client";
// import { signOut } from "../auth";
import { signOut } from "next-auth/react";

import { useState } from "react";
import { useRouter } from "next/navigation";
const ChangeCredentials = () => {

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    password: "",
  });
  const router = useRouter();
  console.log("userCredentials",userCredentials);
  const hundleChange = (e:any) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const hundleSubmit = async (e:any) => {
    setErrorMsg("");
  setSuccessMsg("");
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      console.log("formData in the front",formData)

        const response = await fetch("/api/ChangeCredentials", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
            "Content-Type": "application/json",
            }, }
          )
          const resback = await response.json();
          if(resback.status === 200){
            setSuccessMsg(resback.message); 
            await signOut({ redirect: false });

            setUserCredentials({
              password: "",
            })}else{
              setErrorMsg(resback.message)
            }
    } catch (err) {
      setErrorMsg("une erreur s'est produite, veuillez réessayer.");
      console.error(err);

    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
    <div className="max-w-sm w-full text-gray-600">
      <form  onSubmit={hundleSubmit} className="mt-8 space-y-5">
      
        <div>
          <label className="font-medium" htmlFor="password">
            mot de passe
          </label>
          <input
        
            id="password"
            name="password"
            value={userCredentials.password}
            onChange={hundleChange}
            placeholder="mot de passe"
            type="text"
            required
            autoComplete="off"
            
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <input type="submit" className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          value='changer les informations'
        />
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          {successMsg && <p className="text-green-500">{successMsg}</p>}
      </form>
    </div>
  </main>
  )
}

export default ChangeCredentials