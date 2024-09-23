import type { Metadata } from "next";
import "../globals.css";
import SideBar from "../component/SideBar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-[#F6F8FA]  ">
      <SideBar />

      <div className=" w-full h-screen pt-14 pl-5 pr-3 pb-2
       overflow-y-auto ">
        {/* Patient Table with a card-like container */}
        <div className="mnabdaretourarriere3onwanwelcontent  h-full  ">
          <div style={{height : "10%"}}>3fsa hna</div>
          <div style={{height : "90%"}} className="maincontent shadow-lg rounded-lg">
            {children}
          </div>
          {/* <PatientTable data={allPatients || []} /> */}
        </div>
      </div>
    </div>
  );
}
