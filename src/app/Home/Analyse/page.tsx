import React from "react";
import TableAnalyse from "../../component/TableAnalyse";

const getAnalyses = async () => {
  try {
    const data = await fetch("http://localhost:3000/api/analyses/", {
      cache: "no-store",
    });
    console.log('data inside the function ' , data)
    const res = await data.json();
    console.log("responce inside the funciton in the page", res);
    return res;
  } catch (err) {
    console.log(err);
    return { analyses: [] }; // Return an empty array in case of error
  }
};
export default async function AnalysesPage() {
  const responce = await getAnalyses();
  console.log("responce outside  the function in analysepage", responce);
  const { analyses } = (await getAnalyses()) || {};
  console.log("analyses", analyses);
  return (
    <>
    <p>hello</p>
      <TableAnalyse analyses={analyses || [] } />
    </>
  );
}

