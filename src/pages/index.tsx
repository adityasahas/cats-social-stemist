import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { Text } from "@chakra-ui/react";
import { Landing } from "@/components/landing";

export default function Home() {
  return (
    <>
      <Head>
        <title>CatSocial | Home</title>
        <meta
          name="description"
          content="CatSocial is a social network of cats worldwide! Get to know everyone's cat and what breed they are! Don't we just adore cats?"
        />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Landing />
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className={styles.authContainer}>
//       <p className={styles.showcaseText}>
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className={styles.loginButton}
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
