import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken, getProviders } from "next-auth/react";
import MergedLoginForm from "@/components/login-form";

export default function Login({ csrfToken, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <MergedLoginForm csrfToken={csrfToken} providers={providers} />
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const csrfToken = await getCsrfToken(context) || '';
    const providers = await getProviders() || {};
  
    return {
      props: { 
        csrfToken: csrfToken,
        providers: providers,
      },
    }
  }
  