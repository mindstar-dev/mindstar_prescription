import { useRouter } from "next/router";
import React from "react";
import PatientDetails from "~/components/elements/PatientDetails";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";
import DoctorLogin from "./doctor-login";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";
import { useSession } from "next-auth/react";

const patientdetails: React.FunctionComponent = () => {
  const router = useRouter();
  const { patient_id } = router.query;
  const ses = useSession();
  if (ses.status === "loading") {
    return <div></div>;
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "doctor"
  ) {
    return (
      <DoctorPageTemplate activePage="appointments" doctorName="Doctor's Name">
        <PatientDetails patient_id={patient_id as string} />
      </DoctorPageTemplate>
    );
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "compounder"
  ) {
    return (
      <>
        <CompounderPageTemplate activePage={""} doctorName={""}>
          <PatientDetails patient_id={patient_id as string} />
        </CompounderPageTemplate>
      </>
    );
  } else {
    return (
      <>
        <main className="flex h-full w-full">
          <DoctorLogin />
        </main>
      </>
    );
  }
};

export default patientdetails;
