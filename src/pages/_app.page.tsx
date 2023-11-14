import Header from "@/components/layout/header";
import Navbar from "@/components/layout/navbar";
import { Config } from "@/config";
import { SystemLabels } from "@/fhir/known-identifiers";
import { FetchFhirClient, FhirClient, Formatter } from "@bonfhir/core/r4b";
import { MantineRenderer } from "@bonfhir/mantine/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { FhirUIProvider } from "@bonfhir/react/r4b";
import {
  AppShell,
  Center,
  Loader,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextPage } from "next";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";

/**
 * Customize Mantine Theme.
 * https://mantine.dev/theming/theme-object/
 */
const theme = createTheme({
  components: {
    Paper: {
      defaultProps: {
        p: "sm",
        shadow: "xs",
      },
    },
  },
});

export default function App(props: AppPropsWithLayout) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Hackaton bonFHIR</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider theme={theme}>
        <Notifications />
        <SessionProvider session={session}>
          <WithAuth>
            <FhirUIProvider
              renderer={MantineRenderer}
              formatter={Formatter.build({
                systemsLabels: SystemLabels,
              })}
              onNavigate={({ target, aux }) => {
                if (aux) {
                  window.open(target, "_blank");
                } else {
                  router.push(target);
                }
              }}
            >
              <ModalsProvider>
                <AppShell
                  header={{ height: 60 }}
                  navbar={{ width: { sm: 160 }, breakpoint: "sm" }}
                  padding="md"
                  styles={(theme) => ({
                    main: {
                      backgroundColor: theme.colors.gray[0],
                    },
                  })}
                >
                  <AppShell.Header>
                    <Header />
                  </AppShell.Header>
                  <AppShell.Navbar>
                    <Navbar />
                  </AppShell.Navbar>
                  <AppShell.Main>
                    {Component.layout ? (
                      <Component.layout>
                        <Component {...pageProps} />
                      </Component.layout>
                    ) : (
                      <Component {...pageProps} />
                    )}
                  </AppShell.Main>
                </AppShell>
              </ModalsProvider>
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
  }, [session?.accessToken]);

  if (status !== "authenticated" || !session?.accessToken || !fhirClient) {
    return (
      <AppShell>
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main>
          <Center h="100vh">
            <Loader />
          </Center>
        </AppShell.Main>
      </AppShell>
    );
  }

  return (
    <FhirQueryProvider fhirClient={fhirClient}>
      {props.children}
    </FhirQueryProvider>
  );
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: (props: PropsWithChildren) => JSX.Element;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
