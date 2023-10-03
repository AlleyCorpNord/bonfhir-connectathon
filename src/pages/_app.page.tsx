import Header from "@/components/layout/header";
import Navbar from "@/components/layout/navbar";
import { Config } from "@/config";
import { FetchFhirClient, FhirClient } from "@bonfhir/core/r4b";
import { MantineRenderer } from "@bonfhir/mantine/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { FhirUIProvider } from "@bonfhir/react/r4b";
import {
  AppShell,
  Center,
  Loader,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

/**
 * Customize Mantine Theme.
 * https://v6.mantine.dev/theming/theme-object/
 */
const theme: MantineThemeOverride = {
  components: {
    Paper: {
      defaultProps: {
        p: "sm",
        shadow: "xs",
      },
    },
  },
};

export default function App(props: AppProps) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Hackaton bonFHIR</title>
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <SessionProvider session={session}>
          <WithAuth>
            <FhirUIProvider
              renderer={MantineRenderer}
              onNavigate={({ target, aux }) => {
                if (aux) {
                  window.open(target, "_blank");
                } else {
                  router.push(target);
                }
              }}
            >
              <AppShell
                header={<Header />}
                navbar={<Navbar />}
                styles={(theme) => ({
                  main: {
                    backgroundColor: theme.colors.gray[0],
                  },
                })}
              >
                <Component {...pageProps} />
              </AppShell>
              <ReactQueryDevtools />
            </FhirUIProvider>
          </WithAuth>
        </SessionProvider>
      </MantineProvider>
    </>
  );
}

function WithAuth(props: PropsWithChildren) {
  const { data: session, status } = useSession();
  const [fhirClient, setFhirClient] = useState<FhirClient>();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("medplum");
    }
  }, [status]);

  useEffect(() => {
    if (session?.accessToken) {
      setFhirClient(
        new FetchFhirClient({
          baseUrl: Config.public.fhirUrl,
          auth: `Bearer ${session.accessToken}`,
          async onError(response) {
            if (response.status === 401) {
              signOut({ callbackUrl: "/" });
            }
          },
        }),
      );
    }
  }, [session]);

  if (status !== "authenticated" || !session?.accessToken || !fhirClient) {
    return (
      <AppShell header={<Header />}>
        <Center h="100%">
          <Loader />
        </Center>
      </AppShell>
    );
  }

  return (
    <FhirQueryProvider fhirClient={fhirClient}>
      {props.children}
    </FhirQueryProvider>
  );
}
