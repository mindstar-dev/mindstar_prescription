import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import DoctorLogin from "./doctor-login";
import CompounderDashBoard from "./compounder-dashboard";
import DoctorDashBoard from "./doctor-dashboard";
import { Session } from "node_modules/next-auth/core/types";
import { GetServerSideProps } from "next/types";
import useInstallPrompt from "~/hooks/useInstallPrompt";

export default function Home() {
  const ses = useSession();
  const { deferredPrompt, showInstallPrompt } = useInstallPrompt();
  if (ses.status === "loading") {
    return <div></div>;
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "doctor"
  ) {
    return (
      <>
        <main className="flex h-full w-full">
          {deferredPrompt && (
            <button onClick={showInstallPrompt}>Install PWA</button>
          )}
          <DoctorDashBoard />
        </main>
      </>
    );
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "compounder"
  ) {
    return (
      <>
        <main className="flex h-full w-full">
          {deferredPrompt && (
            <button onClick={showInstallPrompt}>Install PWA</button>
          )}
          <CompounderDashBoard />
        </main>
      </>
    );
  } else {
    return (
      <>
        <main className="flex h-full w-full">
          {deferredPrompt && (
            <button onClick={showInstallPrompt}>Install PWA</button>
          )}
          <DoctorLogin />
        </main>
      </>
    );
  }
}
