import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirQueryLoader, useFhirUIContext } from "@bonfhir/react/r4b";
import { Space, Stack, Tabs } from "@mantine/core";
import {
  IconActivity,
  IconCalendar,
  IconClipboardText,
  IconPill,
  IconStethoscope,
  IconUser,
} from "@tabler/icons-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import PatientInfo from "./patient-info";
import { PatientContext } from "./patient.context";

export default function PatientLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const { formatter } = useFhirUIContext();
  const { patientId } = router.query as Record<string, string>;
  const activeTab = router.pathname.split("/")?.[3] || "overview";

  const patientQuery = useFhirRead("Patient", patientId, {
    query: {
      enabled: Boolean(patientId),
    },
  });

  return (
    <FhirQueryLoader query={patientQuery}>
      {(patient) => (
        <PatientContext.Provider value={{ patient }}>
          <Head>
            <title>
              {formatter.format("HumanName", patient.name, { max: 1 })}
            </title>
          </Head>
          <Stack>
            <PatientInfo patient={patient} />
            <Tabs
              value={activeTab}
              onChange={(tab) =>
                router.push(
                  tab === "overview"
                    ? `/patients/${patientId}`
                    : `/patients/${patientId}/${tab}`,
                )
              }
            >
              <Tabs.List>
                <Tabs.Tab
                  leftSection={<IconUser size="0.8rem" />}
                  value="overview"
                >
                  Overview
                </Tabs.Tab>
                <Tabs.Tab
                  leftSection={<IconCalendar size="0.8rem" />}
                  value="appointments"
                >
                  Appointments
                </Tabs.Tab>
                <Tabs.Tab
                  leftSection={<IconStethoscope size="0.8rem" />}
                  value="conditions"
                >
                  Conditions
                </Tabs.Tab>
                <Tabs.Tab
                  leftSection={<IconPill size="0.8rem" />}
                  value="medications"
                >
                  Medications
                </Tabs.Tab>
                <Tabs.Tab
                  leftSection={<IconActivity size="0.8rem" />}
                  value="vitals"
                >
                  Vitals
                </Tabs.Tab>
                <Tabs.Tab
                  leftSection={<IconClipboardText size="0.8rem" />}
                  value="encounters"
                >
                  Encounters
                </Tabs.Tab>
              </Tabs.List>
              <Space h="md" />
              {children}
            </Tabs>
          </Stack>
        </PatientContext.Provider>
      )}
    </FhirQueryLoader>
  );
}
