
/* eslint-disable */
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, getProviders } from "next-auth/react";
import MergedLoginForm from "@/components/login-form";
import Head from "next/head";

export default function Login({
  csrfToken,
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
      <MergedLoginForm csrfToken={csrfToken} providers={providers} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = (await getCsrfToken(context)) || "";
  const providers = (await getProviders()) || {};

  return {
    props: {
      csrfToken: csrfToken,
      providers: providers,
    },
  };
}
