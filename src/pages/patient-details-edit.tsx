import React from "react";
import PatientDetailsEdit from "~/components/elements/PatientDetailsEdit";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";
import DoctorLogin from "./doctor-login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const patientlistedit: React.FunctionComponent = () => {
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
        <PatientDetailsEdit patient_id={patient_id as string} />
      </DoctorPageTemplate>
    );
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "compounder"
  ) {
    return (
      <>
        <CompounderPageTemplate activePage={""} doctorName={""}>
          <PatientDetailsEdit patient_id={patient_id as string} />
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

export default patientlistedit;
